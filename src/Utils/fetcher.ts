/* eslint-disable @typescript-eslint/no-explicit-any */
export type Success = {
  data: object
  success: boolean
}

export type Failure = {
  message: string
  success: boolean
}

export const fetchBackend = (
  {
    path,
    options = {
      method: 'GET',
    },
  }: any,
  token: any
): Promise<Success | Failure> => {
  return fetch(`${process.env.REACT_APP_BACKEND_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  })
    .then(response => Promise.all([response, response.json()]))
    .then(([{ status }, body]) => {
      if ((400 <= status || status === 500) && body !== null) {
        return Promise.reject({ ...body, httpErrCode: status })
      }

      return body
    })
}
