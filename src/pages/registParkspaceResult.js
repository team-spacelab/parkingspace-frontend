import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const RegistParkingSpaceResult = () => {
  const data = useLocation().state
  const [isLoading, setIsLoading] = useState(0)
  useEffect(() => {
    //  fetch
    console.log(data.formData)
  }, [])

  return (
    <div>
      <h3>등록을 완료하였습니다.</h3>
      <Link to={'/parkingspaceDetail'} state={{ id: 123 }}>
        <p>내 주차장 정보 확인하기</p>
      </Link>
    </div>
  )
}

export default RegistParkingSpaceResult
