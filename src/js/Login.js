import logo from '../logo.svg';
import { useHistory } from 'react-router';
import { useRef } from 'react';



function Login(){

  const emailInput = useRef("")
  const passwordInput = useRef("")

  let history = useHistory()


async function logInUser(){

  let body = {
    "email": emailInput.current.value,
    "password": passwordInput.current.value
  }
  let url = "http://206.189.91.54/api/v1/auth/sign_in/"
  let headersList =  ["access-token", "client", "expiry", "uid"]

  const user = await fetch(url,
   {method: "POST",
   headers: {
     'Content-Type': 'application/json',
     "Access-Control-Expose-Headers": "*"
   }, 
   mode:"cors",
    body: JSON.stringify(body)})
  let userData = await user.json()
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

  console.log({userData, head})
}

  function onLogin() {
      history.push("/dashboard")
      logInUser()
    }



    return (
    <div className="min-h-full absolute items-center justify-center py-12 px-4 sm:px-6 lg:px-8 left-0 w-1/2">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in to your account</h2>

          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  ref={emailInput}
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
                  ref={passwordInput}
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

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
              onClick={onLogin}
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