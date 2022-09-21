import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='header'>
      <Link
        to='/'
        style={{
          textDecoration: 'none'
        }}
      >
        <p>Parking Space</p>
      </Link>
    </div>
  )
}

export default Header
