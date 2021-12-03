import AddChannel from "../AddChannel"
import AddMember from "../AddMember"
import Channel from "../Channel"
import DirectMessage from "../DirectMessage"
import Welcome from "../Welcome"
import AlertWindow from "../AlertWindow"
import {useState} from "react"

function Maincontent(props) {
    const {activePage, userHeaders, userId, setValue,value,channelName,channelID,recipientName,recipientID,listOfMessages,setListOfMessages,setActivePage, counter, setCounter, mobileView,setCurrentUser,setShowMenu} = props

    const [alertWindowVisible,setAlertWindowVisible] = useState(false)
    const [alertMessage,setAlertMessage] = useState("No Alert Message")

    return (
        <div className={`${mobileView ? "w-full relative": "w-10/12 relative"} bg-gray-200`}>
            <AlertWindow mobileView={mobileView} alertMessage={alertMessage} alertWindowVisible={alertWindowVisible} setAlertWindowVisible={setAlertWindowVisible}/>
            {activePage==="AddChannel" && <AddChannel userHeaders={userHeaders} userId={userId} setValue={setValue} value={value} setAlertMessage={setAlertMessage} setAlertWindowVisible={setAlertWindowVisible}/>}
            {activePage==="Channel" && <Channel channelName={channelName} channelID={channelID} listOfMessages={listOfMessages} setListOfMessages={setListOfMessages} userHeaders={userHeaders} setActivePage={setActivePage} counter={counter} setCounter={setCounter} mobileView={mobileView}/>}
            {activePage==="AddMember" && <AddMember channelID={channelID} userHeaders={userHeaders} setAlertMessage={setAlertMessage} setAlertWindowVisible={setAlertWindowVisible}/>}
            {activePage==="DirectMessage" && <DirectMessage recipientName={recipientName} recipientID={recipientID} listOfMessages={listOfMessages} setListOfMessages={setListOfMessages} userHeaders={userHeaders}/>}
            {activePage==="Welcome" && <Welcome userId={userId} setCurrentUser={setCurrentUser} mobileView={mobileView} setShowMenu={setShowMenu} setActivePage={setActivePage}/>}
        </div>
    )
}

export default Maincontent
