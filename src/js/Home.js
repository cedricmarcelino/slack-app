import { useState } from 'react';
import { useHistory } from 'react-router';
import Login from './Login';
import Signup from './Signup';



function Home(){
  const [transitionClass, setTransitionClass] = useState("translate-x-0 transform transition-all")
  const [buttonText, setButtonText] = useState("Sign up")
  const [captionText, setCaptionText] = useState("Don't have an Account?")

  let history = useHistory()
  console.log(history)
    function onSignin() {
      history.push("/dashboard")
    }

    function onTransition() {
      if(transitionClass==="translate-x-0 transform transition-all"){
        setTransitionClass("-translate-x-96 transform transition-all ")
        setButtonText("Log In")
        setCaptionText("Already have an Account?")
      } else {
        setTransitionClass("translate-x-0 transform transition-all")
        setButtonText("Sign Up")
        setCaptionText("Don't have an Account?")

      }
    }


    return (
    <div className = "border-8 absolute h-100 w-100">
      <div className= {`h-44 w-50 border-8 absolute right-0 z-10 bg-gray-400 text-center h-full ${transitionClass}`} >
        <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">{captionText}</h2>

        <button
          onClick={onTransition}
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {buttonText}
        </button>
      </div>

        <Login/>
        <Signup/>
    </div>
    )
}
export default Home