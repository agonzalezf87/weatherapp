import { useContext } from "react"
import { WeatherContext } from "../context/WeatherContext"
import MenuStyle from '../styles/Menu.module.css'
import {TbLanguage, TbCirclePlus, TbCircleMinus, TbSearch, TbTemperatureCelsius, TbTemperatureFahrenheit} from 'react-icons/tb'

const Menu = () => {
  const {
    parameters,
    toggleLang,
    toggleUnits
  } = useContext(WeatherContext)
  const {appUnits} = parameters[0]

  const handleLang = () => {
    toggleLang()
  }

  const handleUnits = () => {
    toggleUnits()
  }

  return (
    <nav className={MenuStyle.Menu}>
      <div className={MenuStyle.Menu__item}>
        <button className={MenuStyle.Menu__CallToAction}>
          <TbSearch />
        </button>
      </div>
      <div className={MenuStyle.Menu__item}>
        <button onClick={handleLang} className={MenuStyle.Menu__CallToAction}>
          <TbLanguage />
        </button>
      </div>
      <div className={MenuStyle.Menu__item}>
        <button onClick={handleUnits} className={MenuStyle.Menu__CallToAction}>
          {appUnits === 'metric' ? <TbTemperatureCelsius /> : <TbTemperatureFahrenheit />}
        </button>
      </div>
      <div className={MenuStyle.Menu__item}>
        <button className={MenuStyle.Menu__CallToAction}>
          <TbCirclePlus />
        </button>
      </div>
    </nav>
  )
}

export { Menu }