import { useRef, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

import parkingspaceIcon from '../assets/parkingspaceIcon.png'
import mapPage from '../assets/map.png'
import myPage from '../assets/My.png'
import parkingspacePage from '../assets/parkingspace.png'

const Guide = ({ setGuide }) => {
  const [page, setPage] = useState(0)
  const guideWindow = useRef()

  const skipGuide = () => {
    const doComplete = window.confirm('정말로 가이드를 스킵하시겠습니까?')
    if (doComplete) {
      localStorage.setItem('guide', 'complete')
      setGuide(false)
    }
  }

  const completeGuide = () => {
    const doComplete = window.confirm('가이드를 종료하시겠습니까?')
    if (doComplete) {
      localStorage.setItem('guide', 'complete')
      setGuide(false)
    }
  }

  const setMainPage = () => {}
  const Intro = () => {
    return (
      <div className='intro' key={'intro'}>
        <img src={parkingspaceIcon} alt='logo' />
        <div>
          <h2>파킹스페이스</h2>
          <h4>
            환경을 생각하는 주차 도우미
            <br />
            이용 가이드
          </h4>
        </div>
      </div>
    )
  }
  const mapGuide = () => {
    return (
      <div className='guidePage' key={'mapGuide'}>
        <h2>맵 페이지</h2>
        <img src={mapPage} alt='맵 페이지 예시' />
        <ul>
          <li>지도를 통해서 내 주변 주차장을 확인할 수 있어요!</li>
          <li>만약 주차장을 빌리고 싶다면?</li>
          <li>지도에 있는 마커 클릭!</li>
        </ul>
      </div>
    )
  }
  const parkingspaceGuide = () => {
    return (
      <div className='guidePage' key={'parkingspaceGuide'}>
        <h2>주차장 페이지</h2>
        <img src={parkingspacePage} alt='주차장 페이지 예시' />
        <ul>
          <li>혹시 주차장을 공유하고 싶으신가요?</li>
          <li>그럼 주차장을 등록해보세요!</li>
          <li>주차장 관리를 열심히 하면 좋은 일이 생길수도?</li>
        </ul>
      </div>
    )
  }
  const myInfoGuide = () => {
    return (
      <div className='guidePage' key={'myInfoGuide'} onClick={completeGuide}>
        <h2>내 정보 페이지</h2>
        <img src={myPage} alt='주차장 페이지 예시' />
        <ul>
          <li>내 정보가 궁금할 땐? My 페이지!</li>
          <li>로그아웃이 하고 싶을 땐? My 페이지!</li>
          <li>가이드를 다시 보고 싶을 때도? My 페이지!</li>
          <li style={{ opacity: '0.6' }}>
            해당 페이지 클릭 시 가이드가 종료됩니다.
          </li>
        </ul>
      </div>
    )
  }

  const guideList = [Intro(), mapGuide(), parkingspaceGuide(), myInfoGuide()]

  const scrollNext = () => {
    if (page > 2) {
      completeGuide()
      return
    }
    setPage(page + 1)

    guideWindow.current.scrollLeft += window.innerWidth
  }
  const scrollPrev = () => {
    setPage(page - 1)

    guideWindow.current.scrollLeft -= window.innerWidth
  }

  return (
    <div className='Guide'>
      <div
        className='guideWindow'
        style={{ overflowX: 'scroll' }}
        ref={guideWindow}
      >
        {guideList.map((item) => {
          return item
        })}
      </div>
      <div className='skipContainer'>
        <button onClick={skipGuide}>건너뛰기</button>
        <div>
          <span onClick={scrollPrev}>
            <FaAngleLeft /> prev
          </span>
          <span onClick={scrollNext}>
            {page < 3 ? 'next' : 'exit'} <FaAngleRight />
          </span>
        </div>
      </div>
    </div>
  )
}

export default Guide
