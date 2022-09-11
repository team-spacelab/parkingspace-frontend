// import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom'
import {
  FaUserCircle,
  FaSignInAlt,
  FaPhone,
  FaRegLightbulb,
  FaAward,
  FaCog,
  FaToggleOff,
  FaToggleOn,
} from 'react-icons/fa'
import BottomTab from '../components/bottomTab'
import Header from '../components/header'
import RequireLogin from './requireLogin'
import { useState } from 'react'

const MyInfo = ({ isLogged }) => {
  /** 
  const [mainPage, setMainPage] = useState(
    localStorage.getItem('mainPage') != null
      ? localStorage.getItem('mainPage')
      : false
  )
  useEffect(() => {
    console.log(mainPage)
    return localStorage.setItem('mainPage', mainPage)
  }, [mainPage])*/

  const [isClick, setIsClick] = useState(
    localStorage.getItem('mainPage') != null
      ? localStorage.getItem('mainPage')
      : 0
  )
  function switchState() {
    setIsClick(isClick === 1 ? 0 : 1)
    localStorage.setItem('mainPage', isClick)
  }

  if (isLogged) {
    const user = {
      name: '최홍찬',
      nickname: 'orol4rang',
      tel: '010-6682-9325',
      verified_tel: false,
      birth: '2005-07-25',
      point: 5500,
    }

    const logout = () => {
      // 모달 로그아웃 하시겠습니까?
      const doLogout = window.confirm('정말로 로그아웃 하시겠습니까?')
      if (doLogout) {
        localStorage.removeItem('token')
        window.location.href = '/'
      }
    }

    return (
      <>
        <Header />
        <div className='myInfo'>
          <p>
            <FaUserCircle /> <span>{user.nickname}님 안녕하세요.</span>
          </p>
          <div className='pointBox'>
            <p>잔여 포인트량</p>
            <h2>{user.point}P</h2>
          </div>
          <p>
            <FaPhone />
            &nbsp;전화번호 :{' '}
            {user.verified_tel ? user.tel : '전화번호 인증을 해주세요'}
          </p>
          <p className='myInfoFlexContainer'>
            <span>
              <FaRegLightbulb />
              &nbsp;전화번호 인증 여부 : {user.verified_tel ? 'O' : 'X'}{' '}
            </span>
            {user.verified_tel ? null : (
              <button className='verfiedTelBtn'>
                <Link to='/'>전화번호 인증</Link>
              </button>
            )}
          </p>
          <p>
            <FaAward /> 생년월일 : {user.birth.split('-')[0]}년{' '}
            {user.birth.split('-')[1]}월 {user.birth.split('-')[2]}일
          </p>
          <p className='myInfoFlexContainer'>
            <span>
              <FaCog />
              주차장페이지를 메인페이지로 설정{' '}
            </span>
            <button className='changeMainPageBtn' onClick={() => switchState()}>
              {/** 안되니까 지우든지 고치든지..? */}
              {isClick === 0 && 1 ? <FaToggleOff /> : <FaToggleOn />}
            </button>
          </p>

          <p onClick={() => logout()}>
            <FaSignInAlt />
            &nbsp;Logout
          </p>
          <BottomTab />
        </div>
      </>
    )
  } else {
    return <RequireLogin />
  }
}

export default MyInfo
