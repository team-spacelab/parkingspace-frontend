import '../style/component.scss'

const Component = ({ title, children }) => {
  return (
    <div className='component'>
      <p className='goBackBtn' onClick={() => window.history.back()}>
        돌아가기
      </p>
      <h2 className='title'>{title}</h2>
      {children}
    </div>
  )
}

export default Component
