import { ReactNode } from 'react'

import differenceInMinutes from 'date-fns/differenceInMinutes'
import differenceInHours from 'date-fns/differenceInHours'
import isWithinInterval from 'date-fns/isWithinInterval'

import { Booking } from 'Components/UI/Booking'
import { Timeline } from 'Components/UI/Timeline'
import { TimelineItem } from 'Components/UI/Timeline'
import { User } from 'Components/User'

import * as AuthState from 'State/Auth'
import * as BookingState from 'State/Booking'

import { Booking as BookingType } from 'Utils/Types'

import styles from './BookingTimeline.module.scss'
import { useDispatch, useSelector } from 'react-redux'

type Props = {
  bookings: BookingType[]
  currentBooking?: BookingType
}

const getTimeMessage: (start: Date, end: Date) => JSX.Element = (
  start,
  end
) => {
  const isInProgress = isWithinInterval(new Date(), { start, end })

  if (isInProgress) {
    return <p>In progress</p>
  }

  const hoursBeforeEvent = differenceInHours(start, new Date())
  const minutesBeforeEvent = differenceInMinutes(start, new Date())

  if (hoursBeforeEvent > 0) {
    return <time>In {hoursBeforeEvent} h</time>
  }

  if (hoursBeforeEvent === 0 && minutesBeforeEvent > 0) {
    return <time>In {minutesBeforeEvent} min</time>
  }

  if (hoursBeforeEvent < 0) {
    return <time className={styles.passed}> {hoursBeforeEvent * -1} h ago</time>
  }
  if (hoursBeforeEvent === 0 && minutesBeforeEvent < 0) {
    return (
      <time className={styles.passed}>{minutesBeforeEvent * -1} min ago</time>
    )
  }

  return <p></p>
}

export const BookingTimeline: React.FC<Props> = ({
  bookings,
  currentBooking,
}) => {
  const dispatch = useDispatch()

  const connectedUserId = useSelector(AuthState.select.connectedUserId)
  const onDelete = (id: string) => dispatch(BookingState.removeBooking({ id }))

  return (
    <div className={styles.container}>
      <Timeline>
        {bookings.map(
          (booking: BookingType): ReactNode => (
            <TimelineItem
              key={booking.id}
              isCurrent={booking.id === currentBooking?.id}
            >
              <Booking
                booking={booking}
                {...(connectedUserId === booking.userId && { onDelete })}
              />
              <div className={styles['user-row']}>
                {getTimeMessage(booking.start, booking.end)}

                <User userId={booking.userId} />
              </div>
            </TimelineItem>
          )
        )}
      </Timeline>
    </div>
  )
}
