import { reducer as authReducer, AuthState } from './Auth'
import { reducer as roomReducer, RoomState } from './Room'
import { reducer as userReducer, UserState } from './User'

export type RootState = {
  auth: AuthState
  room: RoomState
  user: UserState
}

export const rootReducer = {
  auth: authReducer,
  room: roomReducer,
  user: userReducer,
}
