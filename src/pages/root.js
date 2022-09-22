import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Root = () => {
  const navigation = useNavigate()

  useEffect(() => {
    if (document.cookie.includes('SESSION_TOKEN') && window.localStorage.getItem('main') === '1') {
      navigation('/parkingspace')
      return
    }
    navigation('/main')
  }, [])

  return (
    <></>
  )
}

export default Root
