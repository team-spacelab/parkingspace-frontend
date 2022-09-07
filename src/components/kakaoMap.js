/* global kakao */
import React, { useEffect } from 'react'

const KakaoMap = () => {
  useEffect(() => {
    const container = document.getElementById('map')
    if (navigator.geolocation) {
      let lat = 0
      let lng = 0
      navigator.geolocation.watchPosition(function (position) {
        lat = position.coords.latitude
        lng = position.coords.longitude
        const options = {
          // 0.02를 빼는 이유는 지도에 정중앙을 맞추기 위해서
          center: new kakao.maps.LatLng(lat - 0.012, lng),
          level: 5,
        }
        const map = new kakao.maps.Map(container, options)
        const markerPosition = new kakao.maps.LatLng(lat, lng)
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        })
        marker.setMap(map)
      })
    } else {
      // 만약 geolocation을 쓰지 못한다면
      const options = {
        center: new kakao.maps.LatLng(36.301944076747795, 128.58436918356492),
        level: 4,
      }
      const map = new kakao.maps.Map(container, options)
    }
  }, [])

  return (
    <div className='kakaomap'>
      <div
        id='map'
        style={{ width: '100%', height: '1200px', zIndex: '0' }}
      ></div>
    </div>
  )
}

export default React.memo(KakaoMap)
