import { put, takeEvery } from 'redux-saga/effects'
import { toast } from 'react-toastify'

import * as Api from './Api'
import * as AuthState from '../State/Auth'
import { fetchApi } from 'Utils/Effect'
import { Auth } from 'Utils/Types'

function* login() {
  try {
    const { data: auth }: { data: Auth } = yield fetchApi(Api.login())

    yield put(AuthState.success({ auth }))

    yield toast.success('Welcome Back')
  } catch (error) {
    console.error(error)
    yield toast.error('Login failed ')
  }
}

function* logout() {
  try {
    yield fetchApi(Api.logout())

    yield put(AuthState.logoutSuccess())
  } catch (error) {
    console.error(error)
    yield toast.error('Login failed ')
  }
}

export default function* rootSaga() {
  yield takeEvery(AuthState.login, login)
  yield takeEvery(AuthState.logout, logout)
}
