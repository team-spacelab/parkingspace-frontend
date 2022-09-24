import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout'
const RegistCar = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    alias: '',
    number: '',
    type: 'MIDSIZECAR',
  })

  const fetchRegistCar = async () => {
    if (formData.alias.length < 2) {
      toast.error('자동차 별칭은 2자 이상이여야 합니다.')
      return
    }

    if (formData.number.length < 7) {
      toast.error('자동차 번호는 7자 이상이여야 합니다.')
      return
    }

    const fetchData = await fetch(`/api/auth/v1/cars/@me`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((res) => res.json())
    if (fetchData.success) {
      toast.success('자동차 등록을 완료하였습니다.')
      navigate('/carlist')
    } else {
      toast.error('자동차 등록 중 에러가 발생하였습니다.')
    }
  }

  const subLink = () => {
    return <></>
  }
  return (
    <Layout
      title={`자동차를 등록하고${'\n'}주차장을 대여하세요`}
      onSubmit={fetchRegistCar}
      buttonText={'자동차 등록'}
      subLink={subLink}
    >
      <div className='registCar'>
        <label>자동차 별칭</label>
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
      </div>
    </Layout>
  )
}

export default RegistCar
