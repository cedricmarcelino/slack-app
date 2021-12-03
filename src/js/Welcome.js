import { useHistory } from "react-router"

function Welcome(props) {
    const {userId,setCurrentUser,mobileView} = props

    let history = useHistory()
    
    function onLogout(){
        history.push("/")
        setCurrentUser({})
    }


    return (
        <div className="flex flex-col w-full px-2">
           <span className="text-3xl font-bold text-center mt-20">Welcome to your Dashboard!</span>
        
           <span className="text-xl text-center font-semibold">Your Account ID is #{userId}</span>

           <span className="text-center italic m-20">"Avion Chat helps you connect with your community anytime, anywhere!"</span>

           <button onClick={onLogout} className={`bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded ${mobileView ? "w-2/4" : "w-1/4"} mx-auto`}>
           Switch Account
                </button>
        </div>
    )
}

export default Welcome
