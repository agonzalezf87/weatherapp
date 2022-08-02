import { useContext } from 'react'
import DetailsStyle from '../styles/Details.module.css'
import { WeatherContext } from '../context/WeatherContext'
import { ResumeCard } from './ResumeCard'
import { getHour, getDayName } from '../services/dateHandling'
import {BsClock, BsMap, BsFillCalendar2DateFill} from 'react-icons/bs'

const Details = ({weather, forecast, variation}) => {
  const {parameters} = useContext(WeatherContext)
  const {appLang} = parameters[0]

  return (
    <div className={DetailsStyle.Details}>
      <div className={DetailsStyle.Details__title}>
        <div className={DetailsStyle.Details__title__icon}>
          {variation === 'time' ? <BsClock /> : variation === 'map' ? <BsMap /> : <BsFillCalendar2DateFill />}
        </div>
        <div className={DetailsStyle.Details__title__text}>{appLang === 'es' ? 'Pronostico Extendido' : 'Detailed Forecast'}</div>
      </div>
      <div className={DetailsStyle.Details__content}>
        <ResumeCard key={weather.weather.dt} title={'Now'} icon={weather.weather[0].icon} alt={weather.weather[0].description} temp={weather.main.temp}/>
        {forecast.slice(0,21).map(key => (
          <ResumeCard key={key.weather[0].dt} title={getHour(key.dt_txt)} icon={key.weather[0].icon} alt={key.weather[0].description} temp={key.main.temp}/>
        ))}
      </div>
    </div>
  )
}

export { Details }