import { FaParking, FaHome, FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"
const BottomTab = () => {
  return (
    <div className="bottomTab">
      <Link to="/parkingspace"><button><FaParking/><p>내 주차장</p></button></Link>
      <Link to="/"><button><FaHome/><p>홈</p></button></Link>
      <Link to="/myInfo"><button><FaUser/><p>내 정보</p></button></Link>
    </div>
  )
}
export default BottomTab
