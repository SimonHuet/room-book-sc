import { EntityId } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'State'

import * as AuthState from 'State/Auth'
import * as UserState from 'State/User'
import { User } from 'Utils/Types'

type Props = {
  children: JSX.Element | JSX.Element[]
}

export const AuthLayout: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch()

  const connectedUserId = useSelector(
    AuthState.select.connectedUserId
  ) as EntityId

  const isLoading = useSelector(AuthState.select.isLoading)
  const connectedUser: User | undefined = useSelector((state: RootState) =>
    UserState.select.users.selectById(state, connectedUserId)
  )

  const handleLogin = () => dispatch(AuthState.login())

  const handleLogout = () => dispatch(AuthState.logout())

  return (
    <div>
      {isLoading && <div>Loading ...</div>}
      {connectedUser === undefined ? (
        <div>
          <button onClick={handleLogin}> Login </button>
        </div>
      ) : (
        <div>
          <button onClick={handleLogout}> Logout </button>
          <span>{connectedUser.name}</span>
          {children}
        </div>
      )}
    </div>
  )
}
