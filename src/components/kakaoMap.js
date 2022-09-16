/* global kakao */
import React, { useEffect, useRef, useState } from 'react'
import ParkingspaceInfoModal from './parkingspaceInfoModal'
import { FaMap } from 'react-icons/fa'
const KakaoMap = () => {
  // const infoTitle = window.document.querySelectorAll('.info-title')
  // infoTitle.forEach(function (e) {
  //   const w = e.offsetWidth + 10
  //   const ml = w / 2
  //   e.parentElement.style.top = '82px'
  //   e.parentElement.style.left = '50%'
  //   e.parentElement.style.marginLeft = -ml + 'px'
  //   e.parentElement.style.width = w + 'px'
  //   e.parentElement.previousSibling.style.display = 'none'
  //   e.parentElement.parentElement.style.border = '0px'
  //   e.parentElement.parentElement.style.background = 'unset'
  // })
  const btnRef = useRef()
  const [showModal, setShowModal] = useState(0)
  const [selectedId, setSelectedId] = useState(0)
  const [positions, setpositions] = useState({
    data: {
      spaces: [],
    }, //tmp data
  })
  useEffect(() => {
    createMap()
    setTimeout(() => btnRef.current.click(), 300)
  }, [])

  // 인포윈도우를 표시하는 클로저를 만드는 함수입니다

  const addMarker = (map, position) => {
    console.log(position)
    const markerSize = 40
    const imageSrc = './marker.png' // 마커이미지의 주소입니다
    const imageSize = new kakao.maps.Size(markerSize, markerSize) // 마커이미지의 크기입니다

    //   var markerImage = new daum.maps.MarkerImage(
    //     '/IMG_FILENAME.png', new daum.maps.Size(WIDTH, HEIGHT));

    // marker.setImage(markerImage);

    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)
    const marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(position.lat, position.lng),
      image: markerImage,
    })
    const costBox = new kakao.maps.CustomOverlay({
      // map: map,
      position: new kakao.maps.LatLng(position.lat, position.lng),
      content: `<span class="markerCost">${position.defaultCost}</span>`, // 인포윈도우 내부에 들어갈 컨텐츠 입니다.
    })
    costBox.setMap(map)

    kakao.maps.event.addListener(marker, 'click', function () {
      setShowModal(1)
      setSelectedId(position)
    })
  }

  const createMap = () => {
    const container = document.getElementById('map')
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude)
        fetch(
          `/api/space/v1/spaces?lat=${position.coords.latitude}&lng=${position.coords.longitude}&w=0.009&h=0.009`
        )
          .then((res) => res.json())
          .then((res) => setpositions(res))
          // .then((res) => setpositions(res))
          .catch((err) => console.log(err))
      })
      navigator.geolocation.getCurrentPosition((position) => {
        const options = {
          center: new kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          ),
          level: 3,
        }
        const map = new kakao.maps.Map(container, options)
        //현재 내위치
        // const currentPosition = new kakao.maps.LatLng(lat, lng)
        // const marker = new kakao.maps.Marker({
        //   position: currentPosition,
        // })
        // marker.setMap(map)
        for (let i = 0; i < positions.data.spaces.length; i++) {
          addMarker(map, positions.data.spaces[i])
        }
      })
    } else {
      // 만약 geolocation을 쓰지 못한다면 교장쌤 집을 찍자
      const options = {
        center: new kakao.maps.LatLng(36.301944076747795, 128.58436918356492),
        level: 4,
      }
      const map = new kakao.maps.Map(container, options)
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
      <button className='updateBtn' onClick={() => createMap()} ref={btnRef}>
        <FaMap />
      </button>
    </div>
  )
}

export default React.memo(KakaoMap)
