import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import isWithinInterval from 'date-fns/isWithinInterval'
import differenceInMinutes from 'date-fns/differenceInMinutes'
import isFuture from 'date-fns/isFuture'

import { Button } from 'Components/UI/Button'
import * as BookingState from 'State/Booking'
import * as RoomState from 'State/Room'
import { Booking, Room } from 'Utils/Types'

import styles from './RoomBookingForm.module.scss'

type Props = {
  onSuccess: () => void
}

export const RoomBookingForm: React.FC<Props> = ({ onSuccess }) => {
  const dispatch = useDispatch()

  const room: Room = useSelector(RoomState.select.room) as Room
  const bookings: Booking[] = useSelector(
    BookingState.select.bookings.selectAll
  )

  const INITIAL_STATE = useMemo(
    () => ({
      name: '',
      duration: room?.minimumBookingDuration,
    }),
    [room?.minimumBookingDuration]
  )

  const [formData, changeFormData] = useState(INITIAL_STATE)

  const handleSubmit: (e: React.SyntheticEvent) => void = e => {
    e.preventDefault()

    dispatch(
      BookingState.addBooking({
        booking: {
          name: formData.name,
          duration: formData.duration,
        },
        onSuccess,
      })
    )
  }

  const handleChange: (
    field: string
  ) => React.ChangeEventHandler<HTMLInputElement> =
    field =>
    ({ currentTarget: { value } }) => {
      changeFormData({
        ...formData,
        [field]: value,
      })
    }

  const currentBooking = useMemo(
    () =>
      bookings.find(({ start, end }) =>
        isWithinInterval(new Date(), { start, end })
      ),
    [bookings]
  )

  const minutesBeforeNextBooking: number = useMemo(() => {
    const now = new Date()
    const lowestDiffInMinutes = bookings
      .filter(booking => isFuture(booking.start))
      .map(({ start }) => differenceInMinutes(start, now))
      .reduce((lowestMinutes: number, currDiff) => {
        return lowestMinutes && lowestMinutes < currDiff
          ? lowestMinutes
          : currDiff
      }, room.maximumBookingDuration)

    return lowestDiffInMinutes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookings])

  const maxMinutes: number = useMemo(
    () =>
      room.maximumBookingDuration > minutesBeforeNextBooking
        ? minutesBeforeNextBooking - (minutesBeforeNextBooking % 5)
        : room.maximumBookingDuration,
    [minutesBeforeNextBooking, room.maximumBookingDuration]
  )

  const isFormSubmittable: boolean =
    !currentBooking &&
    room.minimumBookingDuration < minutesBeforeNextBooking &&
    formData.name !== '' &&
    formData.duration <= minutesBeforeNextBooking

  useEffect(() => () => changeFormData(INITIAL_STATE), [INITIAL_STATE])

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.name}>
        <label htmlFor="name">Enter event name: </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          onChange={handleChange('name')}
          value={formData.name}
        />
      </div>
      <div className={styles.duration}>
        <label htmlFor="duration">Choose duration: </label>
        <div>
          <input
            type="range"
            name="duration"
            id="duration"
            required
            onChange={handleChange('duration')}
            value={formData.duration}
            min={room?.minimumBookingDuration}
            max={maxMinutes}
            step={room?.bookingDurationStep}
          />
          <p>{formData.duration} minutes</p>
        </div>
      </div>

      {!isFormSubmittable && (
        <div className={styles.errors}>
          Can't create the booking due to the followings :
          <ul>
            {formData.name === '' && <li>Event name must be filled in</li>}
            {currentBooking && <li>An event is already in progress</li>}
            {minutesBeforeNextBooking < room.minimumBookingDuration && (
              <li>
                The next meetings start in {minutesBeforeNextBooking} minutes
                and the minimun booking duration is{' '}
                {room.minimumBookingDuration} minutes
              </li>
            )}
          </ul>
        </div>
      )}

      <div className={styles.buttons}>
        <Button
          id="submit-booking"
          type="submit"
          onClick={() => false}
          disabled={!isFormSubmittable}
        >
          Book now
        </Button>
      </div>
    </form>
  )
}
