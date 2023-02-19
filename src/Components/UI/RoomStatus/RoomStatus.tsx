import classNames from 'classnames'

import formatDate from 'date-fns/format'

import { Booking, Room } from 'Utils/Types'

import styles from './RoomStatus.module.scss'

type Props = {
  room: Room
  currentBooking?: Booking
}

export const RoomStatus: React.FC<Props> = ({ room, currentBooking }) => {
  const isOccupied = currentBooking !== undefined

  return (
    <>
      <span className={styles.name}>{room.name}</span>
      <span
        className={classNames(styles.container, {
          [styles.occupied]: isOccupied,
        })}
      >
        <span className={styles.circle} />
        <label className={styles.label}>
          {isOccupied
            ? `Occupied until ${formatDate(currentBooking.end, 'HH:mm')}h`
            : 'Available'}
        </label>
      </span>
    </>
  )
}
