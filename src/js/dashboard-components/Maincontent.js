import AddChannel from "../AddChannel"
import Channel from "../Channel"

function Maincontent(props) {
    const {activePage, userHeaders, userId, setValue,value,channelName,channelID,listOfMessages,setListOfMessages} = props

    return (
        <div className="w-10/12 bg-gray-200">
            {activePage==="AddChannel" && <AddChannel userHeaders={userHeaders} userId={userId} setValue={setValue} value={value} />}
            {activePage==="Channel" && <Channel channelName={channelName} channelID={channelID} listOfMessages={listOfMessages} setListOfMessages={setListOfMessages} userHeaders={userHeaders}/>}
        </div>
    )
}

export default Maincontent
