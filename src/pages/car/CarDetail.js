import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import BottomTab from '../../components/BottomTab'
import Layout from '../../components/Layout'
import Loading from '../../components/Loading'

const Error = {
  CAR_ID_NOT_FOUND: '자동차를 찾을수 없습니다.',
  NOT_ALLOW_TO_DELETE: '자동차를 삭제/수정할 권한이 없습니다.'
}

const CarDetail = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [carData, setCarData] = useState()
  const { car } = location.state

  useEffect(() => {
    setCarData(car)
  }, [car])

  const onDelete = async () => {
    const answer = window.confirm('정말로 삭제하시겠습니까?')
    if (!answer) return
    const res = await fetch('/api/auth/v1/cars/' + car.id, {
      method: 'DELETE'
    }).then(res => res.json())

    if (!res.success) {
      toast.error(Error[res.reason])
      return navigate('/carlist')
    }
    toast.success('자동차를 삭제했습니다.')
    return navigate('/carlist')
  }

  const onUpdate = async () => {
    const res = await fetch('/api/auth/v1/cars/' + car.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alias: carData.alias })
    }).then(res => res.json())

    if (!res.success) {
      toast.error(Error[res.reason])
      return navigate('/carlist')
    }
    toast.success('자동차를 수정했습니다.')
    return navigate('/carlist')
  }

  if (!car) navigate('/carlist')
  if (!carData) return <Loading />
  return (
    <Layout
      title={'내 자동차 관리'}
      buttonText={'수정'}
      onSubmit={onUpdate}
      onReturn={() => navigate('/carlist')}
      subLink=<button className='submit-button' onClick={() => onDelete()} style={{ backgroundColor: '#ff0000', marginTop: '5px' }}>삭제</button>
    >
      <div className='registCar'>
        <label>자동차 별칭</label>
        <input
          onChange={(e) =>
            setCarData({
              ...carData,
              alias: e.target.value,
            })
          }
          value={carData.alias}
          placeholder='ex) 카니발'
        />
      </div>
      
    </Layout>
  )
}

export default CarDetail
