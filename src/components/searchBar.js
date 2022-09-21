import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
const SearchBar = () => {
  const search = async () => {
    await fetch(`/api/space/v1/spaces?search=${searchInput}`, {
      method: 'GET',
    })
    //검색결과페이지를 만드세요 휴-먼
    /*
     * 주소 검색 => 검색 결과 페이지 이동 => 리스트에서 선택 => 선택한 주차장 모달 on
     */
  }
  const [searchInput, setSerchInput] = useState('')
  return (
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
  )
}

export default SearchBar
