import React, { useEffect } from 'react'
import { FaMapMarkedAlt } from 'react-icons/fa'
import tmpImg from '../assets/addParking.jpg'
const ParkingspaceInfoModal = ({ id, setShowModal }) => {
  useEffect(() => {}, [])
  return (
    <>
      <div className='parkingspaceInfoModal'>
        <div className='dragBar' />
        <h3 className='address'>
          <FaMapMarkedAlt />
          {'하하 fetch문 써라 게이야~'}
        </h3>
        <img src={tmpImg} alt={tmpImg} />
      </div>
      <div className='backgroundModal' onClick={() => setShowModal(0)} />
    </>
  )
}

export default React.memo(ParkingspaceInfoModal)
