import differenceInMinutes from 'date-fns/differenceInMinutes'

import formatDate from 'date-fns/format'

import { Booking as BookingType } from 'Utils/Types'
import { Button } from '../Button'

import styles from './Booking.module.scss'

type Props = {
  booking: BookingType
  onDelete?: (id: string) => void
}

export const Booking: React.FC<Props> = ({
  booking: { id, name, start, end },
  onDelete,
}) => (
  <>
    <div className={styles['event-wrapper']}>
      <div className={styles['event-name']}>{name}</div>
      {onDelete && (
        <Button id={`delete-booking-${id}`} onClick={() => onDelete(id)}>
          Cancel
        </Button>
      )}
    </div>

    <div className={styles.hours}>
      From{' '}
      <time dateTime={start.toISOString()}>{formatDate(start, 'HH:mm')}</time>{' '}
      to
      <time dateTime={end.toISOString()}> {formatDate(end, 'HH:mm')} </time>(
      {differenceInMinutes(end, start)} Minutes)
    </div>
  </>
)
