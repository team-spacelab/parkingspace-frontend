// import { useParams } from "react-router-dom"
import BottomTab from '../components/bottomTab'
import Header from '../components/header'
import RequireLogin from './requireLogin'

const MyInfo = ({ isLogged }) => {
  if (isLogged) {
    const user = {
      name: '이름',
      nickname: '별명',
      tel: '010-6682-9325',
      verified_tel: true,
      birth: '2005-07-25',
      point: 5500,
    }
    // console.log(username)
    const logout = () => {
      localStorage.removeItem('token')
      window.location.href = '/'
    }
    return (
      <>
        <Header />
        <div className='myInfo'>
          <p>이름 : {user.name}</p>
          <p>닉네임 : {user.nickname}</p>
          <p>전화번호 : {user.tel}</p>
          <p>전화번호 인증 여부 : {user.verified_tel ? 'O' : 'X'}</p>
          <p>
            생년월일 : {user.birth.split('-')[0]}년 {user.birth.split('-')[1]}월{' '}
            {user.birth.split('-')[2]}일
          </p>
          <button onClick={() => logout()}>Logout</button>
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
