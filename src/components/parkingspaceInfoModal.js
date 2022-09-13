import React, { useEffect } from 'react'
import {
  FaMapMarkedAlt,
  FaUserCircle,
  FaRegClock,
  FaQrcode,
} from 'react-icons/fa'
const ParkingspaceInfoModal = ({ id, setShowModal }) => {
  useEffect(() => {
    // id로 썸네일같은거 다 받아오라 이말이야
    console.log(id)
  })
  return (
    <>
      <div className='parkingspaceInfoModal'>
        <div className='dragBar' />
        <h3 className='address'>
          <FaMapMarkedAlt />
          &nbsp;
          {'교장쌤 집 앞 주차장'}
        </h3>
        <div className='parkingspaceThum' /> {/** Image임 */}
        <p>
          <FaUserCircle /> {'orol4rang'}
        </p>
        <p>경상북도 의성군 봉양면 봉호로 75-1</p>
        <div>
          <button onClick={() => console.log('현장 예약')}>
            <FaQrcode />
            &nbsp; 현장 구매
          </button>
          <button onClick={() => console.log('주차장 예약')}>
            <FaRegClock />
            &nbsp; 주차장 예약
          </button>
        </div>
      </div>
      <div className='backgroundModal' onClick={() => setShowModal(0)} />
    </>
  )
}

export default React.memo(ParkingspaceInfoModal)
