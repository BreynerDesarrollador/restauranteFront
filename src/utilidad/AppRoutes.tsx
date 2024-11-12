import {FC} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import App from '../App'
import {Logout} from '@componentes/Logout'

const {API_URL} = process.env

const AppRoutes: FC = () => {
  return (
    <BrowserRouter basename={API_URL}>
      <Routes>
        <Route element={<App />}>
          {/*<Route path='error/*' element={<ErrorsPage />} />*/}
          <Route path='logout' element={<Logout />} />
          {/*{currentUser ? (
            <>
              <Route path='/*' element={<PrivateRoutes />} />
              <Route index element={<Navigate to='/dashboard' />} />
            </>
          ) : (*/}
            <>
             {/* <Route path='auth/*' element={<AuthPageAdmin />} />*/}
              <Route index element={<Navigate to='/auth' />} />
              <Route path='*' element={<Navigate to='/' />} />
            </>
          {/*)}*/}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export {AppRoutes}
