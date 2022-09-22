/* global kakao */
import React, { useEffect, useRef, useState } from 'react'
import { FaArrowRight, FaArrowLeft, FaUpload, FaFile } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import BottomTab from '../../components/BottomTab'
import Header from '../../components/Header'
import Loading from '../../components/Loading'
import toast from 'react-hot-toast'

const RegistParkingSpace = ({ isLogged }) => {
  const addressRef = useRef()
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
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
  const [registFileParkingspace, setRegistFileParkingSpace] = useState({
    thumnail: null,
    ownerDocs: null,
  })
  const [inputAddress, setInputAddress] = useState('')
  // 입력값이 다음 컴포넌트에 넘어가는 일 방지
  useEffect(() => {
    if (isLogged) {
      // page핸들링 제대로 못하면 오류남
      if (page !== 0 && page !== 4 && page !== 5) {
        const value =
          page !== 6
            ? window.document.querySelector('input')
            : window.document.querySelector('textarea')
        if (value.value !== '' || value.value !== null) {
          value.value = ''
        }
      }
    }
  }, [isLogged, page])

  useEffect(() => {
    console.log(registFileParkingspace.thumnail)
    if (registFileParkingspace.thumnail !== null) {
      for (let i = 0; i < registFileParkingspace.thumnail.length; i++) {
        console.log(registFileParkingspace.thumnail.item(i))
      }
    }
  }, [registFileParkingspace])

  const btnRef = useRef()
  const result = useRef()
  const regist = async () => {
    // console.log(registFileParkingspace.ownerDocs[0].name)
    const data1 = await fetch(`/api/space/v1/spaces`, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'no-cors',
      },
      body: JSON.stringify(registParkingSpace),
    }).then((res) => res.json())
    result.current = data1

    for (const imgFile of registFileParkingspace.thumnail) {
      await fetch(`/api/space/v1/spaces/${data1.data.space.id}/files`, {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'no-cors',
        },
        body: JSON.stringify({
          type: 'SPACE_PICTURE', //주차장 소유 증명 자료
          filename: imgFile.name,
        }),
      })
        .then((res) => res.json())
        .then((res) =>
          fetch(res.data.url, {
            method: 'PUT',
            body: imgFile,
          })
        )
    }

    await fetch(`/api/space/v1/spaces/${data1.data.space.id}/files`, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'no-cors',
      },
      body: JSON.stringify({
        type: 'SPACE_OWNERSHIP_DOCS',
        filename: registFileParkingspace.ownerDocs[0].name,
      }),
    })
      .then((res) => res.json())
      .then((res) =>
        fetch(res.data.url, {
          method: 'PUT',
          body: registFileParkingspace.ownerDocs[0],
        })
      )

    console.log(result.current)
    btnRef.current.click()
  }

  const verifiedCheck = (key) => {
    // if
    const data = key === 'address' ? key : registParkingSpace[key]
    // console.log(1, typeof registParkingSpace['defaultCost'])
    // console.log(typeof data)
    if (typeof data === 'number') {
      setPage(page + 1)
    } else if (typeof data === 'string') {
      if (key == 'name' && data) {
        toast.error('주차장 이름은 5글자 이상이여야 합니다.')
        return false
      }
      if (data === '' || (data === 'address' && inputAddress === '')) {
        toast.error('정보를 입력해주세요')
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

  const registPay = () => {
    return (
      <div>
        <p>주차장을 등록하고 싶으면 돈을 내라..!</p>
      </div>
    )
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
          if (typeof result[0] === 'undefined') {
            toast.error('정확한 주소를 입력해주세요.11')
            setPage(page)
          } else if (result[0].y !== 0 && result[0].x !== 0) {
            setRegistParkingspace({
              ...registParkingSpace,
              lat: result[0].y * 1,
              lng: result[0].x * 1,
            })
            setPage(page + 1)
          } else {
            toast.error('정확한 주소를 입력해주세요.')
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

  const getFiles = () => {
    if (registFileParkingspace.thumnail !== null) {
      let result = []
      for (let i = 0; i < registFileParkingspace.thumnail.length; i++) {
        console.log(12, typeof registFileParkingspace.thumnail.item(i).name)
        result.push(`${registFileParkingspace.thumnail.item(i).name}`)
      }
      return result
    }
  }

  const parkingspaceThumnailInput = () => {
    return (
      <>
        <h3>등록하실 주차장의 사진을 등록해주세요.</h3>
        <label className='filebutton' htmlFor='thumnail'>
          <div>
            <FaUpload />
            사진 업로드
          </div>
        </label>
        <input
          type={'file'}
          name='spaceThum'
          id='thumnail'
          multiple
          accept='image/jpg, image/png, image/jpeg'
          onChange={(e) =>
            setRegistFileParkingSpace({
              ...registFileParkingspace,
              thumnail: e.target.files,
            })
          }
        />
        <div className='inputFiles'>
          {registFileParkingspace.thumnail !== null
            ? getFiles()
                .slice(0, 5)
                .map((v) => (
                  <div>
                    <FaFile /> {v}
                  </div>
                ))
            : null}
          {registFileParkingspace.thumnail !== null &&
            getFiles().length > 5 && <div>+{getFiles().length - 5}...</div>}
        </div>
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

  const ownershipDocsInput = () => {
    return (
      <>
        <h3>등록하실 주차장의 소유를 증명할 파일을 등록해주세요.</h3>
        <label className='filebutton' htmlFor='ownershipDocs'>
          <div>
            <FaUpload /> 파일 업로드
          </div>
        </label>
        <input
          type={'file'}
          name='spaceownershipDocs'
          id='ownershipDocs'
          onChange={(e) =>
            setRegistFileParkingSpace({
              ...registFileParkingspace,
              ownerDocs: e.target.files,
            })
          }
        />
        <div className='inputFiles'>
          {registFileParkingspace.ownerDocs !== null && (
            <div>
              <FaFile /> {registFileParkingspace.ownerDocs[0].name}
            </div>
          )}
        </div>
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
    registPay(),
    nameInput(),
    addressInput(),
    costInput(),
    parkingspaceThumnailInput(),
    ownershipDocsInput(),
    descInput(),
  ]

  return (
    <>
      {isLoading && <Loading />}
      <Header />
      <div className='registParkingspaceForm'>
        {page <= 3 ? <h2>Step.{page}</h2> : null}
        {inputComponents[page]}
      </div>
      <BottomTab />
    </>
  )
}

export default React.memo(RegistParkingSpace)
