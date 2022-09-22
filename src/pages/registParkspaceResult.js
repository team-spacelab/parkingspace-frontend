import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'

const RegistParkingSpaceResult = () => {
  const state = useLocation().state
  const [isFinished, setIsFinished] = useState(0)
  const navigate = useNavigate()
  useEffect(() => {
    //  fetch
    console.log(state.result.current)
    fetch(`/api/space/v1/spaces/${state.result.current.data.space.id}/zones`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'tmp', // 고정
        costDiffrence: 0, // 고정
      }),
    })
      .then(() => setIsFinished(1))
      .catch(() => {
        toast.remove()
        toast.error('주차장 등록에 실패하였습니다.')
      })
  }, [state])
  if (isFinished) {
    toast.remove()
    toast.success('주차장을 등록하였습니다.', {
      style: { marginBottom: '80px' },
    })
    navigate('/parkingspace')
    return <Loading />
  } else {
    return <Loading />
  }
}

export default RegistParkingSpaceResult
