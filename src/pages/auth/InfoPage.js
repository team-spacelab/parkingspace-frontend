import {
  FaUserCircle,
  FaSignInAlt,
  FaUserAltSlash,
  FaRoad,
  FaUserCog,
  FaCar,
  FaList,
} from 'react-icons/fa'
import BottomTab from '../../components/BottomTab'
import Header from '../../components/Header'
import { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
import toast from 'react-hot-toast'
import Loading from '../../components/Loading'
import { useNavigate } from 'react-router-dom'

const MyInfo = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState({})
  const cookie = new Cookies()

  useEffect(() => {
    const fetchMe = () =>
      fetch('/api/auth/v1/users/@me')
        .then((res) => res.json())
        .then((data) => {
          if (!data.success) return
          setUser(data.data)
          setIsLoading(false)
        })
    fetchMe()
  }, [])

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

  if (isLoading) return <Loading />

  return (
    <>
      <div className='myInfo'>
        <p className='menu'>
          <FaUserCircle /> <span>{user.nickname}님 안녕하세요.</span>
        </p>
        <div className='pointBox'>
          <p>잔여 포인트량</p>
          <h2>{user.point}P</h2>
        </div>
        {/* <p>
          <FaPhone />
          &nbsp;전화번호 :{' '}
          {userInfo.data.isVerified
            ? userInfo.data.phone
            : '전화번호 인증을 해주세요'}
        </p> */}
        <p onClick={reshowGuide} className='menu'>
          <FaRoad /> 가이드 다시보기
        </p>
        <p
          onClick={() => (window.location.href = '/setting/payment')}
          className='menu'
        >
          <FaUserCog /> 결제 관리
        </p>
        <p className='menu' onClick={() => navigate('/registCar')}>
          <FaCar /> 자동차 등록
        </p>
        <p className='menu' onClick={() => navigate('/carLIst')}>
          <FaList /> 자동차 목록
        </p>
        {/* <p className='myInfoFlexContainer'>
          <span>
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

        <p className='warning menu' onClick={() => logout()}>
          <FaSignInAlt />
          로그아웃
        </p>
        <p className='warning menu' onClick={() => userDelete()}>
          <FaUserAltSlash />
          회원탈퇴
        </p>
        <p className='email'>문의: <a href="mailto://contact@spacelab.work">contact@spacelab.work</a></p>
      </div>
      <BottomTab />
    </>
  )
}

export default MyInfo
