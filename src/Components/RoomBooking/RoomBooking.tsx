import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import isWithinInterval from 'date-fns/isWithinInterval'

import { BookingTimeline } from 'Components/BookingTimeline'
import { Button } from 'Components/UI/Button'
import { Modal } from 'Components/UI/Modal'
import { RoomStatus } from 'Components/UI/RoomStatus'
import { Spinner } from 'Components/UI/Spinner'
import { RoomBookingForm } from './RoomBookingFrom'

import * as RoomState from 'State/Room'
import * as BookingState from 'State/Booking'

import { Room, Booking as BookingType } from 'Utils/Types'

import styles from './RoomBooking.module.scss'

export const RoomBooking: React.FC = () => {
  const [showModal, setShowModal] = useState(false)

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

  const bookings: BookingType[] = useSelector(
    BookingState.select.bookings.selectAll
  )
  const isLoadingBooking: boolean = useSelector(BookingState.select.isLoading)

  useEffect(() => {
    if (!isLoadingBooking && !bookings.length)
      dispatch(BookingState.fetchBookings())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const currentBooking: BookingType | undefined = useMemo(
    () =>
      !isLoadingBooking && bookings.length > 0
        ? bookings.find(({ start, end }) =>
            isWithinInterval(new Date(), { start, end })
          )
        : undefined,
    [bookings, isLoadingBooking]
  )

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {!isLoadingRoom && room && !isLoadingBooking && bookings?.length > 0 ? (
          <>
            Bookings of the room:
            <RoomStatus room={room} currentBooking={currentBooking} />
          </>
        ) : (
          <Spinner className={styles.spinner} />
        )}
      </h2>

      {!isLoadingBooking && bookings?.length > 0 ? (
        <>
          <BookingTimeline
            bookings={bookings}
            currentBooking={currentBooking}
          />

          {!isLoadingRoom && room && (
            <>
              <Button
                id="book-now"
                className={styles.add}
                onClick={() => setShowModal(true)}
                round
              >
                Book now
              </Button>

              {showModal && (
                <Modal
                  title={
                    <span className={styles['modal-title']}>
                      Book now the room:
                      <span className={styles.name}>{room.name}</span>
                    </span>
                  }
                  onClose={() => setShowModal(false)}
                >
                  <RoomBookingForm onSuccess={() => setShowModal(false)} />
                </Modal>
              )}
            </>
          )}
        </>
      ) : (
        <Spinner className={styles.spinner} />
      )}
    </div>
  )
}
