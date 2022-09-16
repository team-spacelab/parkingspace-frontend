import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Loading from './loading'

const RegistParkingSpaceResult = () => {
  const data = useLocation().state.formData
  const [isLoading, setIsLoading] = useState(0)
  const [result, setResult] = useState()
  useEffect(() => {
    //  fetch
    setIsLoading(1)
    console.log(data)
    fetch(`/api/space/v1/spaces`, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'no-cors',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => setResult(res))
      .catch((err) => console.log(err))
    setIsLoading(0)
  }, [])

  return (
    <div>
      {isLoading && <Loading />}
      <h3>등록을 완료하였습니다.</h3>
      <Link to={'/parkingspaceDetail'} state={{ id: 123 }}>
        <p>내 주차장 정보 확인하기</p>
      </Link>
    </div>
  )
}

export default RegistParkingSpaceResult
