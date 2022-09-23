import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Layout from '../../components/Layout'

const Error = {
  USER_ALREADY_REGISTERD: '이미 등록된 아이디입니다.',
  PASSWORD_TOO_WEAK: '비밀번호가 너무 약합니다.',
}

const Register = () => {
  const [registerInputInfo, setRegisterInputInfo] = useState({
    login: '',
    password: '',
    passwordcheck: '',
    nickname: '',
  })
  const onSubmit = async (e) => {
    e.preventDefault()
    const { login, nickname, password, passwordcheck } = registerInputInfo
    console.log(login, nickname, password, passwordcheck)
    if (login.length < 5) return toast.error('아이디는 5자 이상이어야 합니다.')
    if (nickname.length < 3)
      return toast.error('닉네임은 3자 이상이어야 합니다.')
    if (password.length < 8)
      return toast.error('비밀번호는 8자 이상이어야 합니다.')
    if (password !== passwordcheck)
      return toast.error('비밀번호 확인이 일치하지 않습니다.')

    const request = await fetch('api/auth/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, nickname, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          toast.success('회원가입 성공')
          window.location.href = '/login'
        } else {
          toast.error(Error[res.reason])
        }
      })
  }

  const subLink = () => {
    return (
      <>
        <Link to={'/login'}>로그인</Link>
      </>
    )
  }

  return (
    <Layout
      subLink={subLink}
      title={`회원가입 하고 ${'\n'}모든 서비스를 이용하세요`}
      onSubmit={onSubmit}
      buttonText={'회원가입'}
    >
      <label>아이디</label>
      <input
        type={'text'}
        name='login'
        onChange={(e) =>
          setRegisterInputInfo({
            ...registerInputInfo,
            login: e.target.value,
          })
        }
      />
      <label>닉네임(별명)</label>
      <input
        type={'text'}
        name='nickname'
        onChange={(e) =>
          setRegisterInputInfo({
            ...registerInputInfo,
            nickname: e.target.value,
          })
        }
      />
      <label>비밀번호</label>
      <input
        type={'password'}
        name='password'
        onChange={(e) =>
          setRegisterInputInfo({
            ...registerInputInfo,
            password: e.target.value,
          })
        }
      />
      <label>비밀번호 확인</label>
      <input
        type={'password'}
        name='passwordchec'
        onChange={(e) =>
          setRegisterInputInfo({
            ...registerInputInfo,
            passwordcheck: e.target.value,
          })
        }
      />
    </Layout>
  )
}

export default Register
