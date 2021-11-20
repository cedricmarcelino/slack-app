import { useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import Login from './Login';
import Signup from './Signup';



function Home(props){
  const {currentUser, setCurrentUser} = props

  let signupClasses = "translate-x-0 "
  let loginClasses = "-translate-x-96 "


  const [buttonText, setButtonText] = useState("Sign up")
  const [captionText, setCaptionText] = useState("Don't have an Account?")
  const [transitionClass, setTransitionClass] = useState(signupClasses)

  let history = useHistory()
  function onSignin() {
    history.push("/dashboard")
  }

  function onTransition() {
    if(transitionClass===signupClasses){
      setTransitionClass(loginClasses)
      setButtonText("Log In")
      setCaptionText("Already have an Account?")
    } else {
      setTransitionClass(signupClasses)
      setButtonText("Sign Up")
      setCaptionText("Don't have an Account?")

    }
  }

  if(Object.keys(currentUser).length === 0){
    return (
    <div className = "border-8 absolute h-100 w-100">
      <div className= {`h-44 w-50 border-8 absolute right-0 z-10 bg-gray-400 text-center h-full transform transition-all delay-200 ease-in-out duration-700 ${transitionClass}`} >
        <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">{captionText}</h2>

        <button
          onClick={onTransition}
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
        >
          {buttonText}
        </button>
      </div>

        <Login
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
        <Signup
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
    </div>
    )
  } else {
    return <Redirect to="/dashboard"/>
  }
}
export default Home