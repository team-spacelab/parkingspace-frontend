import '../style/component.scss'
import { Link } from 'react-router-dom'
const Layout = ({ title, onSubmit, buttonText, children, subLink }) => {
  return (
    <div className='component'>
      <div>
        <p className='goBackBtn' onClick={() => window.history.back()}>
          돌아가기
        </p>
        <h2 className='title'>{title}</h2>
        {children}
      </div>
      <div>
        <button type='submit' onClick={onSubmit}>
          {buttonText}
        </button>
        <p className='subLink'>{subLink()}</p>
      </div>
    </div>
  )
}

export default Layout
