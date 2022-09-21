/* global kakao */
import React, { useEffect, useState } from 'react'
import {
  FaMapMarkedAlt,
  FaUserCircle,
  FaRegClock,
  FaQrcode,
} from 'react-icons/fa'
const ParkingspaceInfoModal = ({ parkInfo, setShowModal }) => {
  const [address, setAddress] = useState('')
  const geocoder = new kakao.maps.services.Geocoder()
  useEffect(() => {
    getAddress()
  }, [])
  console.log(parkInfo)
  const getAddress = () => {
    let callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        setAddress(result[0].address.address_name)
      }
    }
    geocoder.coord2Address(parkInfo.lng, parkInfo.lat, callback)
  }

  if (!parkInfo) <></>
  return (
    <>
      <div className='parkingspaceInfoModal'>
        <div className='dragBar' />
        <h3 className='address'>
          <FaMapMarkedAlt />
          &nbsp;
          {parkInfo.name}
        </h3>
        <div className='parkingspaceThum' /> {/** Image임 */}
        <p>
          <FaUserCircle /> {parkInfo.manager.nickname}
        </p>
        <p>{address}</p>
        <p className='desc'>
          {parkInfo.description === ''
            ? '작성된 설명이 없습니다.'
            : parkInfo.description}
        </p>
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
