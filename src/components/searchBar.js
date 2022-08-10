import { FaSearch, FaFilter } from 'react-icons/fa'
const SearchBar = () => {
  const search = (e) => {}
  return (
    <div className='headers'>
      <input
        type={'text'}
        placeholder='검색'
        name='search'
        autoComplete='on'
        onClick={search}
      />
      <button>
        <FaFilter />
      </button>
      <button>
        <FaSearch />
      </button>
    </div>
  )
}

export default SearchBar
