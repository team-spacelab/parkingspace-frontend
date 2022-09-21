import React, { useEffect, useRef, useState } from 'react'
import ParkingspaceInfoModal from './parkingspaceInfoModal'
import { FaMap } from 'react-icons/fa'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import toast from 'react-hot-toast'
const KakaoMap = () => {
  const [state, setState] = useState({
    center: {
      lat: 36.30301568116367,
      lng: 128.58510055431705,
    },
    level: 3,
    isLoading: true,
  })

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }))
        },
        (err) => {
          toast.remove()
          toast.error('위치 정보를 가져올 수 없습니다.', { style: { marginBottom: '80px' } })
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }))
        }
      )
    } else {
      toast.remove()
      toast.error('위치 정보를 가져올 수 없습니다.', { style: { marginBottom: '20px' } })
      setState((prev) => ({
        ...prev,
        isLoading: false,
      }))
    }
  }, [])

  const onCenterChanged = (e) => {
    const lat = e.getCenter().getLat()
    const lng = e.getCenter().getLng()
    const level = e.getLevel()

    setState((prev) => ({
      ...prev,
      center: {
        lat: e.getCenter().getLat(),
        lng: e.getCenter().getLng(),
      },
      level: e.getLevel()
    }))

    const prev = Object.freeze({
      lat: e.getCenter().getLat(),
      lng: e.getCenter().getLng(),
      level: e.getLevel()
    })
    setTimeout(() => {
      if (state.center.lat !== lat && prev.lng !== lng && prev.level !== level) return
      fetch('/api/space/v1/spaces?lat=' + lat + '&lng=' + lng + '&level=' + level)
        .then((res) => res.json())
        .then((res) => {
          setState((prev) => ({
            ...prev,
            spaces: res.data.spaces,
          }))
        })
    }, 1000)
  }

  return (
    <div className='kakaomap'>
      <Map
        level={state.level}
        center={state.center}
        style={{
          width: '100vw',
          height: '100vh',
          zIndex: 0
        }}
        onCenterChanged={(map) => onCenterChanged(map)}
      >
      </Map>
    </div>
  )
}

export default React.memo(KakaoMap)
