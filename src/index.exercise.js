// 🐨 you'll need to import react and createRoot from react-dom up here

// 🐨 you'll also need to import the Logo component from './components/logo'

// 🐨 create an App component here and render the logo, the title ("Bookshelf"), a login button, and a register button.
// 🐨 for fun, you can add event handlers for both buttons to alert that the button was clicked

// 🐨 use createRoot to render the <App /> to the root element
// 💰 find the root element with: document.getElementById('root')

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Logo } from 'components/logo'

function App(){
    return(
        <div>
            <Logo width='40' height='40'/>
            <h1>Bookshelf</h1>
            <button>Login</button>
            <button>Register</button>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)