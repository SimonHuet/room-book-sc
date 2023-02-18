import { UserId } from 'Utils/Types'

type Method = 'GET' | 'POST' | 'DELETE'

type FetchParams = {
  path: string
  options: {
    method: Method
  }
}

export const login = (): FetchParams => ({
  path: '/login',
  options: {
    method: 'GET',
  },
})

export const logout = (): FetchParams => ({
  path: '/logout',
  options: {
    method: 'GET',
  },
})

export const userMe = (): FetchParams => ({
  path: '/me',
  options: {
    method: 'GET',
  },
})

export const getUser = ({ id }: { id: UserId }): FetchParams => ({
  path: `/users/${id}`,
  options: {
    method: 'GET',
  },
})

export const getRoom = (): FetchParams => ({
  path: '/resource',
  options: {
    method: 'GET',
  },
})

export const getBookings = (): FetchParams => ({
  path: '/bookings',
  options: {
    method: 'GET',
  },
})
