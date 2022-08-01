import { useContext } from 'react'
import { WeatherContext } from '../context/WeatherContext'
import HeroStyle from '../styles/Hero.module.css'

const Hero = ({data}) => {
  const {parameters} = useContext(WeatherContext)
  const {appUnits} = parameters[0]
  return (
    <div className={HeroStyle.Hero}>
      <h2>{data.city.name}, {data.city.country}</h2>
      <div className={HeroStyle.Hero__temp}>
        <p>{parseInt(data.list[0].main.temp)}<span>°{appUnits === 'imperial' ? 'F' : 'C'}</span></p>
      </div>
      <div className={HeroStyle.Hero__condition}>
        <p>{data.list[0].weather[0].description}</p>
      </div>
      <div className={HeroStyle.Hero__minMax}>
        <div>Min: {parseInt(data.list[0].main.temp_min)}°</div>
        <div>Max: {parseInt(data.list[0].main.temp_max)}°</div>
      </div>
    </div>
  )
}

export { Hero }