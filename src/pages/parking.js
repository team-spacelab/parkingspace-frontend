import { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import BottomTab from '../components/bottomTab'
import Header from '../components/header'
import Loading from './loading'
const ParkingSpace = () => {
  const [isLoading, setIsLoading] = useState(1)
  useEffect(() => {
    // 내 추자장 목록을 가져옴
    setIsLoading(1)
    fetch('/api/space/v1/spaces/@me', {
      method: 'GET',
      headers: {
        Accept: '*/*',
        'Access-Control-Allow-Origin': 'no-cors',
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(1, err))
    setIsLoading(0)
  }, [])

  return (
    <>
      {isLoading ? <Loading /> : null}
      <Header />
      <div className='parkingspace'>
        <div className='park-card'></div>
        <Link to='/parkingspaceDetail' state={{ spaceId: 1234 }}>
          <div className='parkingspaceCard'>
            <p>
              교장선생님 집 앞{' '}
              <span className='address'>
                ( 경상북도 의성군 봉양면 봉호로 75 - 1 )
              </span>
            </p>
            <p>-</p>
            <p className='status'>대여 중</p>
          </div>
        </Link>
        <Link to='/registParkingspace'>
          <div className='addPark'>
            <FaPlus />
            <p> &nbsp;주차장을 등록해보세요</p>
          </div>
        </Link>
        <BottomTab />
      </div>
    </>
  )
}

export default ParkingSpace
