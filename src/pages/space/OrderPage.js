/* global kakao */
import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import toast from 'react-hot-toast'
import 'react-datepicker/dist/react-datepicker.css'
import Pay from '../../components/Pay'
import { useLocation } from 'react-router-dom'
import MethodModal from '../../components/MethodModal'
import Loading from '../../components/Loading'

const Error = {
  USER_NOT_FOUND_OR_PASSWORD_INVALID: '계정 정보를 다시 확인해주세요.'
}

const Order = () => {
  const [space, setSpace] = useState({})
  const [cars, setCars] = useState([])
  const [address, setAddress] = useState('')
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [price, setPrice] = useState(0)
  const [order, setOrder] = useState(false)
  const [userData, setUserData] = useState({})
  const [payments, setPayments] = useState({})
  const [showMethodModal, setShowMethodModal] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState(null)
  const location = useLocation()
  const { spaceId, zoneId } = location.state

  const fetchSpace = () =>
    fetch(`/api/space/v1/spaces/${spaceId}`)
      .then(res => res.json())
      .then(data => {
        if (!data.success) return toast.error(data.reason)
        setSpace(data.data.space)
      })

  const fetchCars = () =>
    fetch('/api/auth/v1/cars/@me')
      .then(res => res.json())
      .then(data => {
        if (!data.success) return
        setCars(data.data.cars)
      })

  const fetchMe = () =>
    fetch('/api/auth/v1/users/@me')
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) return
        setUserData(data.data.success)
      })
  
  const fetchMethod = () =>
    fetch('/api/payments/v1/order/payments')
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) return
        setPayments(data.data)
        setSelectedMethod(data.data.selectedMethodId)
      })

  const fetchAddress = () => {
    const geocoder = new kakao.maps.services.Geocoder()
    geocoder.coord2Address(space.lng, space.lat, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setAddress(result[0].address.address_name)
      }
    })
  }

  function changeStartDate (date) {
    setStartDate(date)
    setPrice(Math.floor((endDate.getTime() - startDate.getTime()) / (space.timeUnit * 60 * 1000) * space.defaultCost))
  }

  function changeEndDate (date) {
    setEndDate(date)
    setPrice(Math.floor((endDate.getTime() - startDate.getTime()) / (space.timeUnit * 60 * 1000) * space.defaultCost))
  }

  useEffect(() => {
    fetchSpace()
    fetchCars()
    fetchMe()
    fetchMethod()
  }, [])

  useEffect(() => {
    if (!space) return
    fetchAddress()
  }, [space])

  if (!space || !cars || !payments || !address) return <Loading />

  const onSubmit = async (e) => {
    e.preventDefault()
    
    const res = await fetch('/api/payment/v1/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({

        zoneId,
        carId: e.target.car.value,
        startat: startDate,
        endat: endDate,
        price
      })
    })
  }

  return (
    <>
      <MethodModal 
        methods={payments}
        setShowModal={setShowMethodModal}
        showModal={showMethodModal}
        setMethod={setSelectedMethod}
        selectedMethod={selectedMethod}
      />
      <div className='order'>
        <h2>
          주차장 결제를<br />
          진행해주세요
        </h2>
        <p onClick={() => window.history.back()}>돌아가기</p>
        <form onSubmit={onSubmit}>
          <h3>결제할 주차장</h3>
          <p>{space.name} ({address})</p>
          
          <label htmlFor='car'>차량</label><br/>
          <select>
            {cars.length < 1 && <option>등록된 차량이 없습니다.</option>}
            {cars.map(car => (
              <option value={car.id}>{car.alias} ({car.num})</option>
            ))}
          </select>

          <DatePicker onChange={changeStartDate} selected={startDate} showTimeSelect dateFormat="Pp" timeIntervals={10} />
          <DatePicker onChange={changeEndDate} selected={endDate} showTimeSelect dateFormat="Pp" timeIntervals={10} />
          <button type={'button'} onClick={() => setShowMethodModal(true)}>결제 단수</button>
          <div className='button_area'>
            <input onClick={() => setOrder(true)} disabled={!price} style={!price ? { backgroundColor: '#ccc' } : {}} type={'submit'} value={price + '원 결제'}/>
            {order && <Pay amount={price} orderName={'[파킹스페이스] ' + space.name} userId={userData.id}  />}
          </div>
        </form>
      </div>
    </>
  )
}

export default Order
