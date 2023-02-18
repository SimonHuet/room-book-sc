import { put, takeEvery } from 'redux-saga/effects'
import { fetchApi } from 'Utils/Effect'

import * as Api from './Api'
import * as AuthState from 'State/Auth'
import * as UserState from 'State/User'
import { User } from 'Utils/Types'

function* fetchConnectedUser() {
  try {
    const { data: connectedUser }: { data: User } = yield fetchApi(Api.userMe())

    yield put(UserState.receivedConnectedUser({ connectedUser }))

    yield put(AuthState.receivedConnectedUserId({ id: connectedUser.id }))
  } catch (error) {
    console.error(error)
  }
}

export default function* rootSaga() {
  yield takeEvery(AuthState.success, fetchConnectedUser)
}
