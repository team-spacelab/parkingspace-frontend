import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useLocation } from 'react-router-dom'
import toastr from 'toastr'
import Loading from './loading'

const RegistParkingSpaceResult = () => {
  const state = useLocation().state
  console.log(state.result.current)
  const [isFinished, setIsFinished] = useState(0)
  useEffect(() => {
    //  fetch
    fetch(`/api/space/v1/spaces/${state.result.current.data.space.id}/zones`, {
      method: 'post',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'no-cors',
      },
      body: JSON.stringify({
        name: 'tmp', // 고정
        costDiffrence: 0, // 고정
      }),
    })
      .then(() => setIsFinished(1))
      .catch(() => (window.location.href = '/parkingspace'))
  }, [])
  if (isFinished) {
    toast.remove()
    toast.success('주차장을 등록하였습니다.', {
      style: { marginBottom: '80px' },
    })
    window.location.href = '/parkingspace'
    return <Loading />
  } else {
    return <Loading />
  }
}

export default RegistParkingSpaceResult
