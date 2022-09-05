// import { useParams } from "react-router-dom"
import BottomTab from '../components/bottomTab'
import Header from '../components/header'
import RequireLogin from './requireLogin'

const MyInfo = ({ isLogged }) => {

  if (isLogged) {
    // console.log(username)
    return (
      <>
      <Header/>
      <div>
        <p>내 정보 페이지</p>
        <BottomTab />
      </div>
      </>
    )
  } else {
    return <RequireLogin />
  }
}

export default MyInfo
