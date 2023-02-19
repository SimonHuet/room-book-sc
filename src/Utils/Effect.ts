import { fetchBackend } from './fetcher'

export function* fetchApi({
  withCredentials = true,
  ...fetchParams
}): Generator {
  if (!withCredentials) {
    return yield fetchBackend(fetchParams, '')
  }

  // Login API return now as Expiration Date, Commented to avoid infinite api calls
  /*
  const hasExpired = yield select(
    AuthState.select.hasTokenExpired,
    new Date('now')
  )

  // Simulate a token renew, should need a specific api to refresh token
  if (hasExpired) {
    yield put(AuthState.login())
  }
  */

  const token = localStorage.getItem('token')

  return yield fetchBackend(fetchParams, token)
}
