import { reducer as authReducer, AuthState } from './Auth'
import { reducer as bookingReducer, BookingState } from './Booking'
import { reducer as roomReducer, RoomState } from './Room'
import { reducer as userReducer, UserState } from './User'

export type RootState = {
  auth: AuthState
  booking: BookingState
  room: RoomState
  user: UserState
}

export const rootReducer = {
  auth: authReducer,
  booking: bookingReducer,
  room: roomReducer,
  user: userReducer,
}
