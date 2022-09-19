/* global kakao */
import React, { useEffect, useRef, useState } from 'react'
import ParkingspaceInfoModal from './parkingspaceInfoModal'
import { FaMap } from 'react-icons/fa'
const KakaoMap = () => {
  const useInterval = (callback, delay) => {
    const savedCallback = useRef(null)

    useEffect(() => {
      savedCallback.current = callback
    }, [callback])

    useEffect(() => {
      const executeCallback = () => {
        savedCallback.current()
      }

      const id = setInterval(executeCallback, delay)

      return () => clearInterval(id)
    }, [])
  }
  const map = useRef()
  const geolocationOption = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  }
  const LatLng = useRef({
    lat: null,
    lng: null,
  })
  const btnRef = useRef()
  const [showModal, setShowModal] = useState(0)
  const [selectedId, setSelectedId] = useState(0)
  const [positions, setpositions] = useState({
    data: {
      spaces: [],
    }, //tmp data
  })

  useEffect(() => {
    console.log('create')
    const container = document.getElementById('map')
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const options = {
            center: new kakao.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            ),
            level: 3,
          }
          console.log(options.center)
          map.current = new kakao.maps.Map(container, options)

          updateMap()
        },
        (err) => {
          console.log(err)
        },
        geolocationOption
      )
    } else {
      // 만약 geolocation을 쓰지 못한다면 교장쌤 집을 찍자
      console.log('GPS를 활성화 시켜주세요')
    }
  }, [])

  useInterval(() => {
    btnRef.current.click()
  }, 10000)

  // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
  const addMarker = (position) => {
    const markerSize = 40
    const imageSrc = './marker.png' // 마커이미지의 주소입니다
    const imageSize = new kakao.maps.Size(markerSize, markerSize) // 마커이미지의 크기입니다

    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)
    const marker = new kakao.maps.Marker({
      map: map.current,
      position: new kakao.maps.LatLng(position.lat, position.lng),
      image: markerImage,
    })
    const costBox = new kakao.maps.CustomOverlay({
      // map: map,
      position: new kakao.maps.LatLng(position.lat, position.lng),
      content: `<span class="markerCost">${position.defaultCost}</span>`, // 인포윈도우 내부에 들어갈 컨텐츠 입니다.
    })
    costBox.setMap(map.current)

    kakao.maps.event.addListener(marker, 'click', function () {
      setShowModal(1)
      setSelectedId(position)
    })
  }

  useEffect(() => {
    console.log(positions)
  }, [positions])
  const updateMap = () => {
    console.log('update')
    const getCenter = map.current.getCenter()
    LatLng.current = {
      lat: getCenter.Ma,
      lng: getCenter.La,
    }
    fetch(
      `/api/space/v1/spaces?lat=${LatLng.current.lat}&lng=${LatLng.current.lng}&w=0.009&h=0.009`
    )
      .then((res) => res.json())
      .then((res) => setpositions(res))
      .catch((err) => console.log(err))
    for (let i = 0; i < positions.data.spaces.length; i++) {
      console.log(i)
      addMarker(positions.data.spaces[i])
    }
  }
  return (
    <div className='kakaomap'>
      <div id='map' style={{ width: '100vw', height: '100vh', zIndex: '0' }} />
      {showModal === 1 ? (
        <ParkingspaceInfoModal
          parkInfo={selectedId}
          setShowModal={setShowModal}
        />
      ) : null}
      <button
        className='updateBtn'
        onClick={() => updateMap()}
        ref={btnRef}
        style={{ display: 'none' }}
      >
        <FaMap />
      </button>
    </div>
  )
}

export default React.memo(KakaoMap)
