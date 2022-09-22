import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import SearchModal from './SearchModal'
const SearchBar = ({ map, setMap }) => {
  const [data, setData] = useState([])

  const onSubmit = async (e) => {
    e.preventDefault()
    const data = await fetch(`/api/space/v1/spaces?search=${searchInput}&lat=${map.center.lat}&lng=${map.center.lng}`, {
      method: 'GET'
    }).then((res) => res.json())
    if (!data.success) return

    setData(data.data.spaces)
    setShowModal(true)
  }
  const [searchInput, setSerchInput] = useState('')
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <div className="searchBarOUT">
        <form className='searchBar' onSubmit={(e) => onSubmit(e)}>
          <input
            type={'text'}
            placeholder='여기를 눌러 주차장을 검색하세요'
            name='search'
            autoComplete='on'
            onChange={(e) => setSerchInput(e.target.value)}
          />
          <button type={'submit'}>
            <FaSearch />
          </button>
        </form>
      </div>
      <SearchModal setMap={setMap} parkInfo={data} setShowModal={setShowModal} showModal={showModal} />
    </>
  )
}

export default SearchBar
