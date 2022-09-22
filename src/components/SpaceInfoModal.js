/* global kakao */
import React, { useEffect, useState } from 'react'
import SimpleImageSlider from 'react-simple-image-slider'
import Sheet from 'react-modal-sheet'
import { useNavigate } from 'react-router-dom'
import {
  FaMapMarkedAlt,
  FaCoins
} from 'react-icons/fa'
import toast from 'react-hot-toast'
const ParkingspaceInfoModal = ({ parkInfo, setShowModal, showModal }) => {
  const navigate = useNavigate()
  const [images, setImages] = useState([])
  const [address, setAddress] = useState('')

  const fetchImage = async () => {
    const res = await fetch(
      `/api/space/v1/spaces/${parkInfo.id}/files?type=SPACE_PICTURE`,
      { method: 'GET' }
    )
    const data = await res.json()
    if (!data.success) {
      toast.error('이미지를 가져올 수 없습니다.')
      return
    }

    setImages(data.data.files)
  }

  const getAdress = async () => {
    const geocoder = new kakao.maps.services.Geocoder()
    geocoder.coord2Address(parkInfo.lng, parkInfo.lat, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setAddress(result[0].address.address_name)
      }
    })
  }

  useEffect(() => {
    if (!showModal) return
    fetchImage()
    getAdress()
  }, [showModal, parkInfo])

  return (
    <>
      <Sheet
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        snapPoints={[600, 150]}
        initialSnap={1}
      >
        <Sheet.Container
          style={{
            transform: 'translateY(30px)',
            height: '80vh',
            position: 'absolute',
            bottom: '0px',
          }}
        >
          <Sheet.Header />
          <Sheet.Content>
            {/** 이미지 주소, 예약 버튼, desc, 이름 */}
            <div className='container'>
              <div className='image'>
                {images.length > 0 && (
                  <SimpleImageSlider
                    width={'100%'}
                    height={'200px'}
                    images={images}
                    showNavs={images.length < 1}
                    loop={true}
                    autoPlay={true}
                    autoPlayDelay={3000}
                  />
                )}
              </div>
              <div className='title'>
                <h2>{parkInfo.name}</h2>
                <h3>{parkInfo.description}</h3>
              </div>
              <div className='information'>
                <div className="info-outer">
                  <div>
                    <div className='info'>
                      <div className='info-title'>
                        <FaMapMarkedAlt />
                        <span>주소</span>
                      </div>
                      <p>{address}</p>
                    </div>
                    <div className='info'>
                      <div className='info-title'>
                        <FaCoins />
                        <span>대여 금액</span>
                      </div>
                      <p>{parkInfo.defaultCost}원</p>
                    </div>
                  </div>
                  <div className='info grade'>
                    <p><strong>5</strong><br />등급</p>
                  </div>
                </div>

                <div className='info' onClick={() => navigate('/order', { state: { spaceId: parkInfo.id, zoneId: parkInfo.childrenZones[0].id }})}>
                  <div className='info-title payBtn'>
                    <span>결제하기</span>
                  </div>
                </div>
              </div>
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  )
}

export default React.memo(ParkingspaceInfoModal)
