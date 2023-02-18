import { createSlice } from '@reduxjs/toolkit'

import { RootState } from 'State'
import { Auth, UserId } from 'Utils/Types'

export type AuthState = {
  token: string | null
  expirationDate: Date | null
  connectedUserId: UserId | null
  isLoading: boolean
}

const INITIAL_STATE: AuthState = {
  token: null,
  expirationDate: null,
  connectedUserId: null,
  isLoading: false,
}

const slice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    login: state => ({
      ...state,
      isLoading: true,
    }),
    logout: state => ({ ...state, isLoading: true }),
    logoutSuccess: () => INITIAL_STATE,
    receivedConnectedUserId: (
      state,
      {
        payload: { id: connectedUserId },
      }: {
        payload: {
          id: UserId
        }
      }
    ) => ({
      ...state,
      connectedUserId,
    }),
    success: (
      state,
      {
        payload: {
          auth: { token, expirationDate },
        },
      }: {
        payload: {
          auth: Auth
        }
      }
    ) => ({
      ...state,
      isLoading: false,
      connectedUserId: null,
      token,
      expirationDate: expirationDate ? new Date(expirationDate) : null,
    }),
  },
})

export const { reducer } = slice

export const {
  login,
  logout,
  logoutSuccess,
  receivedConnectedUserId,
  success,
} = slice.actions

export const select = {
  token: (state: RootState) => state.auth.token,
  expirationDate: (state: RootState) => state.auth.expirationDate,
  hasTokenExpired: (
    { auth: { expirationDate } }: RootState,
    currentDate: Date
  ) => (expirationDate ? expirationDate < currentDate : true),
  isLoading: (state: RootState) => state.auth.isLoading,
  connectedUserId: (state: RootState) => state.auth.connectedUserId,
}
