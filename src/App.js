import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Login from './pages/auth/LoginPage'
import Main from './pages/MainPage'
import MyInfo from './pages/auth/InfoPage'
import ParkingSpace from './pages/space/ListPage'
import ParkingSpaceDetail from './pages/space/DetailPage'
import Register from './pages/auth/RegisterPage'
import RegistParkingSpace from './pages/space/RegistPage'
import RegistParkingSpaceResult from './pages/registParkspaceResult'
import SplashPage from './components/Splash'
import './style/index.scss'
import { Cookies } from 'react-cookie'
import { Toaster } from 'react-hot-toast'
import Guide from './pages/GuidePage'
import Order from './pages/space/OrderPage'
import AuthRoute from './components/AuthRoute'
import Root from './pages/root'
import PaymentSetting from './components/PaymentSetting'
import RegistCar from './pages/car/RegistCar'
import CarList from './pages/car/CarList'
import CarDetail from './pages/car/CarDetail'
import History from './pages/auth/HistoryPage'

const App = () => {
  const cookie = new Cookies()
  const [authenticated, setAuthenticated] = useState(
    cookie.get('SESSION_TOKEN') != null
  )
  const [showSplashPage, setShowSplashPage] = useState(0)
  const [guide, setGuide] = useState(localStorage.getItem('guide') === null)

  const offline = () => {
    alert('네트워크를 확인해주세요.')
    window.close()
  }

  useEffect(() => {
    setTimeout(setShowSplashPage(1), 3000)
    fetch('/api/auth/v1/health').catch(offline)
  }, [])

  if (showSplashPage) {
    if (guide) return <Guide setGuide={setGuide} />

    return (
      <>
        <Toaster
          position='bottom-center'
          containerStyle={{ marginBottom: '80px' }}
        />
        <AnimatePresence>
          <Routes>
            <Route path={'/'} element={<Root />} />
            <Route path={'/main'} element={<Main />} />
            <Route
              path={'/login'}
              element={<Login setIsLogged={setAuthenticated} />}
            />
            <Route path={'/register'} element={<Register />} />
            <Route
              exact
              path='/'
              element={<AuthRoute authenticated={authenticated} />}
            >
              <Route path='/parkingspace' element={<ParkingSpace />} />
              <Route
                path='/registParkingspace'
                element={<RegistParkingSpace />}
              />
              <Route path={'/myInfo'} element={<MyInfo />} />
              <Route path={'/order'} element={<Order />} />
              <Route path={'/myInfo'} element={<MyInfo />} />
              <Route path={'/order'} element={<Order />} />
              <Route
                path='/registParkingspaceResultspace'
                element={<RegistParkingSpaceResult />}
              />
              <Route path='/setting/payment' element={<PaymentSetting />} />
              <Route path='/registCar' element={<RegistCar />} />
              <Route path='/carList' element={<CarList />} />
              <Route path='/carDetail' element={<CarDetail />} />
              <Route path='/orderhistory' element={<History />} />
            </Route>
            <Route
              path='/parkingspaceDetail'
              element={<ParkingSpaceDetail />}
            />
          </Routes>
        </AnimatePresence>
      </>
    )
  } else {
    return <SplashPage />
  }
}

export default App
