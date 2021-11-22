import { useRef } from "react"
import { useHistory, Redirect } from "react-router"

function Dashboard (props) {
    const {currentUser, setCurrentUser} = props
    let history = useHistory()
    const sendInput = useRef("")
    
    function onLogout(){
        history.push("/")
        setCurrentUser({})
    }


    async function onSendMessage(event){
        event.preventDefault()
        let message = sendInput.current.value

        let body = {
            "receiver_id": 1275,
            "receiver_class": "User",
            "body": message
        }
        let url = "http://206.189.91.54/api/v1/messages"
        let headerData = currentUser.headers
        const data = await fetch(url,
        {method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "access-token": headerData["access-token"],
          "client": headerData["client"],
          "expiry": headerData["expiry"],
          "uid": headerData["uid"]
          }, 
        mode:"cors",
          body: JSON.stringify(body)})
        let userData = await data.json()
        console.log(userData)
    }

    async function onReceiveMessages(event){
        event.preventDefault()

        let body = {
            "receiver_id": 1275,
            "receiver_class": "User",
        }
        let url = "http://206.189.91.54/api/v1/messages?" +`receiver_id=${1275}&receiver_class=User`
        let headerData = currentUser.headers
        const data = await fetch(url,
        {method: "GET",
        headers: {
          'Content-Type': 'application/json',
          "access-token": headerData["access-token"],
          "client": headerData["client"],
          "expiry": headerData["expiry"],
          "uid": headerData["uid"]
          }, 
        mode:"cors"})
        let userData = await data.json()
        console.log(userData)
    }



    if(Object.keys(currentUser).length === 0) {
        return <Redirect to="/"/>
    } else {
        return (
            <div> 
                <h1>User Logged in: {currentUser.data.email}</h1>
                <button onClick={onLogout}>Logout</button>
                <input type="text" ref={sendInput}></input>
                <button onClick={onSendMessage}>Send</button>
                <button onClick={onReceiveMessages}>Receive</button>

            </div>
        )
    }

}
export default Dashboard