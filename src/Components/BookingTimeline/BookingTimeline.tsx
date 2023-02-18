import { ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import differenceInMinutes from 'date-fns/differenceInMinutes'

import { Booking } from 'Components/UI/Booking'
import { Timeline } from 'Components/UI/Timeline'
import { TimelineItem } from 'Components/UI/Timeline'
import { User } from 'Components/User'
import * as BookingState from 'State/Booking'
import { Booking as BookingType } from 'Utils/Types'

import styles from './BookingTimeline.module.scss'

export const BookingTimeline: React.FC = () => {
  const dispatch = useDispatch()

  const bookings: BookingType[] = useSelector(
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
      <Timeline>
        {bookings.map(
          (booking: BookingType): ReactNode => (
            <TimelineItem
              key={booking.id}
              style={{
                height: `calc(${
                  80 + differenceInMinutes(booking.end, booking.start) / 5
                }px * 50%)`,
              }}
            >
              <Booking booking={booking} />
              <User userId={booking.userId} />
            </TimelineItem>
          )
        )}
      </Timeline>
    </div>
  )
}
