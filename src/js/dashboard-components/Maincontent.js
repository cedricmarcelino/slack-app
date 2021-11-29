import AddChannel from "../AddChannel"
import AddMember from "../AddMember"
import Channel from "../Channel"
import AddMemberForDM from "../AddMemberForDM"

function Maincontent(props) {
    const {activePage, userHeaders, userId, setValue,value,channelName,channelID,listOfMessages,setListOfMessages,setActivePage} = props

    return (
        <div className="w-10/12 bg-gray-200">
            {activePage==="AddChannel" && <AddChannel userHeaders={userHeaders} userId={userId} setValue={setValue} value={value} />}
            {activePage==="Channel" && <Channel channelName={channelName} channelID={channelID} listOfMessages={listOfMessages} setListOfMessages={setListOfMessages} userHeaders={userHeaders} setActivePage={setActivePage}/>}
            {activePage==="AddMember" && <AddMember channelID={channelID} userHeaders={userHeaders}/>}
            {activePage==="AddMemberForDM" && <AddMemberForDM userHeaders={userHeaders} userId={userId} setValue={setValue} value={value}/>}
        </div>
    )
}

export default Maincontent
