import Header from "./dashboard-components/Header"
import Sidebar from "./dashboard-components/Sidebar"
import { useHistory, Redirect } from "react-router"
import Maincontent from "./dashboard-components/Maincontent"
import {useState} from "react"

function Dashboard (props) {
    const {currentUser, setCurrentUser} = props
    const [activePage, setActivePage] = useState("")
    const userInfo = JSON.parse(localStorage.getItem('currentUser'))
    const userHeaders = userInfo.headers

    if(Object.keys(currentUser).length === 0) {
        return <Redirect to="/"/>
    } else {
        return (
            <>
                <Header currentUser={currentUser} setCurrentUser={setCurrentUser}/>
                <div className="flex">
                    <Sidebar userHeaders={userHeaders} setActivePage={setActivePage}/>
                    <Maincontent activePage={activePage}/>
                </div>
            </>
        )
    }

}
export default Dashboard