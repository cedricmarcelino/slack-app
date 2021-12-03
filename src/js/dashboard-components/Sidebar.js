import { data } from 'autoprefixer'
import {useState,useEffect} from 'react'

function Sidebar(props) {

    const {setActivePage,userHeaders,value,setChannelName,setChannelID,setListOfMessages, setRecipientName, setRecipientID, counter, setCounter} = props
    const [usersChannelVisible, setUsersChannelVisible] = useState(false)
    const [usersDirectMessagesVisible, setUsersDirectMessagesVisible] = useState(false) //renders list of users
    const [addButtonVisible, setAddButtonVisible] = useState(false)
    const [listOfChannels,setListOfChannels] = useState([])
    const [listOfChannelID,setListOfChannelID] = useState([])
    const [objectChannel,setObjectChannel] = useState({})
    const [noChannels,setNoChannels] = useState()
    const [noUsersInList, setNoUsersInList] = useState(true) //renders 'no users available' on direct messages in sidebar if set to true
    const [loading,setLoading] = useState()
    const [loading1,setLoading1] = useState() //renders 'fetching data' when data is not yet ready
    const [searchUser,setSearchUser] = useState("")//filters searchbar
    const [searchEmails, setSearchEmails] = useState([])//array where searchbar can look for emails
    const [allUsersStored, setAllUsersStored] = useState([]) // array where all users from fetch are stored
    let usersInChannels = [] //array where user IDs of all members in user's channels are pushed
    let userEmailsInChannels = [] //array where user emails are pushed based on user IDs

    userHeaders[`Content-Type`] =  "application/json"

    async function retrieveUserChannels(){
        setLoading(true)
        await fetch("http://206.189.91.54/api/v1/channels",
            {method: "GET",
            headers: userHeaders, 
            mode:"cors"})
        .then(response=>response.json())
        .then(userChannels=>{
            if(userChannels.data!==undefined){
                let userChannelsName = userChannels.data.map(data => 
                    data.name
                )
                setListOfChannels(userChannelsName)
                console.log(userChannelsName)
                let userChannelsID = userChannels.data.map(data => 
                    data.id
                )
                setListOfChannelID(userChannelsID)
                console.log(userChannelsID)
                
                let i=0
                let tempObjectChannel = {}

                userChannelsName.forEach(channelName => {
                    tempObjectChannel[channelName] = userChannelsID[i]
                    i++
                })

                setObjectChannel(tempObjectChannel)
                console.log(tempObjectChannel)

                setNoChannels(false)
                setLoading(false)
            } else {
                setLoading(false)
                setNoChannels(true)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    // updates list when a channel is added

    useEffect( ()=>{
        retrieveUserChannels()
        console.log("I RAN FROM SIDEBAR")
    },[value])

    function showUsersChannel(){
        if(usersChannelVisible===false){
            retrieveUserChannels()
            setUsersChannelVisible(true)
        } else {
            setUsersChannelVisible(false)
        }
    }

    function showAddButton(){
        setAddButtonVisible(true)
    }

    function hideAddButton(){
        setAddButtonVisible(false)
    }

    // shows page where add channel is

    function showAddChannel(){
        setActivePage("AddChannel")
    }

    async function showChannel(e){
        setActivePage("Channel")
        setListOfMessages([])
        const targetChannel = e.target.innerHTML
        setChannelName(targetChannel)
        setChannelID(objectChannel[targetChannel])
        setCounter(counter+1)
    }

    // direct message functions

    async function loadUsersFromChannel(){ // stores user IDs of all users in user's channels in an array
        setLoading1(true)
        await fetch("http://206.189.91.54/api/v1/channels", //fetches all channels of user
            {method: "GET",
            headers: userHeaders, 
            mode:"cors"})
        .then(response=>response.json())
        .then(userChannels=>{
            let userChannelsID = userChannels.data.map(data => data.id)
                userChannelsID.map(channelID => 
                    fetch(`http://206.189.91.54/api/v1/channels/${channelID}`, //fetches the channel details via channel ID then collects all the user IDs
                    {method: "GET",
                    headers: userHeaders,
                    mode: "cors"})
                    .then(response=>response.json())
                    .then(channelDetails => 
                        channelDetails.data.channel_members.map(member => {  //filters duplicate IDs then stores one of each unique ID in array
                            if (usersInChannels.includes(member.user_id)) 
                            { return null } 
                            else {
                                usersInChannels.push(member.user_id)
                                let returnedArray = usersInChannels
                                loadAllUsers(returnedArray)
                            }
                        }))
                    )
                })
        .then(() => {
            if (searchEmails !== (undefined||null)) {
                setLoading1(false)
                setNoUsersInList(false)
                console.log(searchEmails)}
            else {
                setLoading1(false)
                setNoUsersInList(true)
                }
            })
        .catch((error) => {
            console.log(error)
        })
    }

    async function loadAllUsers (returnedArray){ // fetches all users ID (to be used for cross reference)
        await (fetch("http://206.189.91.54/api/v1/users", 
        {method: "GET",
        headers: userHeaders,
        mode: "cors"}))
        .then(response=>response.json())
        .then(allUsers=>{
            const allUsersData = allUsers.data.map(item=>item)
            setAllUsersStored(allUsersData)

            allUsers.data.map(item=> returnedArray.includes(item.id) ? 
            userEmailsInChannels.push(item.email) : null)
        })
        .then(()=>{
            var uniq = [...new Set(userEmailsInChannels)] //replaces the duplicate values inside userEmailsInChannels
            setSearchEmails(uniq)
            })
    }

    // loads loadUsersFromChannel() only once upon rendering of Sidebar
    useEffect(loadUsersFromChannel,[])

    // shows list of user's DMs with other users

    function showUsersDirectMessages(){
        if(usersDirectMessagesVisible===false){
            setUsersDirectMessagesVisible(true)
        } else {
            setUsersDirectMessagesVisible(false)
        }
    }

        
    async function OpenDMWindow(e) {
        const trgtMember = e.target.innerHTML
        setRecipientName(trgtMember)
        setActivePage("DirectMessage")
        allUsersStored.map(item=> item.email === trgtMember ? setRecipientID(item.id) : null)
        
    }

    return (
        <div className="bg-purple-900 text-white w-2/12 p-5">
            {addButtonVisible===false &&
            <>
                <span className="cursor-pointer flex item-stretch mx-4 my-3 font-semibold text-lg" onMouseEnter={showAddButton}>Channels{usersChannelVisible===false ? <span>▴</span> : <span>▾</span>}</span>
            </>
            }

            {addButtonVisible &&
            <>
                <div className="cursor-pointer flex justify-between mx-4 my-3 font-semibold text-lg" onMouseLeave={hideAddButton}> 
                    <span onClick={showUsersChannel}>Channels{usersChannelVisible===false ? <span>▴</span> : <span>▾</span>}</span>
                    <span onClick={showAddChannel}>+</span>
                </div>
            </>
            }

            {(loading && usersChannelVisible) &&
            <>
            <ul className="mx-10">
                    <li>Fetching Data</li>
            </ul>
            </>
            }
            
            {(usersChannelVisible && noChannels===false && loading===false)&& 
                <ul className="mx-10">
                    {listOfChannels.map((channel,id) => <li key={id} className="cursor-pointer" onClick={showChannel}>{channel}</li>)}
                </ul>
            }

            {(usersChannelVisible && noChannels===true && loading===false)&& 
                <ul className="mx-10">
                    <li>No Available Channels</li>
                </ul>
            }

            {/* direct messages */}

            {
                <>
                    <div className="cursor-pointer flex justify-between mx-4 my-3 font-semibold text-lg" > 
                        <span onClick={showUsersDirectMessages}>Direct Messages{usersDirectMessagesVisible===false ? <span>▴</span> : <span>▾</span>}</span>
                    </div>
                </>
            }

            {(loading1 && usersDirectMessagesVisible) &&
                <>
                    <ul className="mx-10">
                            <li>Fetching Data</li>
                    </ul>
                </>
            }
            
            {(usersDirectMessagesVisible && noUsersInList===false && loading1===false)&& 
                <ul className="mx-10">

                    <input type="text" placeholder="Search..." onChange={event=>{setSearchUser(event.target.value)}} className="text-black"/>

                    {searchEmails.map((item, index)=> {
                        if (searchUser === '') {
                            return <li onClick = {OpenDMWindow} key = {index}>{item}</li>
                        }
                        else if (item.toLowerCase().includes(searchUser.toLowerCase())) {
                            return <li onClick = {OpenDMWindow} key = {index}>{item}</li>
                        }
                    })}
                </ul>
            }

            {(usersDirectMessagesVisible && noUsersInList===true && loading1===false)&& 
                <ul className="mx-10">
                    <li>No Available Users</li>
                </ul>
            }
        </div>
    )
}

export default Sidebar
