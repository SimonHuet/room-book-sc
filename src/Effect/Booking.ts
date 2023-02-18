import { put, takeEvery } from 'redux-saga/effects'
import { fetchApi } from 'Utils/Effect'

import * as Api from './Api'
import * as BookingState from 'State/Booking'
import { Booking } from 'Utils/Types'

function* fetchBookings() {
  try {
    const { data: bookings }: { data: Booking[] } = yield fetchApi(
      Api.getBookings()
    )

    yield put(BookingState.receivedBookings({ bookings }))
  } catch (error) {
    console.error(error)
  }
}

export default function* rootSaga() {
  yield takeEvery(BookingState.fetchBookings, fetchBookings)
}
