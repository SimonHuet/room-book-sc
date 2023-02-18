import { ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as BookingState from 'State/Booking'
import { Booking } from 'Utils/Types'

import styles from './BookingTimeline.module.scss'

export const BookingTimeline: React.FC = () => {
  const dispatch = useDispatch()

  const bookings: Booking[] = useSelector(
    BookingState.select.bookings.selectAll
  )
  const isLoadingBooking: boolean = useSelector(BookingState.select.isLoading)

  useEffect(() => {
    if (!isLoadingBooking && !bookings.length)
      dispatch(BookingState.fetchBookings())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <div className={styles.container}>
      {bookings.map(
        (booking: Booking): ReactNode => (
          <div key={booking.id}>
            {JSON.stringify(booking)}
            <br />
          </div>
        )
      )}
    </div>
  )
}
