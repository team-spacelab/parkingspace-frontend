import { FaPlus } from 'react-icons/fa'
import BottomTab from '../components/bottomTab'
import Header from '../components/header'
const ParkingSpace = () => {
  return (
    <>
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
