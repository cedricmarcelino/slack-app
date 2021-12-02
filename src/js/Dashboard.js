import Header from "./dashboard-components/Header"
import Sidebar from "./dashboard-components/Sidebar"
import {Redirect } from "react-router"
import Maincontent from "./dashboard-components/Maincontent"
import {useState} from "react"

function Dashboard (props) {
    const {currentUser, setCurrentUser} = props
    const [activePage, setActivePage] = useState("")
    const userInfo = JSON.parse(localStorage.getItem('currentUser'))
    const userHeaders = userInfo.headers
    const userId = userInfo.data.id
    const [value,setValue] = useState(0)
    const [channelName,setChannelName] = useState("")
    const [channelID,setChannelID] = useState()
    const [recipientName, setRecipientName] = useState("") //copy of channelName state for DM
    const [recipientID, setRecipientID] = useState() //copy of channelID state for DM
    const [listOfMessages,setListOfMessages] = useState([])
    const [counter, setCounter] = useState(0)

    if(Object.keys(currentUser).length === 0) {
        return <Redirect to="/"/>
    } else {
        return (
            <div className="flex flex-col h-screen">
                <Header currentUser={currentUser} setCurrentUser={setCurrentUser}/>
                <div className="flex flex-grow">
                    <Sidebar userHeaders={userHeaders} setActivePage={setActivePage} value={value} setChannelName={setChannelName} setRecipientName={setRecipientName} setChannelID={setChannelID} setRecipientID={setRecipientID} setListOfMessages={setListOfMessages} counter = {counter} setCounter = {setCounter}/>
                    <Maincontent activePage={activePage} userHeaders={userHeaders} userId={userId} setValue={setValue} value={value} channelName={channelName} recipientName={recipientName} channelID={channelID} recipientID={recipientID} listOfMessages={listOfMessages} setListOfMessages={setListOfMessages} setActivePage={setActivePage} counter = {counter} setCounter = {setCounter}/>
                </div>
            </div>
        )
    }

}
export default Dashboard