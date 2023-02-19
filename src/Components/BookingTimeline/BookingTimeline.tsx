import { ReactNode } from 'react'

import differenceInMinutes from 'date-fns/differenceInMinutes'
import differenceInHours from 'date-fns/differenceInHours'

import { Booking } from 'Components/UI/Booking'
import { Timeline } from 'Components/UI/Timeline'
import { TimelineItem } from 'Components/UI/Timeline'
import { User } from 'Components/User'

import { Booking as BookingType } from 'Utils/Types'

import styles from './BookingTimeline.module.scss'

type Props = {
  bookings: BookingType[]
  currentBooking?: BookingType
}

export const BookingTimeline: React.FC<Props> = ({
  bookings,
  currentBooking,
}) => {
  return (
    <div className={styles.container}>
      <Timeline>
        {bookings.map((booking: BookingType): ReactNode => {
          const hoursBeforeEvent = differenceInHours(booking.start, new Date())
          const minutesBeforeEvent = differenceInMinutes(
            booking.start,
            new Date()
          )

          return (
            <TimelineItem
              key={booking.id}
              isCurrent={booking.id === currentBooking?.id}
            >
              <Booking booking={booking} />
              <div className={styles['user-row']}>
                {hoursBeforeEvent > 0 && <time>In {hoursBeforeEvent} h</time>}
                {hoursBeforeEvent === 0 && minutesBeforeEvent > 0 && (
                  <time>In {minutesBeforeEvent} min</time>
                )}
                {hoursBeforeEvent < 0 ? (
                  <time className={styles.passed}>
                    {hoursBeforeEvent * -1} h ago
                  </time>
                ) : (
                  hoursBeforeEvent === 0 &&
                  minutesBeforeEvent < 0 && (
                    <time className={styles.passed}>
                      {minutesBeforeEvent * -1} min ago
                    </time>
                  )
                )}
                <User userId={booking.userId} />
              </div>
            </TimelineItem>
          )
        })}
      </Timeline>
    </div>
  )
}
