import { EntityId } from '@reduxjs/toolkit'
import { Button } from 'Components/UI/Button'
import { useDispatch, useSelector } from 'react-redux'

import * as AuthState from 'State/Auth'
import * as UserState from 'State/User'
import { RootState } from 'State'
import { User } from 'Utils/Types'

import styles from './AuthLayout.module.scss'

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

  const isAuthenticated = connectedUser !== undefined

  const handleLogin = () => dispatch(AuthState.login())

  const handleLogout = () => dispatch(AuthState.logout())

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles['app-name']}>Room book SC</h1>

        <Button
          id={isAuthenticated ? 'Logout' : 'Login'}
          onClick={isAuthenticated ? handleLogout : handleLogin}
          isLoading={isLoading}
          secondary
        >
          {isAuthenticated ? 'Logout' : 'Login'}
        </Button>
      </header>

      <div className={styles.content}>
        {isAuthenticated ? (
          <>
            <div className={styles.alert}>
              Welcome <span className={styles.name}>{connectedUser?.name}</span>
            </div>
            {children}
          </>
        ) : (
          <div className={styles.alert}>
            You have to Login to access the Room planning !
          </div>
        )}
      </div>
    </div>
  )
}
