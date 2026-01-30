import React from 'react'

export default function Login() {

  const logIn = (event) => {
    event.preventDefault()
    alert('Log in clicked')
  }

  const logInAsVisitor = (event) => {
    event.preventDefault()
    alert('Logged in as visitor')
  }

  return (
    <div>
      <h2>Login</h2>

      <input type="text" id="username" placeholder="Enter your username" />
      

      <input type="text" id="password" placeholder="Enter your password"/>
     

      <button onClick={(event) => logIn(event)}>
        Log In
      </button>

     

      <p>Don't want to log in?</p>

      <button onClick={(event) => logInAsVisitor(event)}>
        Login as visitor
      </button>
    </div>
  )
}
