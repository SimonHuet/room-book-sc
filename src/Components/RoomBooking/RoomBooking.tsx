import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { BookingTimeline } from 'Components/BookingTimeline'
import * as RoomState from 'State/Room'
import { Room } from 'Utils/Types'

import styles from './RoomBooking.module.scss'

export const RoomBooking: React.FC = () => {
  const dispatch = useDispatch()

  const room: Room | null = useSelector(RoomState.select.room)
  const isLoadingRoom: boolean = useSelector(RoomState.select.isLoading)

  useEffect(
    () => {
      if (!isLoadingRoom && room === null) dispatch(RoomState.fetchRoom())
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch]
  )

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Incoming bookings of the room:
        <span className={styles.name}>{room?.name}</span>
      </h2>

      <BookingTimeline />
    </div>
  )
}
