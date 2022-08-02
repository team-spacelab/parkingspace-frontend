// import { useParams } from "react-router-dom"
import BottomTab from "../components/bottomTab"
import RequireLogin from "./requireLogin"

const MyInfo = ({ isLogged }) => {
  if (isLogged) {
    // console.log(username)
    return (
      <div>
        <BottomTab/>
      </div>
    )
  }
  else {
    return <RequireLogin />
  }
}

export default MyInfo