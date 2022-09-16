import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import Main from './pages/main'
import MyInfo from './pages/myInfo'
import ParkingSpace from './pages/parking'
import ParkingSpaceDetail from './pages/parkspaceDetail'
import Pay from './pages/pay'
import Register from './pages/register'
import RegistParkingSpace from './pages/registParkspace'
import RegistParkingSpaceResult from './pages/registParkspaceResult'
import SplashPage from './pages/splash'
import './style/index.scss'
import './style/toastr.scss'
import { Cookies } from 'react-cookie'

const App = () => {
  //token 여부 검사 - 후에 수정
  const cookie = new Cookies()
  const [isLogged, setIsLogged] = useState(
    cookie.get('SESSION_TOKEN') != null ? true : false
  )
  const [showSplashPage, setShowSplashPage] = useState(0)
  // //강제로 3초 보여줄려 했더니 애가 일을 안할줄은...
  useEffect(() => {
    setTimeout(setShowSplashPage(1), 3000)
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
  }

  if (showSplashPage) {
    return (
      <>
        <Routes>
          <Route path={'/'} element={<Main />} />
          <Route
            path={'/parkingspace'}
            element={<ParkingSpace isLogged={isLogged} />}
          />
          <Route path='/parkingspaceDetail' element={<ParkingSpaceDetail />} />
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
          <Route path={'/pay'} element={<Pay userInfo={userInfo} />} />
        </Routes>
      </>
    )
  } else {
    return <SplashPage />
  }
}

export default App
