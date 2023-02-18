import { createSlice } from '@reduxjs/toolkit'

import { RootState } from 'State'
import { Room } from 'Utils/Types'

export type RoomState = {
  isLoading: boolean
  room: Room | null
}

const INITIAL_STATE: RoomState = {
  isLoading: false,
  room: null,
}

const slice = createSlice({
  name: 'room',
  initialState: INITIAL_STATE,
  reducers: {
    fetchRoom: state => ({
      ...state,
      isLoading: true,
    }),
    receivedRoom: (
      state,
      {
        payload: { room },
      }: {
        payload: {
          room: Room
        }
      }
    ) => ({ ...state, isLoading: false, room }),
  },
})

export const { reducer } = slice

export const { fetchRoom, receivedRoom } = slice.actions

export const select = {
  room: (state: RootState) => state.room.room,
  isLoading: (state: RootState) => state.room.isLoading,
}
