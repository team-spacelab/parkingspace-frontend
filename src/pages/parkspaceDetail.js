import { useLocation } from 'react-router-dom'
import BottomTab from '../components/bottomTab'
import Header from '../components/header'
import {
  FaParking,
  FaCoins,
  FaShareAltSquare,
  FaStoreSlash,
  FaTv,
} from 'react-icons/fa'

const ParkingSpaceDetail = () => {
  const data = useLocation().state
  console.log(data)
  const a = 0
  const b = 1
  return (
    <>
      <Header />
      <div className='parkingspaceDetail'>
        <h3>
          <FaParking /> 교장 선생님 집 앞 주차장 ( id )
        </h3>
        <p> 경상북도 의성군 봉양면 봉호로 75-1</p>
        {/** 주차장 이미지 */}
        <div
          className='image'
          style={{
            backgroundImage:
              "url('https://www.imgacademy.com/themes/custom/imgacademy/images/helpbox-contact.jpg')",
          }}
        />
        <div className='detailInfo'>
          <p>
            이것은 이다 교장선생님의 집 ( 사실 공장임.. )1 이것은 이다
            교장선생님의 집 ( 사실 공장임.. )2
          </p>
          <p>
            <FaCoins /> 가격(30분당) : 5000원
          </p>
          <p>
            <FaShareAltSquare /> 대여 상태 :{' '}
            {a ? (
              <span className='greenBtn'>대여 중</span>
            ) : (
              <span className='redBtn'>대여 대기 중</span>
            )}
          </p>
          <p>
            <FaTv /> 대여 활성화 여부:{' '}
            {b ? (
              <span className='greenBtn'>대여 가능</span>
            ) : (
              <span className='redBtn'>대여 불가능</span>
            )}
          </p>
          <p className='warning'>
            <FaStoreSlash /> 주차장 삭제하기
          </p>
        </div>
      </div>
      <BottomTab />
    </>
  )
}

export default ParkingSpaceDetail
