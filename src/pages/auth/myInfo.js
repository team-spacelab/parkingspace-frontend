// import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom'
import {
  FaUserCircle,
  FaSignInAlt,
  FaPhone,
  FaRegLightbulb,
  FaCog,
  FaToggleOff,
  FaToggleOn,
  FaUserAltSlash,
  FaRoad,
} from 'react-icons/fa'
import BottomTab from '../../components/bottomTab'
import Header from '../../components/header'
import RequireLogin from '../requireLogin'
import { useEffect, useRef, useState } from 'react'
import toastr from 'toastr'
import { Cookies } from 'react-cookie'
import Loading from '../loading'
const MyInfo = ({ isLogged, userInfo, getUserInfo }) => {
  const [isLoading, setIsLoading] = useState(true)
  const cookie = new Cookies()
  toastr.options = {
    closeButton: false,
    debug: false,
    newestOnTop: true,
    progressBar: false,
    positionClass: 'toast-top-left',
    preventDuplicates: false,
    showDuration: '300',
    hideDuration: '400',
    timeOut: '5000',
    extendedTimeOut: '1000',
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'slideDown',
    hideMethod: 'slideUp',
  }

  useEffect(() => {
    if (isLogged) {
      getUserInfo()
      setIsLoading(false)
    }
  }, [isLogged, getUserInfo])

  if (isLogged) {
    const logout = () => {
      // 모달 로그아웃 하시겠습니까?
      const doLogout = window.confirm('정말로 로그아웃 하시겠습니까?')
      if (doLogout) {
        cookie.remove('SESSION_TOKEN')
        window.location.href = '/'
      }
    }

    const userDelete = () => {
      const doUserDelete = window.prompt('비밀번호를 입력하세요')
      if (doUserDelete) {
        fetch('api/auth/v1/users/@me', {
          method: 'DELETE',
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'no-cors',
          },
          body: JSON.stringify({
            password: doUserDelete,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              toastr.success('회원탈퇴 성공')
              window.location.href = '/'
            } else {
              toastr.warning('회원탈퇴 실패', data.reason)
            }
          })
      }
    }

    const reshowGuide = () => {
      localStorage.removeItem('guide')
      window.location.reload()
    }

    if (isLoading) return <Loading />

    return (
      <>
        <Header />
        <div className='myInfo'>
          <p>
            <FaUserCircle /> <span>{userInfo.data.nickname}님 안녕하세요.</span>
          </p>
          <div className='pointBox'>
            <p>잔여 포인트량</p>
            <h2>{userInfo.data.point}P</h2>
          </div>
          {/* <p>
            <FaPhone />
            &nbsp;전화번호 :{' '}
            {userInfo.data.isVerified
              ? userInfo.data.phone
              : '전화번호 인증을 해주세요'}
          </p> */}
          <p onClick={reshowGuide}>
            <FaRoad /> 가이드 다시보기
          </p>
          {/* <p className='myInfoFlexContainer'>
            <span>
              <FaRegLightbulb />
              &nbsp;전화번호 인증 여부 : {userInfo.data.isVerified
                ? 'O'
                : 'X'}{' '}
            </span>
            {userInfo.data.isVerified ? null : (
              <button className='verfiedTelBtn'>
                <Link to='/'>전화번호 인증</Link>
              </button>
            )}
          </p> */}
          {/* <p>
            <FaAward /> 생년월일 : {userInfo.data.birthday}
          </p> */}
          {/**
           * <p className='myInfoFlexContainer'>
            <span>
              <FaCog />
              &nbsp;{'주차장페이지'}를 메인페이지로 설정{' '}
            </span>
          </p>
           */}

          <p className='warning' onClick={() => logout()}>
            <FaSignInAlt />
            &nbsp;<span>로그아웃</span>
          </p>
          <p className='warning' onClick={() => userDelete()}>
            <FaUserAltSlash />
            &nbsp;<span>회원탈퇴</span>
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
