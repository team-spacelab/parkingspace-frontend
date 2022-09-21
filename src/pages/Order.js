/* global kakao */
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Cookies } from 'react-cookie'
import DatePicker from "react-datepicker"
import toast from 'react-hot-toast'
import "react-datepicker/dist/react-datepicker.css";

const Error = {
  'USER_NOT_FOUND_OR_PASSWORD_INVALID': '계정 정보를 다시 확인해주세요.'
}

const Order = ({ userId, spaceId = 27, zoneId }) => {
  const [space, setSpace] = useState({})
  const [cars, setCars] = useState([])
  const [address, setAddress] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const navigation = useNavigate()
  const fetchSpace = () =>
    fetch(`/api/space/v1/spaces/${spaceId}`)
      .then(res => res.json())
      .then(data => {
        if (!data.success) return toast.error(data.reason)
        setSpace(data.data.space)
      })
  
  const fetchCars = () =>
    fetch(`/api/auth/v1/cars/@me`)
      .then(res => res.json())
      .then(data => {
        if (!data.success) return 
        setCars(data.data.cars)
      })

  const fetchAddress = () => {
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(space.lng, space.lat, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setAddress(result[0].address.address_name)
      }
    })
  }

  useEffect(() => {
    fetchSpace()
    fetchCars()
  }, [])

  useEffect(() => {
    if (!space) return
    fetchAddress()
  }, [space])

  if (!space || !cars) return <></>

  return (
    <>
      <div className='order'>
        <h2>
          주차장 결제를<br />
          진행해주세요
        </h2>
        <p onClick={() => window.history.back()}>돌아가기</p>
        <form>
          <h3>결제할 주차장</h3>
          <p>{space.name} ({address})</p>
          <p></p>
          <label htmlFor='car'>차량</label>
          <select>
            {cars.length < 1 && <option>등록된 차량이 없습니다.</option>}
            {cars.map(car => (
              <option value={car.id}>{car.name}</option>
            ))}
          </select>
          <DatePicker showTimeSelect timeIntervals={10} />
          <div className='button_area'>
            <input type={'submit'} value='로그인'/>
          </div>
        </form>
      </div>
    </>
  )
}

export default Order
