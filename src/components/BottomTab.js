import { FaParking, FaHome, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const BottomTab = () => {
  const location = window.location.pathname

  return (
    <div className="bottomTab">
      <Link to="/parkingspace"><button className={location === '/parkingspace' ? 'selected' :''} ><FaParking/><p>내 주차장</p></button></Link>
      <Link to="/main"><button className={location === '/main' ? 'selected' :''}><FaHome/><p>홈</p></button></Link>
      <Link to="/myInfo"><button className={location === '/myInfo' ? 'selected' :''}><FaUser/><p>내 정보</p></button></Link>
    </div>
  )
}
export default BottomTab
