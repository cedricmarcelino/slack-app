import AddChannel from "../AddChannel"
import Channel from "../Channel"

function Maincontent(props) {
    const {activePage, userHeaders, userId} = props

    return (
        <div className="w-3/4 bg-gray-200">
            {activePage==="AddChannel" && <AddChannel userHeaders={userHeaders} userId={userId}/>}
            {activePage==="Channel" && <Channel />}
        </div>
    )
}

export default Maincontent
