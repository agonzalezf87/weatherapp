import { useContext } from 'react'
import { WeatherContext } from '../context/WeatherContext'
import HeroStyle from '../styles/Hero.module.css'
import { getDayMonth } from '../services/dateHandling'

const Hero = ({data}) => {
  const {parameters, today} = useContext(WeatherContext)
  const {appLang, appUnits} = parameters[0]

  return (
    <div className={HeroStyle.Hero}>
      <div className={HeroStyle.Hero__date}>{getDayMonth(today,appLang)}</div>
      <div className={HeroStyle.Hero__title}>
        {data.name}, {data.sys.country}
      </div>
      <div className={HeroStyle.Hero__temp}>
        <p>{parseInt(data.main.temp)}<span>°{appUnits === 'imperial' ? 'F' : 'C'}</span></p>
      </div>
      <div className={HeroStyle.Hero__condition}>
        <p>{data.weather[0].description}</p>
      </div>
      <div className={HeroStyle.Hero__minMax}>
        <div>Min: {parseInt(data.main.temp_min)}°</div>
        <div>Max: {parseInt(data.main.temp_max)}°</div>
      </div>
    </div>
  )
}

export { Hero }