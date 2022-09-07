import { useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import toastr from 'toastr';
import Header from '../components/header';

const Register = () => {
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
  };
  const [registerInputInfo, setRegisterInputInfo] = useState({
    login: '',
    password: '',
    nickname: '',
  });
  const register = () => {
    fetch('api/auth/v1/users', {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'no-cors',
      },
      body: JSON.stringify(registerInputInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          window.location.href = 'http://localhost:3000/';
        }
        //data.false
        else {
          toastr.warning('회원가입 실패', data.reason);
        }
      });
  };
  return (
    <>
      <Header />
      <div className='register'>
        <h3>
          정보를 입력하고
          <br /> 버튼을 눌러 회원가입해주세요 <FaPencilAlt />
        </h3>
        <div>
          <p>아이디</p>
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
          <p>닉네임(별명)</p>
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
          <p>비밀번호</p>
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
          <input type={'button'} value='회원가입' onClick={() => register()} />
          <p>
            <Link to={'/login'}>로그인</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
