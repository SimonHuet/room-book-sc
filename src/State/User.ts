import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit'

import { RootState } from 'State'
import { User, UserId } from 'Utils/Types'

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
    fetchUser: (state, { payload: { id } }: { payload: { id: UserId } }) => ({
      ...state,
      isLoading: true,
    }),
    receivedUser: (state, { payload: { user } }: { payload: { user: User } }) =>
      userAdapter.addOne({ ...state, isLoading: false }, user),
  },
})

export const { reducer } = slice

export const {
  fetchConnectedUser,
  fetchUser,

  receivedUser,
} = slice.actions

export const select = {
  users: userAdapter.getSelectors((state: RootState) => state.user),
  isLoading: (state: RootState) => state.user.isLoading,
}
