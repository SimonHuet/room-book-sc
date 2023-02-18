import { fork, all } from 'redux-saga/effects'
import AuthSaga from './Auth'
import BookingSaga from './Booking'
import RoomSaga from './Room'
import UserSaga from './User'

export default function* rootSaga() {
  yield all([fork(AuthSaga), fork(BookingSaga), fork(RoomSaga), fork(UserSaga)])
}
