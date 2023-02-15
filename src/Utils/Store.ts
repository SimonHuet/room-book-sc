import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'

import effects from 'Effect'
import { rootReducer } from 'State'

export const createStore = () => {
  const sagaMiddleware = createSagaMiddleware()

  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: [sagaMiddleware],
  })

  sagaMiddleware.run(effects)

  return store
}
