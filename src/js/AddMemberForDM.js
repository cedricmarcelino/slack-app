import {useState} from 'react'
import JSONDATA from '../MOCK_DATA.json'

function AddMemberForDM(props) {

    const {userHeaders,userId,setValue,value} = props
    const [channelName,setChannelName] = useState("")
    const [searchUser,setSearchUser] = useState("")
    // const [userEmailsInChannels, setUserEmailsInChannels] = useState([])

    userHeaders[`Content-Type`] =  "application/json"

    let usersInChannels = []
    let userEmailsInChannels = []
    
    function handleChange(e) {
        setChannelName(e.target.value)
    }

    async function handleClick() {

        const body = {
            "name": channelName,
            "user_ids": [userId]
        }

        await fetch("http://206.189.91.54/api/v1/channels",
            {method: "POST",
            headers: userHeaders, 
            mode: "cors",
            body: JSON.stringify(body)})
            .then(response=>response.json())
            .then(data=>{
                if(data.errors!==undefined){
                    console.log(data.errors)
                } else {
                    setChannelName("")
                    console.log("Channel created!")
                    setValue(value+1)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    async function loadUsersFromChannel(){ // stores all user IDs of all users in user's channels

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
                        channelDetails.data.channel_members.map(member => 
                            usersInChannels.includes(member.user_id) ? null : usersInChannels.push(member.user_id))) //filters duplicate IDs then stores one of each unique ID in array
                    )
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const loadAllUsers = async function (){ // fetches all users ID (to be used for cross reference)
        await fetch("http://206.189.91.54/api/v1/users", 
        {method: "GET",
        headers: userHeaders,
        mode: "cors"})
        .then(response=>response.json())
        .then(allUsers=>{
            allUsers.data.map(item=> usersInChannels.includes(item.id) ? 
            userEmailsInChannels.push(item.email) : null
        )})
        .then(console.log(userEmailsInChannels))
        .catch(error => console.log(error))
    }


    return (
      <div className="text-center py-5">
        <h1 className="font-semibold text-3xl my-2">All direct messages</h1>
        <fieldset>
          <label className="my-2">Channel name: </label>
          <input
            className="my-2"
            type="text"
            onChange={handleChange}
            value={channelName}
          ></input>
        </fieldset>
        <button
          onClick={handleClick}
          className="bg-purple-800 hover:bg-purple-900 text-white font-bold py-2 px-4 border border-purple-900 rounded my-2"
        >
          Create Channel
        </button>

        {/* search bar */}

        <div className="wala pa">
            <input type="text" 
            placeholder="Search..." 
            onChange={event=>{setSearchUser(event.target.value)}} 
            onClick={loadAllUsers}
            onMouseEnter={loadUsersFromChannel}
            />
            {userEmailsInChannels.map((item, index)=> {
                console.log(item)
                if (searchUser === '') {
                    return null
                }
                else if (item.toLowerCase().includes(searchUser.toLowerCase())) {
                    return <div key = {index}>{item}</div>
                }
            })}
        </div>

    </div>
    );
}

export default AddMemberForDM