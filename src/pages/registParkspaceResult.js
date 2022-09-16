import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import toastr from 'toastr'
import Loading from './loading'

const RegistParkingSpaceResult = () => {
  const data = useLocation().state
  const [isFinished, setIsFinished] = useState(0)
  useEffect(() => {
    //  fetch
    console.log(1, data.result.data.space.id)
    fetch(`/api/space/v1/spaces/${data.result.data.space.id}/zones`, {
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
    }).then(() => setIsFinished(1))
  }, [])
  if (isFinished) {
    toastr.options = {
      closeButton: false,
      debug: false,
      newestOnTop: true,
      progressBar: false,
      positionClass: 'toast-top-left',
      preventDuplicates: false,
      showDuration: '300',
      hideDuration: '400',
      timeOut: '5000',
      extendedTimeOut: '1000',
      showEasing: 'swing',
      hideEasing: 'linear',
      showMethod: 'slideDown',
      hideMethod: 'slideUp',
    }
    toastr.success('주차장 등록완료')
    window.location.href = '/parkingspace'
    return <></>
  } else {
    return <Loading />
  }
}

export default RegistParkingSpaceResult
