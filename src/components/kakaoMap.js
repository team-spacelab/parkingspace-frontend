import React, { useEffect, useCallback, useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import toast from 'react-hot-toast'
import { CustomOverlayMap } from 'react-kakao-maps-sdk';

const useDebouncedEffect = (func, delay, deps) => {
  const callback = useCallback(func, deps);

  useEffect(() => {
    const timer = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [callback, delay]);
}

const KakaoMap = () => {
  const [state, setState] = useState({
    center: {
      lat: 36.30301568116367,
      lng: 128.58510055431705,
    },
    level: 3,
    isLoading: true,
  })
  const [spaces, setSpaces] = useState([])

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

  useDebouncedEffect(async () => {
    const { lat, lng } = state.center
    const { level } = state
    
    const res = await fetch('/api/space/v1/spaces?lat=' + lat + '&lng=' + lng + '&w=0.009&h=0.009')
    const data = await res.json()
    if (!data.success) {
      toast.remove()
      toast.error('주차장을 가져올 수 없습니다.', { style: { marginBottom: '20px' } })
      return
    }

    setSpaces(data.data.spaces)
  }, 500, [state.center, state.level])

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
        onCenterChanged={(map) => setState({
          level: map.getLevel(),
          center: {
            lat: map.getCenter().getLat(),
            lng: map.getCenter().getLng(),
          },
          isLoading: false
        })}
      >
        {spaces.map((space) => (
          <CustomOverlayMap
            position={{
              lat: space.lat,
              lng: space.lng,
            }}
          >
            <div className="label">
              {space.defaultCost} ₩
            </div>
          </CustomOverlayMap>
        ))}
      </Map>
    </div>
  )
}

export default React.memo(KakaoMap)
