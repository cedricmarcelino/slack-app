import AddChannel from "../AddChannel"
import AddMember from "../AddMember"
import Channel from "../Channel"
import DirectMessage from "../DirectMessage"

function Maincontent(props) {
    const {activePage, userHeaders, userId, setValue,value,channelName,channelID,recipientName,recipientID,listOfMessages,setListOfMessages,setActivePage, counter, setCounter} = props

    return (
        <div className="w-10/12 bg-gray-200">
            {activePage==="AddChannel" && <AddChannel userHeaders={userHeaders} userId={userId} setValue={setValue} value={value} />}
            {activePage==="Channel" && <Channel channelName={channelName} channelID={channelID} listOfMessages={listOfMessages} setListOfMessages={setListOfMessages} userHeaders={userHeaders} setActivePage={setActivePage} counter={counter} setCounter={setCounter}/>}
            {activePage==="AddMember" && <AddMember channelID={channelID} userHeaders={userHeaders}/>}
            {activePage==="DirectMessage" && <DirectMessage recipientName={recipientName} recipientID={recipientID} listOfMessages={listOfMessages} setListOfMessages={setListOfMessages} userHeaders={userHeaders}/>}
        </div>
    )
}

export default Maincontent
