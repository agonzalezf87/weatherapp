import { useContext, useEffect } from "react"
import { WeatherContext } from "../context/WeatherContext"
import { useWeatherApi } from "../hooks/useWeatherApi"
import { MdOutlineWarning } from "react-icons/md"
import UIStyle from '../styles/UI.module.css'

const UI = () => {
  const {parameters, weatherData, currCity} = useContext(WeatherContext)
  const {defaultWeather, fetchWeather} = useWeatherApi()
  const {appLang, appUnits} = parameters[0]

  useEffect(() => {
    if (!!weatherData.loading){
      fetchWeather()
    }
    if (!weatherData.loading && !!weatherData.error){
      if (weatherData.error.code === 1 || weatherData.error.code === 0) {
        defaultWeather()
      }
    }
  }, [appLang, appUnits, weatherData])

  if (!!weatherData.loading) {
    return (
      <section className={UIStyle.Loading}>
        <div className={UIStyle.Loader}>
          <div className={UIStyle.Loader__icon}></div>
          <div className={UIStyle.Loader__message}>
            <p>Loading content...</p>
          </div>
        </div>
      </section>
    )
  } else if (!weatherData.loading && !!weatherData.error) {
    return (
      <section className={UIStyle.Error}>
        <div className={UIStyle.Error__icon}><MdOutlineWarning/></div>
        <div className={UIStyle.Error__message}>
          <p>{`Error ${weatherData.error.code}: ${weatherData.error.message}`}</p>
        </div>
      </section>
    )
  }
   else if (!weatherData.loading && !weatherData.error){
    return (
      <section className={UIStyle.UI}>
        <nav className={UIStyle.UI__NavBar}>
          <h1>Weather for {currCity.name}, {currCity.country}</h1>
        </nav>
        <div className={`${UIStyle.UI__WeatherCard} ${UIStyle['UI__WeatherCard--actual']}`}>
          <h3>This will be the current weather card...</h3>
        </div>
      </section>
    )
  }

  
}

export { UI }