import { AiFillHome, AiOutlineUser } from "react-icons/ai"
import { Link } from "react-router-dom"
const BottomTab = () => {
  return (
    <div className="bottomTab">
      <Link to="/"><button><AiFillHome/></button></Link>
      <Link to="/myInfo"><button><AiOutlineUser/></button></Link>
    </div>
  )
}
export default BottomTab