import {useHistory } from 'react-router';


function Login(props){
  const {setCurrentUser, emailLogInInput, passwordLogInput, logInReminder, setLogInReminder} = props
  let history = useHistory()


  async function logInUser(event){
    event.preventDefault()
    //gets information for api call from values of inputs (email, password)
    let body = {
      "email": emailLogInInput.current.value,
      "password": passwordLogInput.current.value
    }
    let url = "http://206.189.91.54/api/v1/auth/sign_in/"
    let headersList =  ["access-token", "client", "expiry", "uid"]

    //fetches api using information from body and stores response in "userData"
    const user = await fetch(url,
    {method: "POST",
    headers: {
      'Content-Type': 'application/json'
      }, 
    mode:"cors",
      body: JSON.stringify(body)})
    let userData = await user.json()

    // runs only if sign up was successful (determined using response status)
    if(user.status >= 200 && user.status<=299 ){
      let headers = await user.headers
      let head = Array.from(headers.entries()).reduce((headers,pair) => {
        if(headersList.includes(pair[0])){
          return {
            ...headers,
            [pair[0]]: pair[1]
          }
        } else {
          return headers
        }
      },{})

      //updates currentUser data and stores both the user data and login response headers
      setCurrentUser({
        ...userData, 
        "headers" : head
      })
      //redirects the page to dashboard
      history.push("/dashboard")
    } else {
      //if api call is unsuccessful, the error is displayed
      setLogInReminder(userData.errors[0])
    }
  }


  return (
  <div className="min-h-full absolute lg:items-center lg:justify-center py-12 px-4 sm:px-6 lg:px-8 lg:left-0 lg:w-1/2 lg:top-0 lg:left-0 lg:translate-x-0 lg:translate-y-0 sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:translate-y-1/2">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />



          
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in to your account</h2>
        </div>
        <div><h2>{logInReminder}</h2></div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                ref={emailLogInInput}
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
                ref={passwordLogInput}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            {/* <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div> */}
          </div>

          <div>
            <button
            onClick={logInUser}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Login