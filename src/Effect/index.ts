import { fork, all } from 'redux-saga/effects'
import AuthSaga from './Auth'
import RoomSaga from './Room'
import UserSaga from './User'

export default function* rootSaga() {
  yield all([fork(AuthSaga), fork(RoomSaga), fork(UserSaga)])
}
