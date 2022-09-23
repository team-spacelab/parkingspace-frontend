import '../style/component.scss'
import { useNavigate } from 'react-router-dom'
const Layout = ({ title, onSubmit, buttonText, children, subLink, onReturn, onDisable, buttonShow = true }) => {
  const navigate = useNavigate()
  const onClick = () => {
    console.log(onReturn)
    if (onReturn) return onReturn()
    navigate('/')
  }

  return (
    <div className='component'>
      <div>
        <p className='goBackBtn' onClick={onClick}>
          돌아가기
        </p>
        <h2 className='title'>{title}</h2>
        {children}
      </div>
      <div style={{ display: buttonShow ? '' : 'none' }}>
        <p className='subLink'>{subLink}</p>
        <button type='submit' className='submit-button' disabled={onDisable} onClick={onSubmit}>
          {buttonText}
        </button>
      </div>
    </div>
  )
}

export default Layout
