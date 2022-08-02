import TopBarStyle from '../styles/TopBar.module.css'
import { SearchForm } from './SearchForm'
import { Menu } from './Menu'

const TopBar = () => {
  return (
    <div className={TopBarStyle.TopBar}>
      <SearchForm />
      <Menu />
    </div>
  )
}

export { TopBar }