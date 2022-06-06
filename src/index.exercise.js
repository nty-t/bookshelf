import "@reach/dialog/styles.css";
import {Dialog} from '@reach/dialog'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {Logo} from 'components/logo'

function App() {
  const [openModal, setOpenModal] = React.useState('none')
  return (
    <div>
      <Logo width="40" height="40" />
      <h1>Bookshelf</h1>
      <button onClick={() => setOpenModal('login')}>Login</button>
      <button onClick={() => setOpenModal('register')}>Register</button>
      
      <Dialog aria-label="Login form"  isOpen={openModal === 'login'}>
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <h3>login</h3>
      </Dialog>
      <Dialog aria-label="Register form"  isOpen={openModal === 'register'}>
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <h3>register</h3>
      </Dialog>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
