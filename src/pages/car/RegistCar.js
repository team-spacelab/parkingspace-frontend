import { useState } from 'react'
import toast from 'react-hot-toast'
import Component from '../../components/Component'
const RegistCar = () => {
  const [formData, setFormData] = useState({
    alias: '',
    number: '',
    type: 'MIDSIZECAR',
  })

  const fetchRegistCar = async () => {
    const fetchData = await fetch(`/api/auth/v1/cars/@me`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((res) => res.json())
    if (fetchData.success) {
      toast.success('자동차 등록을 완료하였습니다.')
    } else {
      toast.error('자동차 등록 중 에러가 발생하였습니다.')
    }
  }

  return (
    <>
      <Component title={`자동차를 등록하고${'\n'}주차장을 대여하세요`}>
        <div className='registCar'>
          <label>자동차 차종</label>
          <input
            onChange={(e) =>
              setFormData({
                ...formData,
                alias: e.target.value,
              })
            }
            placeholder='ex) 카니발'
          />
          <label>자동차 번호</label>
          <input
            onChange={(e) =>
              setFormData({
                ...formData,
                number: e.target.value,
              })
            }
            placeholder='ex) 31가 5884'
          />
          <button type='submit' onClick={fetchRegistCar}>
            자동차 등록
          </button>
        </div>
      </Component>
    </>
  )
}

export default RegistCar
