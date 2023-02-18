import differenceInMinutes from 'date-fns/differenceInMinutes'

import formatDate from 'date-fns/format'

import { Booking as BookingType } from 'Utils/Types'

import styles from './Booking.module.scss'

type Props = {
  booking: BookingType
}

export const Booking: React.FC<Props> = ({ booking: { name, start, end } }) => (
  <>
    <div className={styles['event-name']}>{name}</div>

    <div className={styles.hours}>
      From{' '}
      <time dateTime={start.toISOString()}>{formatDate(start, 'HH:mm')}</time>{' '}
      to
      <time dateTime={end.toISOString()}> {formatDate(end, 'HH:mm')} </time>(
      {differenceInMinutes(end, start)} Minutes)
    </div>
  </>
)
