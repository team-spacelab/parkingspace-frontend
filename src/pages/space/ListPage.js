import { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import BottomTab from '../../components/BottomTab'
import Header from '../../components/Header'
import Loading from '../../components/Loading'
const ParkingSpace = () => {
  const [parkingspace, setParkingspace] = useState()
  const getMyParkingspace = () => 
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

  useEffect(() => {
    getMyParkingspace()
  }, [])

  useEffect(() => {
    console.log(parkingspace)
  }, [parkingspace])

  if (!parkingspace) return <Loading />
  return (
    <>
      <div className='parkingspace' style={{ overflowY: 'scroll' }}>
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
                  {item.status ? '승인 됨' : '승인 대기 중'}
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
}

export default ParkingSpace
