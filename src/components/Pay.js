import { loadBrandPay } from '@tosspayments/brandpay-sdk'
import { useEffect, useState } from 'react'
import Loading from './Loading'
import toast from 'react-hot-toast'

const confirmError = {
  'ORDER_NOTFOUND': '주문을 찾을 수 없습니다.',
  'ORDER_UNAVAILABLE': '주문을 찾을 수 없습니다.',
  'ORDER_ALREADY_CONFIRMED': '이미 결제가 완료된 주문입니다.',
  'ORDER_TEMPARING': '주문을 찾을 수 없습니다.'
}

const Pay = ({ userId, orderId, orderName, amount, method }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [brandPay, setBrandPay] = useState(null)

  useEffect(() => {
    if (!userId || !amount || !orderId || !orderName) return <div>결제 정보가 올바르지 않습니다.</div>
    const importTosspayment = async () =>
      setBrandPay(
        await loadBrandPay(
          process.env.REACT_APP_TOSS_CLIENT,
          'user' + userId,
          {
            rediectUrl: process.env.REACT_APP_TOSS_REDIRECT,
            ui: {
              highlightColor: '#8254C4',
              labels: {
                oneTouchPay: 'ParkingPay'
              }
            }
          }
        )
      )
    importTosspayment()
  }, [amount, orderId, orderName, userId])

  useEffect(() => {
    if (brandPay) {
      setIsLoaded(true)
      brandPay.requestPayment({
        amount,
        orderId,
        orderName,
        methodId: method
      }).then(async (res) => {
        const response = await fetch('/api/payments/v1/order/confirm', 'POST', {
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            orderId,
            amount,
            paymentId: res.paymentId
          })
        })
        const data = await response.json()
        if (data.success) {
          toast.success('결제가 완료되었습니다.')
          window.location.href = '/myinfo'
        } else {
          toast.error(confirmError[data.reason] || '결제를 완료할 수 없습니다.')
          window.location.href = '/'
        }
      }).catch(async (err) => {
        if (err.code === 'USER_CANCEL') {
          toast.error('결제를 취소했습니다.')
        }
        await fetch('/api/payments/v1/order/' + orderId, 'DELETE')
        window.location.href = '/'
      })
    }
  }, [brandPay, amount, orderId, orderName])

  if (!isLoaded) return <Loading />

  return <div></div>
}

export default Pay
