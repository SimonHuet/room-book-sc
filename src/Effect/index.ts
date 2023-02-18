import { fork, all } from 'redux-saga/effects'
import AuthSaga from './Auth'
import UserSaga from './User'

export default function* rootSaga() {
  yield all([fork(AuthSaga), fork(UserSaga)])
}
