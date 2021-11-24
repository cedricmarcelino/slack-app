import { useHistory, Redirect } from "react-router"

function Header({currentUser,setCurrentUser}) {

    let history = useHistory()
    
    function onLogout(){
        history.push("/")
        setCurrentUser({})
    }

    
    return (
        <div className="bg-purple-800 text-white font-bold flex justify-evenly">
            <span>Hello {currentUser.data.email}</span>
            <span onClick={onLogout} className="cursor-pointer">Log out</span>
        </div>
    )
}

export default Header
