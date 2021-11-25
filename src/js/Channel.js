import {useEffect} from 'react'

function Channel(props) {

    const {channelName,channelID,listOfMessages,userHeaders,setListOfMessages} = props
    
    async function retrieveMessages(){
        await fetch(`http://206.189.91.54/api/v1/messages?receiver_id=${channelID}&receiver_class=Channel`,
        {method: "GET",
        headers: userHeaders, 
        mode:"cors"})
        .then(response=>response.json())
        .then(data=> {
            if(data.data.length!==0){
                const messagesData = data.data
                let tempListOfMessages = []
                messagesData.forEach(message => {
                    tempListOfMessages.push(message)
                    console.log(message)
                })
                setListOfMessages(tempListOfMessages)
            } else {
                console.log("NO MESSAGES")
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect( ()=>{
        retrieveMessages()
        console.log("I RAN")
    },[channelName])

    return (
        <div className="flex flex-col justify-between h-full">
            <div className="border-solid border-purple-300 border-2 bg-white p-3 flex justify-between">
                <span className="font-bold text-3xl">{channelName} #{channelID}</span>
                <span className="font-bold text-xl cursor-pointer">+ Add Member</span>
            </div>

            <div>
                <ul className="mx-10">
                        {listOfMessages.map((message,id) => <li key={id}>{message.body}</li>)}
                </ul>
            </div>

            <div className="p-4">
                <textarea className="border-solid border-purple-300 border-2 resize-none w-full h-40" name="message"></textarea>
            </div>
        </div>
    )
}

export default Channel
