/* global kakao */
import React, { useEffect, useState } from 'react'
import SimpleImageSlider from 'react-simple-image-slider'
import Sheet from 'react-modal-sheet'
import {
  FaMapMarkedAlt,
  FaUserCircle,
  FaRegClock,
  FaQrcode,
  FaXing,
  FaExclamationCircle
} from 'react-icons/fa'
import toast from 'react-hot-toast'
const SearchModal = ({ setMap, parkInfo, setShowModal, showModal }) => {
  const [images, setImages] = useState([])
  const [address, setAddress] = useState([])

  const getAdress = async () => {
    const addresses = await Promise.all(parkInfo.map((v) => getAddressPromise(v)))
    console.log(addresses)
    setAddress(addresses)
  }

  const getAddressPromise = (parkInfo) =>
    new Promise((resolve, reject) => {
      const geocoder = new kakao.maps.services.Geocoder()
      geocoder.coord2Address(parkInfo.lng, parkInfo.lat, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          resolve(result[0].address.address_name)
        }
      })
    })

  const onClick = (id) => () => {
    const space = parkInfo.find((v) => v.id === id)
    setMap(space.lat, space.lng)
    setShowModal(false)
  }

  useEffect(() => {
    if (!showModal) return
    getAdress()
  }, [showModal, parkInfo])

  return (
    <>
      <Sheet isOpen={showModal} onClose={() => setShowModal(false)} snapPoints={[850, 650]} initialSnap={ 1 }>
        <Sheet.Container >
          <Sheet.Header />
          <Sheet.Content>
            <div className="searchmodal">
              {!parkInfo.length && (
                <div className="notfound">
                  <div className="icon">
                    <FaExclamationCircle />
                  </div>
                  <div>
                    검색 결과가 없습니다.
                  </div>
                  <button onClick={() => setShowModal(false)}>
                    닫기
                  </button>
                </div>
              )}
              {parkInfo.map((v) => (
                <div className="result">
                  <div className="info">
                    <div className="name">{v.name}</div>
                    <div className="price"><strong>{v.defaultCost * 2}</strong>원/시간</div>
                  </div>

                  <button onClick={onClick(v.id)}>
                    이동하기
                  </button>
                </div>
              ))}
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  )
}

export default React.memo(SearchModal)
