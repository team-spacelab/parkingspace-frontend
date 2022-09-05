import { useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import toastr from 'toastr'
import Header from '../components/header'

const Login = ({ setIsLogged }) => {
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
  const navigate = useNavigate()
  const [loginInputInfo, setLoginInputInfo] = useState({
    login: '',
    password: '',
  })
  const login = () => {
    fetch('api/auth/v1/users/@login', {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'no-cors',
      },
      body: JSON.stringify(loginInputInfo),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.success) {
          toastr.success('로그인 성공')
          localStorage.setItem('token', res.data.token)
          console.log(localStorage.getItem('token'))
          setIsLogged(true)
          navigate('/')
        }
        //data.false
        else {
          toastr.warning('로그인 실패', res.reason)
        }
      })
  }
  return (
    <>
    <Header/>
    <div className='login'>
      <h3>
        정보를 입력하고
        <br /> 버튼을 눌러 로그인해주세요 <FaPencilAlt />
      </h3>
      <div>
        <p>아이디</p>
        <input
          type={'text'}
          name='login'
          onChange={(e) =>
            setLoginInputInfo({
              ...loginInputInfo,
              login: e.target.value,
            })
          }
        />
        <p>비밀번호</p>
        <input
          type={'password'}
          name='password'
          onChange={(e) =>
            setLoginInputInfo({
              ...loginInputInfo,
              password: e.target.value,
            })
          }
        />
        <input type={'button'} value='로그인' onClick={() => login()} />
        <p>
          <Link to={'/register'}>회원가입</Link>
        </p>
      </div>
    </div>
    </>
  )
}

export default Login
