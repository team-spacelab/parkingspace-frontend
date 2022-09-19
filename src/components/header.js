import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='header'>
      <Link
        to='/'
        style={{
          textDecoration: 'none',
        }}
      >
        <h2>Parking Space</h2>
      </Link>
    </div>
  )
}

export default Header
