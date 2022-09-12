/* global kakao */
import React, { useEffect, useState } from 'react'

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
  useEffect(() => {
    createMap()
  }, [])

  // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
  const [positions, setpositions] = useState([
    {
      success: true,
      data: {
        name: '교장쌤 집',
        id: 1,
        latlng: new kakao.maps.LatLng(36.301944076747795, 128.58436918356492),
        price: 5000,
      },
    },
    {
      success: true,
      data: {
        name: '생태연못',
        id: 2,
        latlng: new kakao.maps.LatLng(33.450936, 126.569477),
        price: 50000,
      },
    },
    {
      success: true,
      data: {
        name: '텃밭',
        id: 3,
        latlng: new kakao.maps.LatLng(33.450879, 126.56994),
        price: 500,
      },
    },
    {
      success: true,
      data: {
        name: '근린공원',
        id: 1467,
        latlng: new kakao.maps.LatLng(33.451393, 126.570738),
        price: 5000,
      },
    },
  ])

  const addMarker = (map, position) => {
    const marker = new kakao.maps.Marker({
      map: map,
      position: position.data.latlng,
    })
    const costBox = new kakao.maps.CustomOverlay({
      // map: map,
      position: position.data.latlng,
      content: `<span class="markerCost">${position.data.price}</span>`, // 인포윈도우 내부에 들어갈 컨텐츠 입니다.
    })
    costBox.setMap(map)

    kakao.maps.event.addListener(marker, 'click', function () {
      console.log(position.data.name)
    })
  }

  const createMap = () => {
    const container = document.getElementById('map')
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const options = {
          center: new kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          ),
          level: 4,
        }
        const map = new kakao.maps.Map(container, options)
        //현재 내위치
        // const currentPosition = new kakao.maps.LatLng(lat, lng)
        // const marker = new kakao.maps.Marker({
        //   position: currentPosition,
        // })
        // marker.setMap(map)
        for (let i = 0; i < positions.length; i++) {
          addMarker(map, positions[i])
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
      <div
        id='map'
        style={{ width: '100vw', height: '100vh', zIndex: '0' }}
      ></div>
    </div>
  )
}

export default React.memo(KakaoMap)
