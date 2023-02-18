import { reducer as authReducer, AuthState } from './Auth'
import { reducer as userReducer, UserState } from './User'

export type RootState = {
  auth: AuthState
  user: UserState
}

export const rootReducer = {
  auth: authReducer,
  user: userReducer,
}
