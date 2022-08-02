import { FaSearch, FaFilter } from "react-icons/fa"
const Header = () => {
	return (
		<div className="headers">
			<input type={"text"} placeholder="검색" name="search" autoComplete="on" />
			<button><FaFilter/></button>
			<button><FaSearch/></button>
		</div>
	)
}

export default Header