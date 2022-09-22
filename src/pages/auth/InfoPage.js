import {
  FaUserCircle,
  FaSignInAlt,
  FaUserAltSlash,
  FaRoad,
} from 'react-icons/fa'
import BottomTab from '../../components/BottomTab'
import Header from '../../components/Header'
import { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
import toast from 'react-hot-toast'

const MyInfo = ({ userInfo, getUserInfo }) => {
  const [isLoading, setIsLoading] = useState(true)
  const cookie = new Cookies()

  useEffect(() => {
    getUserInfo()
  }, [])

  useEffect(() => {
    console.log(userInfo)
    setIsLoading(false)
  }, [userInfo])

  const logout = () => {
    // 모달 로그아웃 하시겠습니까?
    const doLogout = window.confirm('정말로 로그아웃 하시겠습니까?')
    if (doLogout) {
      cookie.remove('SESSION_TOKEN')
      window.location.href = '/'
    }
  }

  const reshowGuide = () => {
    localStorage.removeItem('guide')
    window.location.reload()
  }

  const userDelete = () => {
    const doUserDelete = window.prompt('비밀번호를 입력하세요')
    if (doUserDelete) {
      fetch('api/auth/v1/users/@me', {
        method: 'DELETE',
        body: JSON.stringify({
          password: doUserDelete,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            toast.success('회원탈퇴 성공')
            window.location.href = '/'
          } else {
            toast.error('회원탈퇴 실패', data.reason)
          }
        })
    }
  }

  if (isLoading) return <div></div>

  return (
    <>
      <Header />
      <div className='myInfo'>
        <p>
          <FaUserCircle /> <span>{userInfo.nickname}님 안녕하세요.</span>
        </p>
        <div className='pointBox'>
          <p>잔여 포인트량</p>
          <h2>{userInfo.point}P</h2>
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
}

export default MyInfo
