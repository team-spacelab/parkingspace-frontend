import { FaParking, FaHome, FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"
const BottomTab = () => {
  return (
    <div className="bottomTab">
      <Link to="/parkingspace"><button><FaParking/></button></Link>
      <Link to="/"><button><FaHome/></button></Link>
      <Link to="/myInfo"><button><FaUser/></button></Link>
    </div>
  )
}
export default BottomTab