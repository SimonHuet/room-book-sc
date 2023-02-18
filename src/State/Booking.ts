import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit'

import { RootState } from 'State'
import { Booking } from 'Utils/Types'

export type BookingState = EntityState<Booking> & {
  isLoading: boolean
}

const bookingAdapter = createEntityAdapter<Booking>()

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
          bookings: Booking[]
        }
      }
    ) => bookingAdapter.setMany({ ...state, isLoading: false }, bookings),
  },
})

export const { reducer } = slice

export const { fetchBookings, receivedBookings } = slice.actions

export const select = {
  bookings: bookingAdapter.getSelectors((state: RootState) => state.booking),
  isLoading: (state: RootState) => state.booking.isLoading,
}
