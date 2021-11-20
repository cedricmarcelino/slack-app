import { useHistory, Redirect } from "react-router"

function Dashboard (props) {
    const {currentUser, setCurrentUser} = props
    let history = useHistory()
    
    function onLogout(){
        history.push("/")
        setCurrentUser({})
    }

    if(Object.keys(currentUser).length === 0) {
        return <Redirect to="/"/>
    } else {
        return (
            <div> 
                <h1>User Logged in: {currentUser.data.email}</h1>
                <button onClick={onLogout}>Logout</button>
            </div>
        )
    }

}
export default Dashboard