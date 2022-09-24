import { useNavigate } from "react-router-dom"
import Layout from "../../components/Layout"
import { useState, useEffect } from "react"
import moment from "moment"
import Loading from "../../components/Loading"

const OrderStatus = [
  '준비됨',
  '진행중',
  '결제 대기중',
  '결제 완료',
  '취소됨',
  '일부 취소됨',
  '중단됨',
  '만료됨'
]

const ProfitPage = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState()

  const fetchOrder = () =>
    fetch("/api/payments/v1/order")
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setOrders(res.data)
      })

  useEffect(() => {
    fetchOrder()
  }, [])

  if (!orders) return <Loading />
  return (
    <Layout
      title={"수익 내역"}
      buttonShow={false}
      onReturn={() => navigate("/myinfo")}
    >
      { orders.map((item, i) => (
        <div className="historyCard" key={i}>
          <p className="id">{item.id}</p>
          <p>결제 금액: {item.amount}</p>
          <p>{item.recepit}</p>
          <p>상태: {OrderStatus[item.status]}</p>
          <p>결제 수단: {!item.method ? '카드' : '계좌'}</p>
          <p>{moment(item.createdAt).subtract(9, 'h').format('YYYY년 MM월 DD일 hh시 mm분 ss초')}</p>
        </div>
      ))}
    </Layout>
  )
}

export default ProfitPage
