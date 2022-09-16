import { useLocation } from 'react-router-dom'
import BottomTab from '../components/bottomTab'
import Header from '../components/header'
import {
  FaParking,
  FaCoins,
  FaShareAltSquare,
  FaStoreSlash,
  FaTv,
} from 'react-icons/fa'
import { useEffect, useState } from 'react'

const ParkingSpaceDetail = () => {
  const data = useLocation().state
  const [spaceInfo, setSpaceInfo] = useState({
    success: true,
    data: {
      space: {
        id: 1,
        managerId: 7,
        name: 'test_space',
        description: null,
        lat: 36.3031,
        lng: 128.585,
        defaultCost: 10000,
        type: 1,
        createdAt: '2022-09-12T05:25:26.000Z',
        status: 0,
        timeUnit: 60,
        manager: {
          id: 7,
          login: 'pmh_only',
          nickname: '@pmh-only',
          isVerified: false,
          status: 0,
          createdAt: '2022-09-11T15:39:22.000Z',
          deleteAt: '2022-09-26T03:08:50.000Z',
        },
      },
    },
  })
  useEffect(() => {
    fetch(`/api/space/v1/spaces/${data.id}`)
  }, [])
  const a = 1
  const b = 0
  console.log(data)

  return (
    <>
      <Header />
      <div className='parkingspaceDetail'>
        <h3>
          <FaParking /> {spaceInfo.data.space.name} ( {spaceInfo.data.space.id}{' '}
          )
        </h3>
        <p> 경상북도 의성군 봉양면 봉호로 75-1</p>
        {/** 주차장 이미지 */}
        <div
          className='image'
          style={{
            backgroundImage:
              "url('https://www.imgacademy.com/themes/custom/imgacademy/images/helpbox-contact.jpg')",
          }}
        />
        <div className='detailInfo'>
          <p>
            이것은 이다 교장선생님의 집 ( 사실 공장임.. )1 이것은 이다
            교장선생님의 집 ( 사실 공장임.. )2
          </p>
          <p>
            <FaCoins /> 가격(30분당) : {spaceInfo.data.space.defaultCost}원
          </p>
          <p>
            <FaShareAltSquare /> 대여 상태 :{' '}
            {a ? (
              <span className='greenBtn'>대여 중</span>
            ) : (
              <span className='redBtn'>대여 대기 중</span>
            )}
          </p>
          <p className='warning'>
            <FaStoreSlash /> 주차장 삭제하기
          </p>
        </div>
      </div>
      <BottomTab />
    </>
  )
}

export default ParkingSpaceDetail
