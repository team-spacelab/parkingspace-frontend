/* global kakao */
import React, { useEffect, useState } from 'react'
import SimpleImageSlider from 'react-simple-image-slider'
import Sheet from 'react-modal-sheet'
import {
  FaMapMarkedAlt,
  FaUserCircle,
  FaRegClock,
  FaQrcode,
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
            {parkInfo.map((v) => (
              <div>
                <div>{v.name}</div>
                <div>{v.defaultCost}₩</div>

                <button onClick={onClick(v.id)}>
                  이동하기
                </button>
              </div>
            ))}
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  )
}

export default React.memo(SearchModal)
