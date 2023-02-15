type Method = 'GET' | 'POST' | 'DELETE'

interface FetchParams {
  path: string
  options: {
    method: Method
  }
}

export const fetchBackend = (
  {
    path,
    options = {
      method: 'GET',
    },
  }: FetchParams,
  token: string
) =>
  fetch(`${process.env.REACT_APP_BACKEND_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  })
    .then(response => Promise.all([response, response.json()]))
    .then(([{ status }, body]) => {
      if (400 <= status && body !== null) {
        return Promise.reject({ ...body, httpErrCode: status })
      }

      return body
    })
