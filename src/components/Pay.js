import { loadBrandPay } from '@tosspayments/brandpay-sdk'
import { useEffect, useState } from 'react'
import Loading from './Loading'

const Pay = ({ userId, orderId, orderName, amount }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [brandPay, setBrandPay] = useState(null)

  useEffect(() => {
    if (!userId || !amount || !orderId || !orderName) return <div>결제 정보가 올바르지 않습니다.</div>
    const importTosspayment = async () =>
      setBrandPay(
        await loadBrandPay(
          process.env.REACT_APP_TOSS_CLIENT,
          'user' + userId,
          process.env.REACT_APP_TOSS_REDIRECT
        )
      )
    importTosspayment()
  }, [])

  useEffect(() => {
    if (brandPay) {
      setIsLoaded(true)
      brandPay.requestPayment({
        amount,
        orderId,
        orderName
      }).then((res) => {
        fetch('/api/payments/v1/order/confirm', 'POST', {
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            orderId,
            amount,
            paymentId: res.paymentId
          })
        })
        window.location.href = '/'
      }).catch((err) => {
        alert('결제가 취소되었습니다.')
        window.location.href = '/'
      })
    }
  }, [brandPay, amount, orderId, orderName])

  if (!isLoaded) return <Loading />

  return <div></div>
}

export default Pay
