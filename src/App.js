import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import Main from './pages/main'
import MyInfo from './pages/myInfo'
import ParkingSpace from './pages/parking'
import Register from './pages/register'
import SplashPage from './pages/splash'
import './style/index.scss'
import './style/toastr.scss'

const App = () => {
  //token 여부 검사 - 후에 수정
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem('token') != null ? true : false
  )
  const [showSplashPage, setShowSplashPage] = useState(0)
  useEffect(() => {
    setTimeout(setShowSplashPage(1), 1000)
  }, [])

  if (showSplashPage) {
    return (
      <>
        <Routes>
          <Route path={'/'} element={<Main />} />
          <Route path={'/parkingspace'} element={<ParkingSpace />} />
          <Route
            path={'/login'}
            element={<Login setIsLogged={setIsLogged} />}
          />
          <Route path={'/register'} element={<Register />} />
          <Route path={'/myInfo'} element={<MyInfo isLogged={isLogged} />} />
        </Routes>
      </>
    )
  } else {
    return <SplashPage />
  }
}

export default App
