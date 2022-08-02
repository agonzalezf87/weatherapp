import { BiSearchAlt } from 'react-icons/bi'
import SFStyle from '../styles/SearchForm.module.css'

const SearchForm = () => {
  return (
    <div className={SFStyle.SearchForm}>
      <div className={SFStyle.SearchForm__wrapper}>
        <BiSearchAlt />
        <input type="text" placeholder='Search City'/>
      </div>
    </div>
  )
}

export { SearchForm }