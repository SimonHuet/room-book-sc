import { put, takeEvery } from 'redux-saga/effects'
import { fetchApi } from 'Utils/Effect'

import * as Api from './Api'
import * as AuthState from '../State/Auth'
import { Auth } from 'Utils/Types'

function* login() {
  try {
    const { data: auth }: { data: Auth } = yield fetchApi(Api.login())

    yield put(AuthState.success({ auth }))
  } catch (error) {
    console.error(error)
  }
}

function* logout() {
  try {
    yield fetchApi(Api.logout())

    yield put(AuthState.logoutSuccess())
  } catch (error) {
    console.error(error)
  }
}

export default function* rootSaga() {
  yield takeEvery(AuthState.login, login)
  yield takeEvery(AuthState.logout, logout)
}
