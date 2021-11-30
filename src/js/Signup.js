

function Signup(props){
  const {emailSignUpInput, passwordSignUpInput, confirmSignUpInput, signUpReminder, setSignUpReminder, setHomeState, emailLogInInput, passwordLogInput, setLogInReminder } = props


  //RegisterUser function for when the sign up button is clicked
  async function registerUser(event){
    event.preventDefault()
    //gets information for api call from values of inputs (email, password, confirmpassword)
    let body = {
      "email": emailSignUpInput.current.value,
      "password": passwordSignUpInput.current.value,
      "password_confirmation": confirmSignUpInput.current.value
    }
    let url = "http://206.189.91.54/api/v1/auth/"

    //fetches api using information from body and stores response in "userData"
    const user = await fetch(url,
      {method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(body)})
    let userData = await user.json()
    
    // runs only if sign up was successful (determined using response status)
    if(user.status >= 200 && user.status<=299 ){
      emailLogInInput.current.value = emailSignUpInput.current.value
      passwordLogInput.current.value = passwordSignUpInput.current.value
      emailSignUpInput.current.value = ""
      passwordSignUpInput.current.value = ""
      confirmSignUpInput.current.value = ""
      let loginState =  {
        state: "login",
        buttonText: "Sign Up",
        captionText: "Don't have an Account?",
        transitionClass: "translate-x-0 "
      }
      //switches pane to login if signup was successful and adds reminder
      setHomeState(loginState)
      setLogInReminder("Sign up was successful. You may now log in.")
    } else {
      //if api call is unsuccessful, the error is displayed
      setSignUpReminder(userData.errors.full_messages[0])
    }
  }
  function onSignupEnter(e){
    if(e.key==="Enter"){
      e.preventDefault()
      registerUser(e)
      // emailLogInInput.current.focus()
      emailSignUpInput.current.blur()
      passwordSignUpInput.current.blur()
      confirmSignUpInput.current.blur()
      setTimeout(() => {
        emailLogInInput.current.focus()
      }, 1000);
    }
  }

  return (
  <div className="min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 absolute right-0 w-1/2">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
        </div>
        <div><h2>{signUpReminder}</h2></div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                onKeyPress={e=>onSignupEnter(e)}
                ref={emailSignUpInput}
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                onKeyPress={e=>onSignupEnter(e)}
                ref={emailSignUpInput}
                ref={passwordSignUpInput}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Confirm Password
              </label>
              <input
                onKeyPress={e=>onSignupEnter(e)}
                ref={emailSignUpInput}
                ref={confirmSignUpInput}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
            </div>
          </div>


          <div>
            <button
            onClick={registerUser}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>
          
        </form>
      </div>
    </div>
  )
}
export default Signup