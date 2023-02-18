export type Auth = {
  token: string
  expirationDate: string
}

export type UserId = string

export type User = {
  id: UserId
  name: string
}

export type Room = {
  id: string
  name: string
  minimumBookingDuration: number
  maximumBookingDuration: number
  bookingDurationStep: number
}

export type BookingResponseData = {
  id: string
  start: string
  end: string
  name: string
  userId: UserId
}

export type Booking = {
  id: string
  start: Date
  end: Date
  name: string
  userId: UserId
}
