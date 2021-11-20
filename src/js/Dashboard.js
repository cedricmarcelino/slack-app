import { useHistory, Redirect } from "react-router"

function Dashboard (props) {
    const {authenticated} = props
    let history = useHistory()
    
    function onLogout(){
        history.push("/")
    }

    if(authenticated) {
        return (
            <div> 
                <h1>Hello World</h1>
                <button onClick={onLogout}> Logout</button>
            </div>
        )
    } else {
        return <Redirect to="/"/>
    }

}
export default Dashboard