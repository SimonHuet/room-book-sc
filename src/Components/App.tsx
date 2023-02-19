import { AuthLayout } from './AuthLayout'
import { RoomBooking } from './RoomBooking'

import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <>
      <AuthLayout>
        <RoomBooking />
      </AuthLayout>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default App
