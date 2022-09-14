import { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import BottomTab from '../components/bottomTab'
import Header from '../components/header'
import Loading from './loading'
const ParkingSpace = () => {
  const [isLoading, setIsLoading] = useState(1)
  useEffect(() => {
    // 내 추자장 목록을 가져옴
    setIsLoading(1)

    setIsLoading(0)
  }, [])

  return (
    <>
      {isLoading ? <Loading /> : null}
      <Header />
      <div className='parkingspace'>
        <div className='park-card'></div>
        <div className='parkingspaceCard'></div>
        <div className='addPark'>
          <FaPlus />
          <p> &nbsp;주차장을 등록해보세요</p>
        </div>
        <BottomTab />
      </div>
    </>
  )
}

export default ParkingSpace
