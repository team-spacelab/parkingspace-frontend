import React, { useEffect, useCallback, useState } from 'react'
import { Map, MarkerClusterer, CustomOverlayMap } from 'react-kakao-maps-sdk'
import toast from 'react-hot-toast'
import ParkingspaceInfoModal from './parkingspaceInfoModal';
import SearchBar from './searchBar';

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
  const [showModal, setShowModal] = useState(false)
  const [parkInfo, setParkInfo] = useState({})
  const [state, setState] = useState({
    center: {
      lat: 36.30301568116367,
      lng: 128.58510055431705,
    },
    level: 3,
    isLoading: true
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
      toast.error('위치 정보를 가져올 수 없습니다.', { style: { marginBottom: '80px' } })
      setState((prev) => ({
        ...prev,
        isLoading: false,
      }))
    }
  }, [])

  useDebouncedEffect(async () => {
    const { lat, lng } = state.center
    const { level } = state
    
    if (level > 5) {
      toast.remove()
      toast.error('보고계신 지도가 너무 큽니다.', { style: { marginBottom: '80px' } })
      setSpaces([])
      return 
    }
    const res = await fetch('/api/space/v1/spaces?lat=' + lat + '&lng=' + lng + '&w=0.009&h=0.009')
    const data = await res.json()
    if (!data.success) {
      toast.remove()
      toast.error('주차장을 가져올 수 없습니다.', { style: { marginBottom: '80px' } })
      return
    }

    setSpaces(data.data.spaces)
  }, 500, [state.center, state.level])

  const onClick = (space) => {
    setState((prev) => ({
      ...prev,
      level: 1,
    }))
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        center: {
          lat: space.lat - 0.0007,
          lng: space.lng,
        },
      }))
      setParkInfo(space)
      setShowModal(true)
    }, 500)
  }

  return (
    <>
      <SearchBar map={state}/>
    <div className='kakaomap'>
      <ParkingspaceInfoModal 
        setShowModal={setShowModal}
        showModal={showModal}
        parkInfo={parkInfo}
      />
      <Map
        isPanto={true}
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
        <MarkerClusterer
          averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel={4} // 클러스터 할 최소 지도 레벨
          
        >
          {spaces.map((space) => (
            <CustomOverlayMap
              key={`${space.lat}-${space.lng}`}
              position={{
                lat: space.lat,
                lng: space.lng,
              }}
              clickable={true} 
            >
              <button className={`label label-size-${state.level}`} onClick={() => onClick(space)}>
                {space.defaultCost} ₩
              </button>
            </CustomOverlayMap>
          ))}
        </MarkerClusterer>
      </Map>
    </div>
</>
  )
}

export default React.memo(KakaoMap)
