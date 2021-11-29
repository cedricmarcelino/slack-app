import { data } from 'autoprefixer'
import {useState,useEffect} from 'react'

function Sidebar(props) {

    const {setActivePage,userHeaders,value,setChannelName,setChannelID,setListOfMessages} = props
    const [usersChannelVisible, setUsersChannelVisible] = useState(false)
    const [usersDirectMessagesVisible, setUsersDirectMessagesVisible] = useState(false) //shows conversation when user in DMs list is clicked
    const [addButtonVisible, setAddButtonVisible] = useState(false)
    const [addButtonVisible1, setAddButtonVisible1] = useState(false) //add button for Direct Messages
    const [listOfChannels,setListOfChannels] = useState([])
    const [listOfChannelID,setListOfChannelID] = useState([])
    const [objectChannel,setObjectChannel] = useState({})
    const [noChannels,setNoChannels] = useState()
    const [loading,setLoading] = useState()
        
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
                let userChannelsID = userChannels.data.map(data => 
                    data.id
                )
                setListOfChannelID(userChannelsID)
                
                let i=0
                let tempObjectChannel = {}

                listOfChannels.forEach(channelName => {
                    tempObjectChannel[channelName] = listOfChannelID[i]
                    i++
                })
                setObjectChannel(tempObjectChannel)
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
    },[value])

    // shows list of user's channels

    function showUsersChannel(){
        if(usersChannelVisible===false){
            retrieveUserChannels()
            setUsersChannelVisible(true)
        } else {
            setUsersChannelVisible(false)
        }
    }

    // shows list of user's DMs with other users

    function showUsersDirectMessages(){
        if(usersDirectMessagesVisible===false){
            retrieveUserChannels()
            setUsersDirectMessagesVisible(true)
        } else {
            setUsersDirectMessagesVisible(false)
        }
    }

    function showAddButton(){
        setAddButtonVisible(true)
    }

    function hideAddButton(){
        setAddButtonVisible(false)
    }

    // show and hide addbuttons1 used for DM copied above

    function showAddButton1(){
        setAddButtonVisible1(true)
    }

    function hideAddButton1(){
        setAddButtonVisible1(false)
    }

    // shows page where add channel is

    function showAddChannel(){
        setActivePage("AddChannel")
    }

    // shows page where you can search for user to message directly

    function showDirectMessageUser(){
        setActivePage("AddMemberForDM")
    }

    async function showChannel(e){
        setActivePage("Channel")
        const targetChannel = e.target.innerHTML
        setChannelName(targetChannel)
        setChannelID(objectChannel[targetChannel])
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

            {/* <div className="my-3">
                <span className="text-lg cursor-pointer mx-4 font-semibold ">Direct Messages</span> 
            </div> */}

            {/* rendering of direct messages based on code for rendering channels */}

            {addButtonVisible1===false &&
                <>
                    <span className="cursor-pointer flex item-stretch mx-4 my-3 font-semibold text-lg" onMouseEnter={showAddButton1}>Direct Messages{usersChannelVisible===false ? <span>▴</span> : <span>▾</span>}</span>
                </>
            }

            {addButtonVisible1 &&
                <>
                    <div className="cursor-pointer flex justify-between mx-4 my-3 font-semibold text-lg" onMouseLeave={hideAddButton1}> 
                        <span onClick={showUsersDirectMessages}>Direct Messages{usersDirectMessagesVisible===false ? <span>▴</span> : <span>▾</span>}</span>
                        <span onClick={showDirectMessageUser}>+</span>
                    </div>
                </>
            }

            {(loading && usersDirectMessagesVisible) &&
                <>
                    <ul className="mx-10">
                            <li>Fetching Data</li>
                    </ul>
                </>
            }
            
            {(usersDirectMessagesVisible && noChannels===false && loading===false)&& 
                <ul className="mx-10">
                    {listOfChannels.map((channel,id) => <li key={id} className="cursor-pointer" onClick={showChannel}>{channel}</li>)}
                </ul>
            }

            {(usersDirectMessagesVisible && noChannels===true && loading===false)&& 
                <ul className="mx-10">
                    <li>No Available Users</li>
                </ul>
            }
        </div>
    )
}

export default Sidebar
