/* global kakao */
import React, { useEffect, useRef, useState } from 'react'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import BottomTab from '../components/bottomTab'
import Header from '../components/header'
import toastr from 'toastr'
import Loading from './loading'
import RequireLogin from './requireLogin'

const RegistParkingSpace = ({ isLogged }) => {
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
  const addressRef = useRef()
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [parkingspcaeThumnail, setParkingspcaeThumnail] = useState()
  const [registParkingSpace, setRegistParkingspace] = useState({
    name: '',
    lat: 0,
    lng: 0,
    defaultCost: 3000,
    timeUnit: 30, // 30분당 가격 체크
    type: 'MANUALLY',
    description: '', // 주차장 설명
    // file: null,
  })
  const [inputAddress, setInputAddress] = useState('')

  // 입력값이 다음 컴포넌트에 넘어가는 일 방지
  useEffect(() => {
    if (isLogged) {
      //page핸들링 제대로 못하면 오류남
      const value =
        page !== 3
          ? window.document.querySelector('input')
          : window.document.querySelector('textarea')
      if (value.value !== '' || value.value !== null) {
        value.value = ''
      }
    }
  }, [page])

  const btnRef = useRef()
  const [result, setResult] = useState(null)
  const regist = () => {
    console.log(registParkingSpace)
    fetch(`/api/space/v1/spaces`, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'no-cors',
      },
      body: JSON.stringify(registParkingSpace),
    })
      .then((res) => res.json())
      .then((res) => setResult(res))
  }
  useEffect(() => {
    if (page === 3) {
      btnRef.current.click()
    }
  }, [result])

  const verifiedCheck = (key) => {
    // if
    const data = key === 'address' ? key : registParkingSpace[key]
    // console.log(1, typeof registParkingSpace['defaultCost'])
    // console.log(typeof data)
    if (typeof data === 'number') {
      setPage(page + 1)
    } else if (typeof data === 'string') {
      if (data === '' || (data === 'address' && inputAddress === '')) {
        toastr.info('정보를 입력해주세요')
        return false
      }
      setPage(page + 1)
      return true
    }
  }
  const cancle = () => {
    const doCancle = window.confirm(
      '정말 나가시겠습니까? (이때까지의 작성이 초기화 됩니다.)'
    )
    if (doCancle) {
      window.location.href = '/registParkingspace'
    }
  }
  const nameInput = () => {
    return (
      <>
        <h3>등록하실 주차장의 이름을 입력해주세요.</h3>
        <input
          type={'text'}
          name='spaceName'
          minLength={6}
          onChange={(e) =>
            setRegistParkingspace({
              ...registParkingSpace,
              name: e.target.value,
            })
          }
        />
        <div className='btnGroup'>
          <button onClick={() => verifiedCheck('name')}>
            <FaArrowRight />
          </button>
        </div>
      </>
    )
  }

  const getLatLng = (address) => {
    console.log(1, address)
    const geocoder = new kakao.maps.services.Geocoder()
    try {
      geocoder.addressSearch(address, function (result, status) {
        console.log(result[0])
        if (status === kakao.maps.services.Status.OK) {
          if (typeof result[0] == undefined) {
            toastr.warning('정확한 주소를 입력해주세요.11')
            setPage(page)
          } else if (result[0].y !== 0 && result[0].x !== 0) {
            setRegistParkingspace({
              ...registParkingSpace,
              lat: result[0].y * 1,
              lng: result[0].x * 1,
            })
            setPage(page + 1)
          } else {
            toastr.warning('정확한 주소를 입력해주세요.')
            setPage(page)
          }
        }
      })
    } catch (error) {
      console.log('error')
    }
  }
  const addressInput = () => {
    return (
      <>
        <h3>등록하실 주차장의 주소를 입력해주세요.</h3>
        <input
          ref={addressRef}
          type={'text'}
          name='spaceAddress'
          placeholder='정확한 도로명주소를 입력해주세요'
          onChange={(e) => setInputAddress(e.target.value)}
        />
        <div>
          <div className='btnGroup'>
            <button onClick={() => setPage(page - 1)}>
              <FaArrowLeft />
            </button>
            <button onClick={() => getLatLng(inputAddress)}>
              <FaArrowRight />
            </button>
          </div>
          <button className='cancleBtn' onClick={() => cancle()}>
            취소
          </button>
        </div>
      </>
    )
  }

  const parkingspaceThumnailInput = () => {
    return (
      <>
        <h3>등록하실 주차장의 사진을 등록해주세요.</h3>
        <label htmlFor='thumnail'>
          <div>사진 업로드</div>
        </label>
        <input
          type={'file'}
          name='spaceThum'
          id='thumnail'
          accept='image/jpg, image/png, image/jpeg'
          onChange={(e) =>
            setRegistParkingspace({
              ...registParkingSpace,
              file: e.target.files[0],
            })
          }
        />
        <div className='btnGroup'>
          <button onClick={() => setPage(page - 1)}>
            <FaArrowLeft />
          </button>
          <button onClick={() => setPage(page + 1)}>
            <FaArrowRight />
          </button>
        </div>
      </>
    )
  }

  const costInput = () => {
    return (
      <>
        <h3>주차장의 30분당 대여가격을 입력해주세요.</h3>
        <input
          type={'number'}
          name='spaceCost'
          placeholder='＊미 작성시 30분당 3000원으로 기본입력됩니다.'
          onChange={(e) =>
            setRegistParkingspace({
              ...registParkingSpace,
              defaultCost: e.target.value * 1,
            })
          }
        />
        <div>
          <div className='btnGroup'>
            <button onClick={() => setPage(page - 1)}>
              <FaArrowLeft />
            </button>
            <button onClick={() => verifiedCheck('defaultCost')}>
              <FaArrowRight />
            </button>
          </div>
          <button className='cancleBtn' onClick={() => cancle()}>
            취소
          </button>
        </div>
      </>
    )
  }

  const descInput = () => {
    return (
      <>
        <h3>주차장에 대한 설명 및 주의사항 등을 적어주세요.</h3>
        <textarea
          onChange={(e) =>
            setRegistParkingspace({
              ...registParkingSpace,
              description: e.target.value,
            })
          }
        ></textarea>
        <div>
          <div className='btnGroup'>
            <button onClick={() => setPage(page - 1)}>
              <FaArrowLeft />
            </button>
            <button onClick={() => regist()}>주차장 등록</button>
          </div>
          <button className='cancleBtn' onClick={() => cancle()}>
            취소
          </button>
          <Link
            to={'/registParkingspaceResult'}
            ref={btnRef}
            state={{ result: result }}
          />
        </div>
      </>
    )
  }

  const inputComponents = [
    nameInput(),
    addressInput(),
    // parkingspaceThumnailInput(),
    costInput(),
    descInput(),
  ]

  if (isLogged) {
    return (
      <>
        {isLoading && <Loading />}
        <Header />
        <div className='registParkingspaceForm'>
          {page <= 3 ? <h2>Step.{page + 1}</h2> : null}
          {inputComponents[page]}
        </div>
        <BottomTab />
      </>
    )
  } else {
    return <RequireLogin />
  }
}

export default React.memo(RegistParkingSpace)
