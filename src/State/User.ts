import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit'

import { RootState } from 'State'
import { User } from 'Utils/Types'

export type UserState = EntityState<User> & {
  isLoading: boolean
}

const userAdapter = createEntityAdapter<User>()

const INITIAL_STATE: UserState = userAdapter.getInitialState({
  isLoading: false,
})

const slice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    fetchConnectedUser: state => ({
      ...state,
      isLoading: true,
    }),
    receivedConnectedUser: (
      state,
      {
        payload: { connectedUser },
      }: {
        payload: {
          connectedUser: User
        }
      }
    ) => userAdapter.addOne(state, connectedUser),
  },
})

export const { reducer } = slice

export const { fetchConnectedUser, receivedConnectedUser } = slice.actions

export const select = {
  users: userAdapter.getSelectors((state: RootState) => state.user),
}
