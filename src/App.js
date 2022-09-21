import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Login from './pages/auth/login'
import Main from './pages/main'
import MyInfo from './pages/auth/myInfo'
import ParkingSpace from './pages/parking'
import ParkingSpaceDetail from './pages/parkspaceDetail'
import Register from './pages/auth/register'
import RegistParkingSpace from './pages/registParkspace'
import RegistParkingSpaceResult from './pages/registParkspaceResult'
import SplashPage from './pages/splash'
import './style/index.scss'
import './style/toastr.scss'
import { Cookies } from 'react-cookie'
import { Toaster } from 'react-hot-toast'
import Guide from './pages/guide'
import Order from './pages/Order'

const App = () => {
  //token 여부 검사 - 후에 수정
  const cookie = new Cookies()
  const [isLogged, setIsLogged] = useState(
    cookie.get('SESSION_TOKEN') != null ? true : false
  )
  const [showSplashPage, setShowSplashPage] = useState(0)
  const [guide, setGuide] = useState(
    localStorage.getItem('guide') === null ? true : false
  )
  // 스플래시 3초 보여줌

  const offline = () => {
    alert('네트워크를 확인해주세요.')
    window.close()
  }

  useEffect(() => {
    setTimeout(setShowSplashPage(1), 3000)
    fetch('/api/auth/v1/health').catch(offline)
  }, [])

  const [userInfo, setUserInfo] = useState({
    data: {
      id: 0,
      name: '',
      nickname: '',
      tel: '',
      verified_tel: false,
      birthday: '0',
      point: 0,
    },
  })
  const getUserInfo = async () => {
    await fetch('/api/auth/v1/users/@me', {
      method: 'GET',
      headers: {
        Accept: '*/*',
        'Access-Control-Allow-Origin': 'no-cors',
      },
    })
      .then((res) => res.json())
      .then((res) => setUserInfo(res))
      .catch()
  }

  if (showSplashPage) {
    if (guide) return <Guide setGuide={setGuide} />

    return (
      <>
        <Toaster position='bottom-center' />
        <AnimatePresence>
          <Routes>
            <Route path={'/'} element={<Main />} />
            <Route
              path={'/parkingspace'}
              element={<ParkingSpace isLogged={isLogged} />}
            />
            <Route
              path='/parkingspaceDetail'
              element={<ParkingSpaceDetail />}
            />
            <Route
              path='/registParkingspace'
              element={<RegistParkingSpace isLogged={isLogged} />}
            />
            <Route
              path='/registParkingspaceResult'
              element={<RegistParkingSpaceResult />}
            />
            <Route
              path={'/login'}
              element={<Login setIsLogged={setIsLogged} />}
            />
            <Route
              path={'/myInfo'}
              element={
                <MyInfo
                  getUserInfo={getUserInfo}
                  userInfo={userInfo}
                  isLogged={isLogged}
                />
              }
            />
            <Route path={'/register'} element={<Register />} />
            <Route path={'/order'} element={<Order/>} />
          </Routes>
        </AnimatePresence>
      </>
    )
  } else {
    return <SplashPage />
  }
}

export default App
