import { put, takeEvery } from 'redux-saga/effects'
import { toast } from 'react-toastify'

import * as Api from './Api'
import * as AuthState from 'State/Auth'
import * as UserState from 'State/User'
import { fetchApi } from 'Utils/Effect'
import { User, UserId } from 'Utils/Types'

function* fetchConnectedUser() {
  try {
    const { data: user }: { data: User } = yield fetchApi(Api.userMe())

    yield put(UserState.receivedUser({ user }))

    yield put(AuthState.receivedConnectedUserId({ id: user.id }))
  } catch (error) {
    yield toast.error("Couldn't get the connected user")
  }
}

function* fetchUser({ payload: { id } }: { payload: { id: UserId } }) {
  try {
    const { data: user }: { data: User } = yield fetchApi(Api.getUser({ id }))

    yield put(UserState.receivedUser({ user }))
  } catch (error) {
    yield toast.error("Couldn't get the user")
  }
}

export default function* rootSaga() {
  yield takeEvery(AuthState.success, fetchConnectedUser)
  yield takeEvery(UserState.fetchUser, fetchUser)
}
