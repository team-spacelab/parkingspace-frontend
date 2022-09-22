import { useLocation } from 'react-router-dom'
import BottomTab from '../../components/BottomTab'
import Header from '../../components/Header'
import {
  FaParking,
  FaCoins,
  FaShareAltSquare,
  FaStar,
  FaStoreSlash,
} from 'react-icons/fa'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const ParkingSpaceDetail = () => {
  const data = useLocation().state
  const [imgUrl, setImgUrl] = useState('')
  const [spaceInfo, setSpaceInfo] = useState({
    success: true,
    data: {
      space: {
        id: 0,
        name: 'tmp',
        description: '',
        lat: 0,
        lng: 0,
        defaultCost: 0,
        type: 1,
        status: 0,
      },
    },
  })

  const getAdress = async () => {
    const geocoder = new kakao.maps.services.Geocoder()
    geocoder.coord2Address(
      spaceInfo.data.space.lng,
      spaceInfo.data.space.lat,
      (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          setAddress(result[0].address.address_name)
        }
      }
    )
  }
  useEffect(() => {
    getAdress()
  }, [])

  useEffect(() => {
    fetch(`/api/space/v1/spaces/${data.spaceId}`)
      .then((res) => res.json())
      .then((res) => setSpaceInfo(res))
    // .then((res) => console.log(res))
    fetch(`/api/space/v1/spaces/${data.spaceId}/files?type=SPACE_PICTURE`)
      .then((res) => res.json())
      .then((res) => setImgUrl(res.data.files[0].url))
  }, [data])

  const delParkingspace = () => {
    const doParkingspaceDelete =
      window.confirm('정말 주차장을 삭제하시겠습니까?')

    if (doParkingspaceDelete) {
      fetch(`/api/space/v1/spaces/${data.spaceId}`, {
        method: 'DELETE',
      })
        .then(() => (window.location.href = '/parkingspace'))
        .then(() => {
          toast.remove()
          toast.success('주차장을 삭제하였습니다.', {
            style: { marginBottom: '80px' },
          })
        })
        .catch(() => {
          toast.remove()
          toast.error('주차장을 가져올 수 없습니다.', {
            style: { marginBottom: '80px' },
          })
        })
    }
  }

  return (
    <>
      <Header />
      <div className='parkingspaceDetail'>
        <h3>
          <FaParking /> {spaceInfo.data.space.name} ( #{spaceInfo.data.space.id}{' '}
          )
        </h3>
        <p> 경상북도 의성군 봉양면 봉호로 75-1</p>
        {/** 주차장 이미지 */}
        <div
          className='image'
          style={{
            backgroundImage: `url('${imgUrl}')`,
          }}
        />
        <div className='detailInfo'>
          <p>{spaceInfo.data.space.description}</p>
          <p>
            <FaStar /> 등급 : 5 등급
          </p>
          <p>
            <FaCoins /> 가격(30분당) : {spaceInfo.data.space.defaultCost}원
          </p>
          <p>
            <FaShareAltSquare /> 대여 상태 :{' '}
            {spaceInfo.data.space.status ? (
              <span className='greenBtn'>승인 됨</span>
            ) : (
              <span className='redBtn'>승인 대기 중</span>
            )}
          </p>
          <p className='warning' onClick={delParkingspace}>
            <FaStoreSlash /> 주차장 삭제하기
          </p>
        </div>
      </div>
      <BottomTab />
    </>
  )
}

export default ParkingSpaceDetail
