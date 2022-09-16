import { loadBrandPay } from '@tosspayments/brandpay-sdk'
import { useEffect, useState } from 'react'
import Loading from './loading'

const Pay = ({ userInfo }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [brandPay, setBrandPay] = useState(null)

  console.log(userInfo.data)
  useEffect(() => {
    console.log(process.env.REACT_APP_TOSS_REDIRECT)
    const importTosspayment = async () =>
      setBrandPay(
        await loadBrandPay(
          process.env.REACT_APP_TOSS_CLIENT,
          // 'taehyunlim', //userid
          userInfo.data.id,
          process.env.REACT_APP_TOSS_REDIRECT
        )
      )
    importTosspayment()
  }, [])

  useEffect(() => {
    if (brandPay) {
      setIsLoaded(true)
      brandPay.requestPayment({
        amount: 1000,
        orderId: 'aiowjef',
        orderName: '주차요금',
      })
    }
  }, [brandPay])

  if (!isLoaded) {
    return <Loading />
  }

  return <div></div>
}

export default Pay
