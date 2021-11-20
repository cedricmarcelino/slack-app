import { useState, useRef } from 'react';
import { Redirect } from 'react-router';
import Login from './Login';
import Signup from './Signup';



function Home(props){
  const {currentUser, setCurrentUser} = props
  const [logInReminder, setLogInReminder] = useState("")
  const [signUpReminder, setSignUpReminder] = useState("")
  const emailLogInInput = useRef("")
  const passwordLogInput = useRef("")
  const emailSignUpInput = useRef("")
  const passwordSignUpInput = useRef("")
  const confirmSignUpInput = useRef("")


  
  let signupState = {
    state: "signup",
    buttonText: "Log In",
    captionText: "Already have an Account?",
    transitionClass: "-translate-x-96 "
  }
  let loginState =  {
    state: "login",
    buttonText: "Sign Up",
    captionText: "Don't have an Account?",
    transitionClass: "translate-x-0 "
  }
  const [homeState, setHomeState] = useState(loginState)


  function onTransition() {
    emailLogInInput.current.value = ""
    passwordLogInput.current.value = ""
    emailSignUpInput.current.value = ""
    passwordSignUpInput.current.value = ""
    confirmSignUpInput.current.value = ""
    setLogInReminder("")
    setSignUpReminder("")

    if(homeState.state==="login"){
      setHomeState(signupState)
    } else {
      setHomeState(loginState)
    }
  }

  if(Object.keys(currentUser).length === 0){
    return (
    <div className = "border-8 absolute h-100 w-100">
      <div className= {`h-44 w-50 border-8 absolute right-0 z-10 bg-gray-400 text-center h-full transform transition-all delay-200 ease-in-out duration-700 ${homeState.transitionClass}`} >
        <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">{homeState.captionText}</h2>

        <button
          onClick={onTransition}
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
        >
          {homeState.buttonText}
        </button>
      </div>

        <Login
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          emailLogInInput={emailLogInInput}
          passwordLogInput={passwordLogInput}
          logInReminder={logInReminder}
          setLogInReminder={setLogInReminder}
        />
        <Signup
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          emailSignUpInput={emailSignUpInput}
          passwordSignUpInput={passwordSignUpInput}
          confirmSignUpInput={confirmSignUpInput}
          signUpReminder={signUpReminder}
          setSignUpReminder={setSignUpReminder}
          setHomeState={setHomeState}
          emailLogInInput={emailLogInInput}
          passwordLogInput={passwordLogInput}
          setLogInReminder={setLogInReminder}
        />
    </div>
    )
  } else {
    return <Redirect to="/dashboard"/>
  }
}
export default Home