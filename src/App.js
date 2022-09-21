import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Login from './pages/auth/LoginPage'
import Main from './pages/MainPage'
import MyInfo from './pages/auth/InfoPage'
import ParkingSpace from './pages/ParkingPage'
import ParkingSpaceDetail from './pages/space/DetailPage'
import Register from './pages/auth/RegisterPage'
import RegistParkingSpace from './pages/space/RegistPage'
import RegistParkingSpaceResult from './pages/registParkspaceResult'
import SplashPage from './components/Splash'
import './style/index.scss'
import { Cookies } from 'react-cookie'
import { Toaster } from 'react-hot-toast'
import Guide from './pages/GuidePage'
import Order from './pages/OrderPage'
import AuthRoute from './components/AuthRoute'

const App = () => {
  const cookie = new Cookies()
  const [authenticated, setAuthenticated] = useState(
    cookie.get('SESSION_TOKEN') != null
  )
  const [showSplashPage, setShowSplashPage] = useState(0)
  const [guide, setGuide] = useState(
    localStorage.getItem('guide') === null
  )

  const offline = () => {
    alert('네트워크를 확인해주세요.')
    window.close()
  }

  useEffect(() => {
    setTimeout(setShowSplashPage(1), 3000)
    fetch('/api/auth/v1/health').catch(offline)
  }, [])

  const [userInfo, setUserInfo] = useState({
    id: 0,
    name: '',
    nickname: '',
    tel: '',
    verified_tel: false,
    birthday: '0',
    point: 0
  })
  const getUserInfo = async () => {
    await fetch('/api/auth/v1/users/@me', { method: 'GET' })
      .then((res) => res.json())
      .then((res) => setUserInfo(res.data))
      .catch()
  }

  if (showSplashPage) {
    if (guide) return <Guide setGuide={setGuide} />

    return (
      <>
        <Toaster position='bottom-center' containerStyle={{ marginBottom: '80px' }} />
        <AnimatePresence>
          <Routes>
            <Route path={'/'} element={<Main />} />
            <Route path={'/login'} element={<Login setIsLogged={setAuthenticated} />} />
            <Route path={'/register'} element={<Register />} />
            <Route exact path='/' element={<AuthRoute authenticated={authenticated} />}>
              <Route
                path='/parkingspace'
                element={<ParkingSpace />}
              />
              <Route
                path='/registParkingspace'
                element={<RegistParkingSpace />}
              />
              <Route
                path={'/myInfo'}
                element={
                  <MyInfo
                    getUserInfo={getUserInfo}
                    userInfo={userInfo}
                  />
                }
              />
              <Route path={'/order'} element={<Order/>} />
              <Route
                path='/registParkingspaceResult'
                element={<RegistParkingSpaceResult />}
              />
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
