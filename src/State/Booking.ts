import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit'

import { RootState } from 'State'
import { dateSorter } from 'Utils/State'
import { Booking, BookingBody, BookingResponseData } from 'Utils/Types'

export type BookingState = EntityState<Booking> & {
  isLoading: boolean
}

const bookingAdapter = createEntityAdapter<Booking>({
  sortComparer: dateSorter('start'),
})

const INITIAL_STATE: BookingState = bookingAdapter.getInitialState({
  isLoading: false,
})

const slice = createSlice({
  name: 'booking',
  initialState: INITIAL_STATE,
  reducers: {
    fetchBookings: state => ({
      ...state,
      isLoading: true,
    }),
    receivedBookings: (
      state,
      {
        payload: { bookings },
      }: {
        payload: {
          bookings: BookingResponseData[]
        }
      }
    ) =>
      bookingAdapter.setMany(
        { ...state, isLoading: false },
        bookings.map(booking => ({
          ...booking,
          start: new Date(booking.start),
          end: new Date(booking.end),
        }))
      ),
    addBooking: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _: {
        payload: {
          booking: BookingBody
          onSuccess: () => void
        }
      }
    ) => ({
      ...state,
      isLoading: true,
    }),
    receivedBooking: state => ({ ...state, isLoading: false }),
    // As the api only return the booking id, the action trigger a new fetch of every booking
    // if Api returns full booking object  bookingAdapter.addOne({ ...state, isLoading: false }, booking),
    removeBooking: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _: {
        payload: {
          id: string
        }
      }
    ) => state,
    bookingRemoved: (state, { payload: { id } }: { payload: { id: string } }) =>
      bookingAdapter.removeOne(state, id),
  },
})

export const { reducer } = slice

export const {
  fetchBookings,
  receivedBookings,
  addBooking,
  receivedBooking,
  removeBooking,
  bookingRemoved,
} = slice.actions

export const select = {
  bookings: bookingAdapter.getSelectors((state: RootState) => state.booking),
  isLoading: (state: RootState) => state.booking.isLoading,
}
