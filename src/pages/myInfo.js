// import { useParams } from "react-router-dom"
import BottomTab from '../components/bottomTab'
import Header from '../components/header'
import RequireLogin from './requireLogin'

const MyInfo = ({ isLogged }) => {
  if (isLogged) {
    // console.log(username)
    return (
      <>
        <Header />
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
/**
 * id
이름
닉네임
전화번호
전화번호인증 ( 안만들거임 )
실명
생년월일
포인트
로그아웃
 */
