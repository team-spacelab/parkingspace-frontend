import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomTab from '../../components/BottomTab'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import Loading from '../../components/Loading'

const CarList = () => {
  const navigate = useNavigate()
  const [carList, setCarList] = useState()
  useEffect(() => {
    fetch(`/api/auth/v1/cars/@me`)
      .then((res) => res.json())
      .then((res) => setCarList(res))
  }, [])
  useEffect(() => {
    console.log(carList)
  }, [carList])

  if (!carList) return <Loading />
  return (
    <Layout
      title={'내 자동차 관리'}
      buttonText={'자동차 등록'}
      onSubmit={() => navigate('/registCar')}
      onReturn={() => navigate('/myinfo')}
    >
      <div className='carsList'>
        <ol>
          {carList.data.cars.map((item, index) => (
            !item.status
            ? <li key={index} onClick={() => navigate('/cardetail', { state: { car: item } })}>
                {index + 1}. {item.alias} ( {item.num} )
              </li>
            : <></>
          ))}
        </ol>
      </div>
    </Layout>
  )
}

export default CarList
