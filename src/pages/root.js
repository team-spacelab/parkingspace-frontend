import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Root = () => {
  const navigation = useNavigate()

  useEffect(() => {
if (window.localStorage.getItem('main') === '0') {
      navigation('/main')
      return
    }
    if (window.localStorage.getItem('main') === '1') {
      navigation('/parkingspace')
      return
    }
  }, [])

  return (
    <></>
  )
}

export default Root
