import AddChannel from "../AddChannel"
import Channel from "../Channel"

function Maincontent(props) {
    const {activePage} = props

    return (
        <div className="w-3/4 bg-gray-200">
            {activePage==="AddChannel" && <AddChannel />}
            {activePage==="Channel" && <Channel />}
        </div>
    )
}

export default Maincontent
