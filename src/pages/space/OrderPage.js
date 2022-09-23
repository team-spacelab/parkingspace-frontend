/* global kakao */
import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import toast from 'react-hot-toast'
import 'react-datepicker/dist/react-datepicker.css'
import Pay from '../../components/Pay'
import { useLocation } from 'react-router-dom'
import MethodModal from '../../components/MethodModal'
import Loading from '../../components/Loading'
import Layout from '../../components/Layout'

const Error = {
  USER_NOT_FOUND_OR_PASSWORD_INVALID: '계정 정보를 다시 확인해주세요.'
}

const OrderError = {
  USER_POINT_TOO_LOW: '포인트가 부족합니다.',
  SPACE_UNAVAILABLE: '주차 공간을 찾을 수 없습니다.',
  ZONES_UNAVAILABLE: '주차 공간을 찾을 수 없습니다.',
  CAR_UNAVAILABLE: '차량을 찾을 수 없습니다.',
  RESERVE_UNAVAILABLE: '이미 예약되었거나 결제를 대기중입니다.',
  COST_TOO_LOW: '결제 금액이 잘못 되었습니다.'
}

const Order = () => {
  const [space, setSpace] = useState({})
  const [address, setAddress] = useState('')
  const [price, setPrice] = useState(0)
  const [order, setOrder] = useState(false)
  const [userData, setUserData] = useState({})
  const [orderId, setOrderId] = useState('')
  
  // Dates
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

  // Point
  const [point, setPoint] = useState(0)

  // Cars
  const [cars, setCars] = useState()
  const [selectedCar, setSelectedCar] = useState(null)

  // Methods
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
        if (data.data.cars.length > 0) setSelectedCar(data.data.cars[0].id)
      })

  const fetchMe = () =>
    fetch('/api/auth/v1/users/@me')
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) return
        setUserData(data.data)
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
    if (new Date() > date) {
      toast.error('현재 시간보다 이전 시간은 선택할 수 없습니다.')
      return
    }
    if (endDate && date > endDate) {
      toast.error('종료 시간보다 이전 시간을 선택해주세요.')
      return
    }
    setStartDate(date)
  }

  function changeEndDate (date) {
    if (new Date() > date) {
      toast.error('현재 시간보다 이전 시간은 선택할 수 없습니다.')
      return
    }
    if (startDate && date < startDate) {
      toast.error('시작 시간보다 이후 시간을 선택해주세요.')
      return
    }
    setEndDate(date)
  }

  useEffect(() => {
    if (endDate && startDate) {
      setPrice(Math.floor((endDate.getTime() - startDate.getTime()) / (space.timeUnit * 60 * 1000) * space.defaultCost) - point)
    }
  }, [startDate, endDate, space.timeUnit, space.defaultCost, point])

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

  const onSubmit = async () => {
    console.log(userData)
    if (!startDate || !endDate) return toast.error('시작 시간과 종료 시간을 선택해주세요.')
    if (startDate === endDate) return toast.error('시작 시간과 종료 시간이 같습니다.')
    if (!selectedCar) return toast.error('차량을 선택해주세요.')
    if (!selectedMethod) return toast.error('결제 수단을 선택해주세요.')
    if (price < 0) return toast.error('포인트가 결제 금액보다 많습니다.')
    if (point > userData.point) return toast.error('포인트가 부족합니다.')

    // window.location.href = '/'
    const endat = new Date(endDate.getTime() + 32400000)
    const startat = new Date(startDate.getTime() + 32400000)
  
    const res = await fetch('/api/payments/v1/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        point,
        zone: zoneId,
        method: payments.cards.concat(payments.accounts).find((method) => method.id === selectedMethod).accountName ? 1 : 0,
        car: selectedCar,
        startat,
        endat
      })
    })
    const data = await res.json()
    if (!data.success) return toast.error(OrderError[data.reason])
    if (data.data.orderAmount !== price) {
      await fetch('/api/payments/v1/order/' + data.data.orderId, {
        method: 'DELETE'
      })
      return toast.error('결제 금액이 일치하지 않습니다.')
    }


    setOrderId(data.data.orderId)
    setOrder(true)
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
      <Layout buttonText={price + '원 결제'} onSubmit={() => onSubmit()} title={'주차장을 결제하기 위해\n아래 정보를 입력해주세요.'}>
        <form onSubmit={onSubmit}>
          <h3>결제할 주차장</h3>
          <p>{space.name} ({address})</p>
          
          <label htmlFor='car'>차량</label><br/>
          <select onChange={(e) => setCars(e.target.value)}>
            {cars.length < 1 && <option disabled>등록된 차량이 없습니다.</option>}
            {cars.length > 0 ? cars.map(car => (
              <option value={car.id}>{car.alias} ({car.num})</option>
            )) : null}
          </select>

          <DatePicker onChange={changeStartDate} selected={startDate} showTimeSelect dateFormat="Pp" timeIntervals={10} />
          <DatePicker onChange={changeEndDate} selected={endDate} showTimeSelect dateFormat="Pp" timeIntervals={10} />
          <button type={'button'} onClick={() => setShowMethodModal(true)}>결제 수단</button>
          <div className='button_area'>
            {order && <Pay amount={price} orderName={'[파킹스페이스] ' + space.name} orderId={orderId} userId={userData.id} method={selectedMethod} />}
          </div>
        </form>
      </Layout>
    </>
  )
}

export default Order
