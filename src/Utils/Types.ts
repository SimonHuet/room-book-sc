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
