import { useRef, useEffect } from 'react'
import { useDraggable } from 'react-use-draggable-scroll'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

import parkingspaceIcon from '../assets/parkingspaceIcon.png'
import mapPage from '../assets/map.png'
import myPage from '../assets/My.png'
import parkingspacePage from '../assets/parkingspace.png'

const Guide = ({ setGuide }) => {
  const guideWindow = useRef()
  const { event } = useDraggable(guideWindow)

  const completeGuide = () => {
    const doComplete = window.confirm('정말로 가이드를 스킵하시겠습니까?')
    if (doComplete) {
      localStorage.setItem('guide', 'complete')
      setGuide(false)
    }
  }
  const Intro = () => {
    return (
      <div className='intro'>
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
      <div>
        <h2>메인 페이지 가이드</h2>
      </div>
    )
  }
  const parkingspaceGuide = () => {
    return (
      <div>
        <h2>주차장 페이지 가이드</h2>
      </div>
    )
  }
  const myInfoGuide = () => {
    return (
      <div>
        <h2>내 정보 페이지 가이드</h2>
      </div>
    )
  }

  const guideList = [Intro(), mapGuide(), parkingspaceGuide(), myInfoGuide()]

  const scrollNext = () => {
    guideWindow.current.scrollLeft += window.innerWidth
  }
  const scrollPrev = () => {
    guideWindow.current.scrollLeft -= window.innerWidth
  }
  return (
    <div className='Guide'>
      <div
        className='guideWindow'
        style={{ overflowX: 'scroll' }}
        ref={guideWindow}
        {...event}
      >
        {guideList.map((item) => {
          return item
        })}
      </div>
      <div className='skipContainer'>
        <button onClick={() => completeGuide()}>건너뛰기</button>
        <div>
          <span onClick={scrollPrev}>
            <FaAngleLeft /> prev
          </span>
          <span onClick={scrollNext}>
            next <FaAngleRight />
          </span>
        </div>
      </div>
    </div>
  )
}

export default Guide
