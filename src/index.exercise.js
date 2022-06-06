import '@reach/dialog/styles.css'
import {Dialog} from '@reach/dialog'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {Logo} from 'components/logo'

function LoginForm({onSubmit, buttonText}) {
    function handleSubmit(event) {
        event.preventDefault()
        const {username, password} = event.target.elements
    
        onSubmit({
          username: username.value,
          password: password.value,
        })
      }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">username</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">{buttonText}</button>
    </form>
  )
}

function App() {
  const [openModal, setOpenModal] = React.useState('none')
  function login(formData) {
    console.log('login', formData)
  }
  function register(formData) {
    console.log('register', formData)
  }
  return (
    <div>
      <Logo width="40" height="40" />
      <h1>Bookshelf</h1>
      <button onClick={() => setOpenModal('login')}>Login</button>
      <button onClick={() => setOpenModal('register')}>Register</button>

      <Dialog aria-label="Login form" isOpen={openModal === 'login'}>
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <h3>login</h3>
        <LoginForm onSubmit={login} buttonText='login' />
      </Dialog>
      <Dialog aria-label="Register form" isOpen={openModal === 'register'}>
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <h3>register</h3>
        <LoginForm onSubmit={register} buttonText='register' />
      </Dialog>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
