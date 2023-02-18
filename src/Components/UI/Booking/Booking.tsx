import classNames from 'classnames'
import formatDate from 'date-fns/format'

import { Booking as BookingType } from 'Utils/Types'

import styles from './Booking.module.scss'

type Props = {
  booking: BookingType
}

export const Booking: React.FC<Props> = ({
  booking: { name, start, end, userId },
}) => (
  <>
    <time>
      <>Start: {formatDate(start, 'dd/MM/yyyy at hh:mm')}</>
    </time>
    <div>{name}</div>

    <time>
      <>End: {formatDate(end, 'dd/MM/yyyy at hh:mm')}</>
    </time>
  </>
)
