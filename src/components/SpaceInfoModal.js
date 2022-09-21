/* global kakao */
import React, { useEffect, useState } from 'react'
import SimpleImageSlider from 'react-simple-image-slider'
import Sheet from 'react-modal-sheet'
import {
  FaMapMarkedAlt,
  FaUserCircle,
  FaRegClock,
  FaQrcode
} from 'react-icons/fa'
import toast from 'react-hot-toast'
const ParkingspaceInfoModal = ({ parkInfo, setShowModal, showModal }) => {
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
        snapPoints={[850, 650]}
        initialSnap={1}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <div className='container'>
              <div className='title'>
                <h2>{parkInfo.name}</h2>
                <h3>{parkInfo.description}</h3>
              </div>
              <div className='information'>
                <div className='info'>
                  <div className='info-title'>
                    <FaMapMarkedAlt />
                    <span>주소</span>
                  </div>
                  <p>{address}</p>
                </div>
                <div className='info'>
                  <div className='info-title'>
                    <FaMapMarkedAlt />
                    <span></span>
                  </div>
                  <p>{address}</p>
                </div>
              </div>
              {/* <div className='image'>
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
              </div> */}
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  )
}

export default React.memo(ParkingspaceInfoModal)
