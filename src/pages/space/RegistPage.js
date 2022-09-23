/* global kakao */
import React, { useEffect, useRef, useState } from 'react'
import { FaUpload, FaFile } from 'react-icons/fa'
import Layout from '../../components/Layout'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const RegistParkingSpace = () => {
  const navigate = useNavigate()
  const addressRef = useRef()
  const [disable, onDisable] = useState(false)
  const [page, setPage] = useState(0)
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
  const [address, setAddress] = useState('')
  useEffect(() => {
    console.log(registFileParkingspace.thumnail)
    if (registFileParkingspace.thumnail !== null) {
      for (let i = 0; i < registFileParkingspace.thumnail.length; i++) {
        console.log(registFileParkingspace.thumnail.item(i))
      }
    }
  }, [registFileParkingspace])

  const result = useRef()
  const regist = async () => {
    onDisable(true)
    toast.loading('정보를 등록중입니다.')
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

    navigate('/registParkingspaceResultspace', { state: { result } })
  }

  const verifyName = () => {
    if (!registParkingSpace.name) {
      toast.error('주차장 이름을 입력해주세요')
      return
    }
    if (registParkingSpace.name.length < 5) {
      toast.error('주차장 이름은 5글자 이상 입력해주세요')
      return
    }
    setPage(page + 1)
  }

  const nameInput =
    <input
      type={'text'}
      placeholder='ex) 경북소프트웨어고등학교 뒷문 주차장'
      value={registParkingSpace.name}
      minLength={5}
      onChange={(e) =>
        setRegistParkingspace({
          ...registParkingSpace,
          name: e.target.value,
        })
      }
    />

  const getLatLng = () => {
    const geocoder = new kakao.maps.services.Geocoder()
    try {
      geocoder.addressSearch(address, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          if (typeof result[0] === 'undefined') {
            toast.error('정확한 주소를 입력해주세요.')
          } else if (result[0].y !== 0 && result[0].x !== 0) {
            const answer = window.confirm(result[0].address_name + ' 주소가 맞나요?')
            if (!answer) return
            setRegistParkingspace({
              ...registParkingSpace,
              lat: result[0].y * 1,
              lng: result[0].x * 1,
            })
            setAddress(result[0].address_name)
            setPage(page + 1)
          } else {
            toast.error('정확한 주소를 입력해주세요.')
          }
        } else {
          toast.error('정확한 주소를 입력해주세요.')
        }
      })
    } catch (error) {
      console.log('error')
    }
  }
  const addressInput = 
    <input
      ref={addressRef}
      type={'text'}
      placeholder='정확한 도로명주소를 입력해주세요'
      value={address}
      onChange={(e) => setAddress(e.target.value)}
    />

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

  const parkingspaceThumnailInput = 
    <>
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
        style={{ display: 'none' }}
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
    </>

  const ownershipDocsInput = 
    <>
      <label className='filebutton' htmlFor='ownershipDocs'>
        <div>
          <FaUpload /> 파일 업로드
        </div>
      </label>
      <input
        type={'file'}
        name='spaceownershipDocs'
        id='ownershipDocs'
        style={{ display: 'none' }}
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
    </>

  const costInput =
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type={'number'}
        name='spaceCost'
        placeholder='미 작성시 3000원으로 설정됩니다.'
        value={registParkingSpace.defaultCost}
        onChange={(e) =>
          setRegistParkingspace({
            ...registParkingSpace,
            defaultCost: e.target.value * 1,
          })
        }
      />
      <p style={{ fontSize: '1.5em' }}>원</p>
    </div>

  const descInput = 
    <textarea
      onChange={(e) =>
        setRegistParkingspace({
          ...registParkingSpace,
          description: e.target.value,
        })
      }
      value={registParkingSpace.description}
    ></textarea>
  const inputComponents = [
    nameInput,
    addressInput,
    costInput,
    parkingspaceThumnailInput,
    ownershipDocsInput,
    descInput,
  ]

  const onSubmit = () => {
    if (page === 0) return verifyName()
    if (page === 1) return getLatLng()
    if (page === 5) return regist()
    setPage(page + 1)
  }

  const onReturn = () => {
    if (page !== 0) return setPage(page - 1)
    
    const answer = window.confirm('주차장 등록을 취소하시겠습니까?')
    if (answer) return navigator('/')
  }
  return (
    <>
      <Layout
        title={['주차장의\n이름을 입력해주세요.', '주차장의\n주소를 입력해주세요.', '주차장의 30분당\n대여가격을 입력해주세요.', '주차장의 사진을\n등록해주세요.', '주차장의 소유를 증명할\n파일을 등록해주세요.', '주차장에 대한 설명 및\n주의사항 등을 적어주세요.'][page]}
        buttonText={ page === 5 ? '완료' : '다음' }
        onSubmit={onSubmit}
        onReturn={onReturn}
        onDisable={disable}
      >
        <div className='registParkingspaceForm'>
          {inputComponents[page]}
        </div>
      </Layout>
    </>
  )
}

export default React.memo(RegistParkingSpace)
