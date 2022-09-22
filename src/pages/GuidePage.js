import { useRef, useState } from 'react'
import {
  FaAngleLeft,
  FaAngleRight,
  FaCheck,
  FaHandshake,
  FaMoneyBill,
} from 'react-icons/fa'
import mapPage from '../assets/map.png'
import myPage from '../assets/My.png'
import parkingspacePage from '../assets/parkingspace.png'
import WaveHand from '../assets/wavehand.svg'
import '../style/guide.scss'

const Guide = ({ setGuide }) => {
  const [page, setPage] = useState(0)
  const [purpose, setPurpose] = useState(0)

  const completeGuide = () => {
    const doComplete = window.confirm('가이드를 종료하시겠습니까?')
    if (doComplete) {
      localStorage.setItem('guide', 'complete')
      localStorage.setItem('main', purpose)
      setGuide(false)
    }
  }

  const Intro = () => {
    return (
      <div className='intro container' key={'intro'}>
        <img src={WaveHand} alt={'Wave Hand Emoji'} />
        <div>
          <h2>환영합니다!</h2>
          <h4>
            ParkingSpace
            <br />
            이용 가이드
          </h4>
        </div>
      </div>
    )
  }

  const setMainPage = () => {
    return (
      <div className='select container' key={'select'}>
        <h2>
          서비스를 이용하시는
          <br />
          목적을 선택해주세요
        </h2>
        <small>
          <b>마이페이지 &gt; 메인페이지</b> 에서 변경하실수 있습니다.
        </small>
        <div className='selectBox'>
          <button
            className={'selectItem ' + (!purpose && 'selected')}
            onClick={() => setPurpose(0)}
          >
              <FaHandshake className="icon" />
            <div className='divider'/>
            <div className="">
              <div className='selectTitle'>
                <h3>빌릴래요</h3>
              </div>
                <p>등록된 주차장을 예약하고 주차장을 이용</p>
                <p>자신의 소유의 주차장을 판매 또는 홍보</p>
            </div>
          </button>
          <button
            className={'selectItem ' + (purpose && 'selected')}
            onClick={() => setPurpose(1)}
          >
            <FaMoneyBill className="icon" />
            <div className='divider'/>
            <div className="">
              <div className='selectTitle'>
                <h3>빌려줄래요</h3>
              </div>
              <p>자신의 소유의 주차장을 판매 또는 홍보</p>
            </div>
          </button>
        </div>
      </div>
    )
  }

  const mapGuide = () => {
    return (
      <div className='guidePage container' key={'mapGuide'}>
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
      <div className='guidePage container' key={'parkingspaceGuide'}>
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
      <div
        className='guidePage container'
        key={'myInfoGuide'}
        onClick={completeGuide}
      >
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

  const guideList = [
    Intro(),
    setMainPage(),
    mapGuide(),
    parkingspaceGuide(),
    myInfoGuide(),
  ]

  const scrollNext = () => {
    if (page > 2) {
      completeGuide()
      return
    }
    setPage(page + 1)
  }
  const scrollPrev = () => {
    setPage(page - 1)
  }

  return (
    <div className='Guide'>
      <div className='guideWindow'>
        <div className='guideContainer'>{guideList[page]}</div>
      </div>
      <div className='skipContainer'>
        {page > 0 && (
          <span onClick={scrollPrev}>
            <FaAngleLeft />
          </span>
        )}
        <span onClick={scrollNext}>
          {page < 3 ? <FaAngleRight /> : <FaCheck />}
        </span>
      </div>
    </div>
  )
}

export default Guide
