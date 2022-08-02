import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import Login from "./pages/login"
import Main from "./pages/main"
import MyInfo from "./pages/myInfo"
import Register from "./pages/register"
import "./style/index.scss"

const App = () => {
  const [isLogged, setIsLogged] = useState(true) //개발 끝나면 false로 바꿔야 함
  return (
    <>
      <Routes>
      <Route path={"/"} element={<Main/>} />
      <Route path={"/login"} element={<Login setIsLogged={setIsLogged} />}  />
      <Route path={"/register"} element={<Register/>} />
      <Route path={"/myInfo"} element={<MyInfo isLogged={isLogged} />}  />
      </Routes>
    </>
  )
}

export default App
