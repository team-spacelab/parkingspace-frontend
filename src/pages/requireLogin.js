import { FaRegSmile } from "react-icons/fa"
import { BsFillEmojiDizzyFill } from "react-icons/bs"
import BottomTab from "../components/bottomTab"
const RequireLogin = () => {
  return (
    <div className="requiredLogin">
      <div>
        <FaRegSmile/>
        <h3>로그인 해주세요</h3>
      </div>
      <div>
        <BsFillEmojiDizzyFill/>
        <p>로그인 전에는 해당 기능을<br/>사용하실 수 없습니다.</p>
      </div>
      <BottomTab/>
    </div>
  )
}

export default RequireLogin