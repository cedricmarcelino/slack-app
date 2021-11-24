import AddChannel from "../AddChannel"

function Maincontent(props) {
    const {activePage} = props

    return (
        <div className="w-3/4 bg-gray-200">
            {activePage==="AddChannel" && <AddChannel />}
        </div>
    )
}

export default Maincontent
