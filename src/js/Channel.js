import {useEffect,useRef,useState} from 'react'

function Channel(props) {

    const {channelName,channelID,listOfMessages,userHeaders,setListOfMessages,setActivePage, counter, setCounter, mobileView} = props
    const [message,setMessage] = useState("")
    const [value,setValue] = useState(0)
    const [loading,setLoading] = useState()
    const endOfMessages = useRef(null)
    

    function handleClick(){
        setActivePage("AddMember")
    }
    
    function handleChange(e){
        setMessage(e.target.value)
    }
    
    async function sendMessage(body){
        await fetch("http://206.189.91.54/api/v1/messages",
            {method: "POST",
            headers: userHeaders, 
            mode:"cors",
            body: JSON.stringify(body)})
        .then(response=>response.json())
        .then(data=>{
            setValue(value=>value+1)})
        .catch((error) => {
            console.log(error)
        })
    }

    function handleSentMessage(){
        const body={
            "receiver_id": channelID,
            "receiver_class": "Channel",
            "body": message
        }
        sendMessage(body)
        setMessage("")
    }

    function onKeyHandleSentMessage(e){
        if (e.key === "Enter"){
            e.preventDefault()
            const body={
                "receiver_id": channelID,
                "receiver_class": "Channel",
                "body": message
            }
            sendMessage(body)
            setMessage("")
        }
    }

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
                })
                setListOfMessages(tempListOfMessages)

            } else {
                console.log("NO MESSAGES")
            }
            setLoading(false)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect( ()=>{
        // removed these two lines so it doesnt look buggy when sending a message
        // setListOfMessages([])
        // setLoading(true)
        retrieveMessages()
    },[channelName,value])

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(counter + 1)
            retrieveMessages()
        }, 5000);
        return () => {
          clearInterval(interval);
        };
      }, [counter]);

    
    const scrollToBottom = () => {
        endOfMessages.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(()=>{
        scrollToBottom()
    },[listOfMessages])


    return (
        <div className="h-full flex flex-col justify-between max-h-90%">
            <div className="border-solid border-purple-300 border-2 bg-white p-3 flex justify-between">
                <span className={`font-bold ${mobileView ? "text-xl": "text-3xl"}`}>{channelName} #{channelID}</span>
                <span className={`font-bold text-center ${mobileView ? "text-base": "text-xl"} cursor-pointer`} onClick={handleClick}>+ Add Member</span>
            </div>

            <div className="p-4 h-screen max-h-90 overflow-y-scroll">
                {loading ? 
                <div className="text-center my-10"> Fetching Messages </div>
                : 
                listOfMessages.map((message) => 
                <div className={message.sender.uid===userHeaders.uid ? `ml-auto mr-0 ${mobileView ? "w-4/6" : "w-2/6" }` : `ml-0 mr-auto ${mobileView ? "w-4/6" : "w-2/6" }`}>
                    <div className={message.sender.uid===userHeaders.uid ? "m-3 font-semibold text-right" : "m-3 font-semibold"}>{message.sender.uid===userHeaders.uid ? "You" :message.sender.uid}</div>
                    <div className={message.sender.uid===userHeaders.uid ? "border-solid rounded-md border-purple-300 border-2 text-lg p-4 m-3 bg-purple-500 text-white" : "bg-purple-900 border-solid rounded-md border-purple-300 border-2 text-lg p-4 m-3 text-white"}>
                            <span>{message.body}</span>
                    </div>
                </div>
                )
                }
                <div className="h-px w-px" ref={endOfMessages}> </div>
            </div>
                

            <div className="p-4">
                <textarea className="border-solid border-purple-300 border-2 resize-none w-full h-40 p-4" name="message" onChange={handleChange} onKeyPress={e=>onKeyHandleSentMessage(e)} value={message}></textarea>
                <button className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded" onClick={handleSentMessage}>
                    Send Message
                </button>
            </div>
        </div>
    )
}

export default Channel
