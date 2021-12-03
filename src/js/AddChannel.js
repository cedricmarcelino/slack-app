import {useState} from 'react'

function AddChannel(props) {

    const {userHeaders,userId,setValue,value,setAlertMessage,setAlertWindowVisible} = props
    const [channelName,setChannelName] = useState("")

    userHeaders[`Content-Type`] =  "application/json"
    
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
                    setAlertMessage(data.errors[0])
                    setAlertWindowVisible(true)
                } else {
                    setChannelName("")
                    setAlertMessage("Channel created!")
                    setAlertWindowVisible(true)
                    setValue(value+1)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="text-center py-24">
            <h1 className="font-semibold text-3xl my-2">Create a new channel</h1>
            <fieldset>
                <label className="my-2">Channel name: </label>
                <input className="my-2" type="text" onChange={handleChange} value={channelName}></input>
            </fieldset>
            <button onClick={handleClick} className="bg-purple-800 hover:bg-purple-900 text-white font-bold py-2 px-4 border border-purple-900 rounded my-2">
                Create Channel
            </button>
            
        </div>
    )
}

export default AddChannel