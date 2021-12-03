import { useHistory } from "react-router"

function Header({currentUser,setCurrentUser,mobileView,setShowMenu,showMenu}) {

    

    let history = useHistory()
    
    function onLogout(){
        history.push("/")
        setCurrentUser({})
    }

    function showNav(){
        if(showMenu===false){
            setShowMenu(true)
        }else {
            setShowMenu(false)
        }
    }

    
    return (
        
        <div className="bg-purple-800 text-white font-bold flex justify-evenly p-3">
            <span>Hello {currentUser.data.email}</span>
            {mobileView ? <span className="cursor-pointer text-2xl" onClick={showNav}> ☰ </span>: <span onClick={onLogout} className="cursor-pointer">Log out</span>}
            
        </div>
    
    )
}

export default Header
