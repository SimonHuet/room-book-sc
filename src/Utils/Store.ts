import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'

import effects from 'Effect'
import { rootReducer } from 'State'

export const createStore = () => {
  const loggerMiddleware = createLogger({
    collapsed: true,
    diff: true,
  })

  const sagaMiddleware = createSagaMiddleware()

  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: [sagaMiddleware, loggerMiddleware],
  })

  sagaMiddleware.run(effects)

  return store
}
