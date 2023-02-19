import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'

import effects from 'Effect'
import { rootReducer } from 'State'
import { User } from './Types'

export const createStore = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const preloadedState: any = (() => {
    const connectedUser: User | null = localStorage.getItem('connectedUser')
      ? JSON.parse(localStorage.getItem('connectedUser') as string)
      : null
    return {
      auth: {
        token: localStorage.getItem('token'),
        connectedUserId: connectedUser ? connectedUser.id : null,
      },
      ...(connectedUser && {
        user: {
          ids: [connectedUser.id],
          entities: { [connectedUser.id]: connectedUser },
        },
      }),
    }
  })()

  const loggerMiddleware = createLogger({
    collapsed: true,
    diff: true,
  })

  const sagaMiddleware = createSagaMiddleware()

  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: [sagaMiddleware, loggerMiddleware],
    preloadedState,
  })

  sagaMiddleware.run(effects)

  return store
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createTestStore = (preloadedState?: any) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  })
