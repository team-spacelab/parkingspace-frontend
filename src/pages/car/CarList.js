import { useEffect, useState } from 'react'
import BottomTab from '../../components/BottomTab'
import Header from '../../components/Header'

const CarList = () => {
  const [carList, setCarList] = useState({
    data: {
      cars: [],
    },
  })
  useEffect(() => {
    fetch(`/api/auth/v1/cars/@me`)
      .then((res) => res.json())
      .then((res) => setCarList(res))
  }, [])
  useEffect(() => {
    console.log(carList)
  }, [carList])

  return (
    <>
      <div className='carsList'>
        <div>
          <p className='goBackBtn' onClick={() => window.history.back()}>
            돌아가기
          </p>
          <h2>등록된 자동차 목록</h2>
        </div>
        <ol>
          {carList.data.cars.map((item, index) => {
            return (
              <li key={index}>
                {index + 1}. {item.alias} ( {item.num} )
              </li>
            )
          })}
        </ol>
      </div>
    </>
  )
}

export default CarList
