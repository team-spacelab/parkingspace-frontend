import '../style/component.scss'

const Component = ({ title, children }) => {
  return (
    <div className='component'>
      <h2>{title}</h2>
      <p onClick={() => window.history.back()}>돌아가기</p>
      {children}
    </div>
  )
}

export default Component
