import React, { useEffect, useCallback, useState } from 'react'
import { Map, MarkerClusterer, CustomOverlayMap } from 'react-kakao-maps-sdk'
import { MdGpsFixed } from 'react-icons/md'
import { BsPlus, BsDash } from 'react-icons/bs'
import toast from 'react-hot-toast'
import ParkingspaceInfoModal from './SpaceInfoModal'
import SearchBar from './SearchBar'
import '../style/kakao.scss'
import AroundSpaceModal from './AroundSpaceModal'

const useDebouncedEffect = (func, delay, deps) => {
  const callback = useCallback(func, deps)

  useEffect(() => {
    const timer = setTimeout(() => {
      callback()
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [callback, delay])
}

const KakaoMap = () => {
  const [showModal, setShowModal] = useState(false)
  const [parkInfo, setParkInfo] = useState({})
  const [state, setState] = useState({
    center: {
      lat: 36.30301568116367,
      lng: 128.58510055431705
    },
    level: 3,
    isLoading: true
  })
  const [spaces, setSpaces] = useState([])

  const geoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude // 경도
            },
            level: 2,
            isLoading: false
          }))
        },
        (err) => {
          toast.success('결제를 완료했습니다!')
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false
          }))
        }
      )
    } else {
      toast.error('위치 정보를 가져올 수 없습니다.')
      setState((prev) => ({
        ...prev,
        isLoading: false
      }))
    }
  }

  useEffect(() => {
    geoLocation()
  }, [])

  useDebouncedEffect(
    async () => {
      const { lat, lng } = state.center
      const { level } = state

      if (level > 6) {
        toast.remove()
        toast.error('보고계신 지도가 너무 큽니다.')
        setSpaces([])
        return
      }
      const res = await fetch(
        '/api/space/v1/spaces?lat=' + lat + '&lng=' + lng + '&w=0.009&h=0.009'
      )
      const data = await res.json()
      if (!data.success) {
        toast.remove()
        toast.error('주차장을 가져올 수 없습니다.')
        return
      }

      setSpaces(data.data.spaces)
    },
    500,
    [state.center, state.level]
  )

  const onClick = (space) => {
    setState((prev) => ({
      ...prev,
      level: 1
    }))
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        center: {
          lat: space.lat,
          lng: space.lng
        }
      }))
      setParkInfo(space)
      setShowModal(true)
    }, 500)
  }

  async function parseQR () {
    const url = new URL(window.location.href)
    const spaceId = url.searchParams.get('spaceId')

    if (spaceId){
      const data = await fetch('/api/space/v1/spaces/' + parseInt(spaceId)).then((res) => res.json())
      if (data.success) {
        onClick(data.data.space)
      }
    }
  }

  useEffect(() => {
    parseQR()
  }, [])

  const onPlus = () => {
    setState((prev) => ({
      ...prev,
      level:  state.level < 2 ? prev.level : prev.level - 1
    }))
  }

  const onMinus = () => {
    setState((prev) => ({
      ...prev,
      level: state.level > 6 ? prev.level : prev.level + 1
    }))
  }

  const onAroundClick = (select) => {
    setState((prev) => ({
      ...prev,
      center: {
        lat: select.lat,
        lng: select.lng
      },
      level: 1
    }))
    setParkInfo(select)
    setShowModal(true)
  }

  return (
    <>
      <SearchBar
        map={state}
        setMap={(lat, lng) => setState({ ...state, center: { lat, lng }, level: 2 })}
      />
        <AroundSpaceModal
          spaces={spaces}
          onClick={onAroundClick}
        />
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
          onCenterChanged={(map) =>
            setState({
              level: map.getLevel(),
              center: {
                lat: map.getCenter().getLat(),
                lng: map.getCenter().getLng()
              },
              isLoading: false
            })
          }
        >
          <MarkerClusterer
            averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
            minLevel={4} // 클러스터 할 최소 지도 레벨
          >
            <button className='reposition' onClick={() => geoLocation()}>
              <MdGpsFixed />
            </button>
            <div className='zoom'>
              <button
                className='zoom-in'
                onClick={() => onPlus() }
              >
                <BsPlus />
              </button>
              <hr style={{ color: '#fff' }} />
              <button
                className='zoom-out'
                onClick={() => onMinus() }
              >
                <BsDash />
              </button>
            </div>
            {spaces.map((space) => (
              <CustomOverlayMap
                key={`${space.lat}-${space.lng}`}
                position={{
                  lat: space.lat,
                  lng: space.lng
                }}
                clickable={true}
              >
                <button
                  className={`label label-size-${state.level}`}
                  onClick={() => onClick(space)}
                >
                  <p className='cost'>{space.defaultCost}원</p>
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
