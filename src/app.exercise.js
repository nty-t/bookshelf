/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
// 🐨 you're going to need this:
import * as auth from 'auth-provider'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'

import {client} from './utils/api-client'
import {useAsync} from './utils/hooks'
import * as colors from './styles/colors'
import {FullPageSpinner} from './components/lib'

async function getUser() {
  let user = null

  const token = await auth.getToken()
  if (token) {
    const data = await client('me', {token})
    user = data.user
  }

  return user
}

function App() {
  // 🐨 useState for the user
  // const [user, setUser] = React.useState(null)
  const {
    data: user,
    error,
    isIdle,
    isLoading,
    isSuccess,
    isError,
    run,
    setData,
  } = useAsync()

  // 🐨 create a login function that calls auth.login then sets the user
  React.useEffect(() => {
    run(getUser())
  }, [run])

  const login = form => auth.login(form).then(user => setData(user))
  const register = form => auth.register(form).then(user => setData(user))
  const logout = () => {
    auth.logout()
    setData(null)
  }

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return (
      <div>
        <p>...theres a problem, try refreshing the app</p>
        <pre>{error.message}</pre>
      </div>
    )
  }

  if (isSuccess) {
    // 🐨 if there's a user, then render the AuthenticatedApp with the user and logout
    // 🐨 if there's not a user, then render the UnauthenticatedApp with login and register
    return user ? (
      <AuthenticatedApp user={user} logout={logout} />
    ) : (
      <UnauthenticatedApp login={login} register={register} />
    )
  }
}

export {App}

/*
eslint
  no-unused-vars: "off",
*/
