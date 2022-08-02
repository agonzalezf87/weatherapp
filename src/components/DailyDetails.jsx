import {  useContext, useEffect, useState } from "react"
import { WeatherContext } from "../context/WeatherContext"
import { getDay, getTsDay } from "../services/dateHandling"
import { ResumeCard } from "./ResumeCard"
import DDetailsStyle from '../styles/DailyDetails.module.css'
import {BsFillCalendar2DateFill} from 'react-icons/bs'

const DailyDetails = ({forecast}) => {
  const [daysData, setDaysData] = useState([])
  const {parameters, today} = useContext(WeatherContext)
  const {appLang} = parameters[0]

  useEffect(() => {
    let currDay = 0
    let result = []

    forecast.forEach(key => {
      if (!result.find(reskey => getDay(reskey.dt_txt) === getDay(key.dt_txt))) {
        result.push(key)
        currDay = getDay(key.dt_txt)
      }
    })

    setDaysData(result)
    
  }, [])

  return (
    <div className={DDetailsStyle.DayDetails}>
      <div className={DDetailsStyle.DayDetails__title}>
        <div className={DDetailsStyle.DayDetails__title__icon}>
          <BsFillCalendar2DateFill />
        </div>
        <div className={DDetailsStyle.DayDetails__title__text}>{appLang === 'es' ? 'Pronostico Diario' : 'Daily Forecast'}</div>
      </div>
      <div className={DDetailsStyle.DayDetails__content}>
        {daysData.slice(0,21).map(key => (
          <ResumeCard key={key.weather[0].dt} title={getDay(key.dt_txt) === getTsDay(today) && appLang === 'es' ? 'Hoy' : getDay(key.dt_txt) === getTsDay(today) && appLang === 'en' ? 'Today' : getDay(key.dt_txt)} icon={key.weather[0].icon} alt={key.weather[0].description} temp={key.main.temp} minTemp={key.main.temp_min} maxTemp={key.main.temp_max} orientation={'vertical'}/>
        ))}
      </div>
    </div>
  )
}

export { DailyDetails }