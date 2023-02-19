import { put, takeEvery } from 'redux-saga/effects'
import { toast } from 'react-toastify'

import * as Api from './Api'
import * as RoomState from 'State/Room'
import { fetchApi } from 'Utils/Effect'
import { Room } from 'Utils/Types'

function* fetchRoom() {
  try {
    const { data: room }: { data: Room } = yield fetchApi(Api.getRoom())

    yield put(RoomState.receivedRoom({ room }))
  } catch (_) {
    yield toast.error("The room couldn't be received")
  }
}

export default function* rootSaga() {
  yield takeEvery(RoomState.fetchRoom, fetchRoom)
}
