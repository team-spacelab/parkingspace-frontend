import '../style/component.scss'

const Layout = ({ title, onSubmit, buttonText, children }) => {
  return (
    <div className='component'>
      <div>
        <p className='goBackBtn' onClick={() => window.history.back()}>
          돌아가기
        </p>
        <h2 className='title'>{title}</h2>
        {children}
      </div>
      <button type='submit' onClick={onSubmit}>
        {buttonText}
      </button>
    </div>
  )
}

export default Layout
