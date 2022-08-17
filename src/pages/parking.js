import BottomTab from "../components/bottomTab"
import {FaPlus} from "react-icons/fa"
const ParkingSpace = () => {
  return (
    <div className="parkingspace">
      <div className="park-card">
        d
      </div>
      <div className="addPark">
        <FaPlus/>
        <p>주차장을 등록해보세요</p>
      </div>
      <BottomTab/>
    </div>
  )
}

export default ParkingSpace