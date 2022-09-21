import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import SearchModal from './SearchModal'
const SearchBar = ({ map, setMap }) => {
  const [data, setData] = useState([])

  const search = async () => {
    const data = await fetch(`/api/space/v1/spaces?search=${searchInput}&lat=${map.center.lat}&lng=${map.center.lng}`, {
      method: 'GET'
    }).then((res) => res.json())
    if (!data.success) return

    setData(data.data.spaces)
    setShowModal(true)
    // 검색결과페이지를 만드세요 휴-먼
    /*
     * 주소 검색 => 검색 결과 페이지 이동 => 리스트에서 선택 => 선택한 주차장 모달 on
     */
  }
  const [searchInput, setSerchInput] = useState('')
  const [showModal, setShowModal] = useState(false)
  return (
    <>
    <div className="searchBarOUT">
      <div className='searchBar'>
        <input
          type={'text'}
          placeholder='검색'
          name='search'
          autoComplete='on'
          onChange={(e) => setSerchInput(e.target.value)}
        />
        <button>
          <FaSearch onClick={search} />
        </button>
      </div>
    </div>
    <SearchModal setMap={setMap} parkInfo={data} setShowModal={setShowModal} showModal={showModal} />
    </>
  )
}

export default SearchBar
