import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import addHours from 'date-fns/addHours'
import format from 'date-fns/format'

import { createTestStore } from 'Utils/Store'

import App from './App'

const store = createTestStore()

test('renders header', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )

  const appTitle = screen.getByText(/Room book SC/i)
  expect(appTitle).toBeInTheDocument()

  const loginButton = screen.getByRole('button', {
    name: /Login/i,
  })

  expect(loginButton).toBeInTheDocument()
})

test('renders room name', () => {
  const now = new Date()
  const nowPlus1hour = addHours(now, 1)

  render(
    <Provider
      store={createTestStore({
        auth: {
          connectedUserId: 'ABC',
          token: 'ASZJX22OQ0',
        },
        user: {
          ids: ['ABC', 'ZED'],
          entities: {
            ABC: { id: 'ABC', name: 'Pepper Pots' },
            ZED: {
              id: 'ZED',
              name: 'Tony Stark',
            },
          },
        },
        room: {
          room: {
            id: '122SZDS',
            name: "Avenger's headquarters",
            minimumBookingDuration: 10,
            maximumBookingDuration: 90,
            bookingDurationStep: 5,
          },
          isLoading: false,
        },
        booking: {
          ids: ['BCD'],
          entities: {
            BCD: {
              id: 'BCD',
              name: 'Update Jarvis',
              userId: 'ZED',
              start: now,
              end: nowPlus1hour,
            },
          },
        },
      })}
    >
      <App />
    </Provider>
  )

  const userName = screen.getByText(/Pepper Pots/i)
  expect(userName).toBeInTheDocument()

  const roomName = screen.getByText(/Avenger's headquarters/i)
  expect(roomName).toBeInTheDocument()

  const status = screen.getByText(
    `Occupied until ${format(nowPlus1hour, 'HH:mm')}h`
  )

  expect(status).toBeInTheDocument()

  const loginButton = screen.queryByRole('button', {
    name: /Login/i,
  })

  expect(loginButton).not.toBeInTheDocument()

  const logoutButton = screen.queryByRole('button', {
    name: /Logout/i,
  })

  expect(logoutButton).toBeInTheDocument()
})
