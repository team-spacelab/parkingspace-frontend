import { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import BottomTab from '../components/bottomTab'
import Header from '../components/header'
import Loading from './loading'
import RequireLogin from './requireLogin'
const ParkingSpace = ({ isLogged }) => {
  const [isLoading, setIsLoading] = useState(1)
  const [parkingspace, setParkingspace] = useState({
    data: {
      spaces: [],
    },
  })
  const getMyParkingspcae = () => {
    fetch('/api/space/v1/spaces/@me', {
      method: 'GET',
      headers: {
        Accept: '*/*',
        'Access-Control-Allow-Origin': 'no-cors',
      },
    })
      .then((res) => res.json())
      .then((res) => setParkingspace(res))
      .catch((err) => console.log(1, err))
  }
  useEffect(() => {
    // 내 추자장 목록을 가져옴
    setIsLoading(1)
    getMyParkingspcae()
    setIsLoading(0)
  }, [])

  useEffect(() => {
    console.log(parkingspace)
  }, [parkingspace])
  if (isLogged) {
    return (
      <>
        {isLoading ? <Loading /> : null}
        <Header />
        <div className='parkingspace'>
          <div className='park-card'></div>
          {parkingspace.data.spaces.map((item) => {
            return (
              <Link to='/parkingspaceDetail' state={{ spaceId: item.id }}>
                <div className='parkingspaceCard' key={item.id}>
                  <p>
                    {item.name}{' '}
                    {/* <span className='address'>
                      ( 경상북도 의성군 봉양면 봉호로 75 - 1 )
                    </span> */}
                  </p>
                  <p>-</p>
                  <p className='status'>
                    {item.status ? '대여 중' : '대여 대기 중'}
                  </p>
                </div>
              </Link>
            )
          })}
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
  } else {
    return <RequireLogin />
  }
}

export default ParkingSpace
