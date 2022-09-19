import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Cookies } from 'react-cookie'
import toast from 'react-hot-toast'

const Error = {
  'USER_NOT_FOUND_OR_PASSWORD_INVALID': '계정 정보를 다시 확인해주세요.'
}

const Login = ({ setIsLogged }) => {
  const cookie = new Cookies()
  const navigate = useNavigate()
  const [loginInputInfo, setLoginInputInfo] = useState({
    login: '',
    password: '',
  })
  const onSubmit = async (e) => {
    e.preventDefault()
    const { login, password } = loginInputInfo
    if (!login || !password) return toast.error('아이디와 비밀번호를 입력해주세요.')

    const requst = await fetch('/api/auth/v1/users/@login', {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'no-cors',
      },
      body: JSON.stringify(loginInputInfo),
    })

    const response = await requst.json()

      if (response.success) {
        toast.success('로그인 성공!', { position: 'top-right' })
        cookie.set('SESSION_TOKEN', response.data.token)
        setIsLogged(true)
        navigate('/')
      }
      //data.false
      else toast.error(Error[response.reason])
  }
  return (
    <>
      <div className='login'>
        <h2>
          로그인하고 <br />
          모든 서비스를 이용해보세요
        </h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <label htmlFor='login'>아이디</label>
          <input
            type={'text'}
            id='login'
            name='login'
            onChange={(e) =>
              setLoginInputInfo({
                ...loginInputInfo,
                login: e.target.value,
              })
            }
          />
          <label htmlFor='password'>비밀번호</label>
          <input
            type={'password'}
            id='password'
            name='password'
            onChange={(e) =>
              setLoginInputInfo({
                ...loginInputInfo,
                password: e.target.value,
              })
            }
          />
          <input type={'submit'} value='로그인'/>
          <p>
            <Link to={'/register'}>계정이 없으신가요? 회원가입</Link>
          </p>
        </form>
      </div>
    </>
  )
}

export default Login
