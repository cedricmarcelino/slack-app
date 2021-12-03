function Header({mobileView,setShowMenu,showMenu}) {


    function showNav(){
        if(showMenu===false){
            setShowMenu(true)
        }else {
            setShowMenu(false)
        }
    }

    
    return (
        
        <div className={`bg-purple-800 text-white font-bold flex ${!mobileView ? "justify-left" : "justify-between" } p-3`}>
            <span className="text-3xl mx-3">aChat</span>
            {mobileView && <span className="cursor-pointer text-3xl mx-3" onClick={showNav}> ☰ </span>}
            
        </div>
    
    )
}

export default Header
