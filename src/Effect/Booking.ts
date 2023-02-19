import { put, takeEvery } from 'redux-saga/effects'
import { fetchApi } from 'Utils/Effect'

import * as Api from './Api'
import * as BookingState from 'State/Booking'
import { BookingBody, BookingResponseData } from 'Utils/Types'

function* fetchBookings() {
  try {
    const { data: bookings }: { data: BookingResponseData[] } = yield fetchApi(
      Api.getBookings()
    )

    yield put(BookingState.receivedBookings({ bookings }))
  } catch (error) {
    console.error(error)
  }
}

function* addBooking({
  payload: { booking, onSuccess },
}: {
  payload: {
    booking: BookingBody
    onSuccess: () => void
  }
}) {
  try {
    yield fetchApi(Api.addBooking({ booking }))

    yield put(BookingState.receivedBooking())

    yield onSuccess()
  } catch (error) {
    console.error(error)
  }
}

function* removeBooking({
  payload: { id },
}: {
  payload: {
    id: string
  }
}) {
  try {
    yield fetchApi(Api.removeBooking({ id }))

    yield put(BookingState.bookingRemoved({ id }))
  } catch (error) {
    console.error(error)
  }
}

export default function* rootSaga() {
  yield takeEvery(
    [BookingState.fetchBookings, BookingState.receivedBooking],
    fetchBookings
  )
  yield takeEvery(BookingState.addBooking, addBooking)
  yield takeEvery(BookingState.removeBooking, removeBooking)
}
