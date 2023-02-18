import { put, takeEvery } from 'redux-saga/effects'
import { fetchApi } from 'Utils/Effect'

import * as Api from './Api'
import * as RoomState from 'State/Room'
import { Room } from 'Utils/Types'

function* fetchRoom() {
  try {
    const { data: room }: { data: Room } = yield fetchApi(Api.getRoom())

    yield put(RoomState.receivedRoom({ room }))
  } catch (error) {
    console.error(error)
  }
}

export default function* rootSaga() {
  yield takeEvery(RoomState.fetchRoom, fetchRoom)
}
