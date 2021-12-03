import Header from "./dashboard-components/Header"
import Sidebar from "./dashboard-components/Sidebar"
import {Redirect } from "react-router"
import Maincontent from "./dashboard-components/Maincontent"
import {useState} from "react"
import Media from "react-media"

function Dashboard (props) {
    const {currentUser, setCurrentUser} = props
    const [activePage, setActivePage] = useState("Welcome")
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
    const [showMenu,setShowMenu] = useState(false)

    if(Object.keys(currentUser).length === 0) {
        return <Redirect to="/"/>
    } else {
        return (
            <>

            

            <Media query="(max-width: 1332px)">
                {matches => (matches && 
                    <>
                        <div className="flex flex-col h-screen">
                            <Header mobileView={true} showMenu={showMenu} setShowMenu={setShowMenu}/>
                            <div className="flex flex-grow">
                                <Maincontent activePage={activePage} userHeaders={userHeaders} userId={userId} setValue={setValue} value={value} channelName={channelName} recipientName={recipientName} channelID={channelID} recipientID={recipientID} listOfMessages={listOfMessages} setListOfMessages={setListOfMessages} setActivePage={setActivePage} counter = {counter} setCounter = {setCounter} mobileView={true} setChannelName={setChannelName} setRecipientName={setRecipientName} setChannelID={setChannelID} setRecipientID={setRecipientID} showMenu={showMenu} setShowMenu={setShowMenu} setCurrentUser={setCurrentUser}/>
                                <Sidebar userHeaders={userHeaders} setActivePage={setActivePage} value={value} setChannelName={setChannelName} setRecipientName={setRecipientName} setChannelID={setChannelID} setRecipientID={setRecipientID} setListOfMessages={setListOfMessages} counter = {counter} setCounter = {setCounter} showMenu={showMenu} mobileView={true} setShowMenu={setShowMenu}/>
                            </div>
                        </div> 
                    </>

                )}
            </Media>

            <Media query="(min-width: 1333px)">
                {matches => (matches && 
                
                    <div className="flex flex-col h-screen">
                        <Header mobileView={false} showMenu={showMenu} setShowMenu={setShowMenu}/>
                        <div className="flex flex-grow">
                            <Sidebar userHeaders={userHeaders} setActivePage={setActivePage} value={value} setChannelName={setChannelName} setRecipientName={setRecipientName} setChannelID={setChannelID} setRecipientID={setRecipientID} setListOfMessages={setListOfMessages} counter = {counter} setCounter = {setCounter} mobileView = {false} showMenu={showMenu} setShowMenu={setShowMenu}/>
                            <Maincontent activePage={activePage} userHeaders={userHeaders} userId={userId} setValue={setValue} value={value} channelName={channelName} recipientName={recipientName} channelID={channelID} recipientID={recipientID} listOfMessages={listOfMessages} setListOfMessages={setListOfMessages} setActivePage={setActivePage} counter = {counter} setCounter = {setCounter} mobileView={false} setCurrentUser={setCurrentUser}/>
                        </div>
                    </div> 
                
                )}
            </Media>

            </>

        )
    }

}
export default Dashboard