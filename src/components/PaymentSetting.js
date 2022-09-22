import { loadBrandPay } from '@tosspayments/brandpay-sdk'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Loading from './Loading'

const PaymentSetting = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [brandPay, setBrandPay] = useState(null)

  useEffect(() => {
    const fetchMe = () =>
      fetch('/api/auth/v1/users/@me')
        .then((res) => res.json())
        .then((data) => {
          if (!data.success) return
          return data.data.id
        })
    
    // if (!userId) window.location.href = '/login'
    const importTosspayment = async () => {
      const userId = await fetchMe()
      setBrandPay(
        await loadBrandPay(
          process.env.REACT_APP_TOSS_CLIENT,
          'user-' + userId,
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
    }
    importTosspayment()
  }, [])

  useEffect(() => {
    if (brandPay) {
      setIsLoaded(true)
      brandPay.openSettings().catch((err) => {
        if (err.code !== 'USER_CANCEL') {
          toast.error('결제 설정을 열 수 없습니다.')
          window.location.href = '/'
        }
        window.location.href = '/'
      })
    }
  }, [brandPay])

  if (!isLoaded) return <Loading />

  return <div></div>
}

export default PaymentSetting
