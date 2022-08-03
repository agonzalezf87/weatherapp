import { createContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const WeatherContext = createContext()

const WeatherProvider = (props) => {
  const [parameters, setParameters] = useLocalStorage('WeatherApp_V1', [{
    appLang: 'en',
    appMode: 'day',
    appUnits: 'imperial',
    savedCoords: []
  }])
  const [weatherData, setWeatherData] = useState()
  const [forecastData, setForecastData] = useState()
  
  const [today, setToday] = useState(Date.now())

  const toggleLang = () => {
    const newLang = [...parameters]
    newLang[0].appLang === 'es' ? newLang[0].appLang ='en' : newLang[0].appLang = 'es'
    setParameters(newLang)
  }

  const toggleUnits = () => {
    const newUnits = [...parameters]
    newUnits[0].appUnits === 'imperial' ? newUnits[0].appUnits ='metric' : newUnits[0].appUnits = 'imperial'
    setParameters(newUnits)
  }

  const storeWeatherData = (data) => {
    setWeatherData(data)
  }

  const storeForecastData = (data) => {
    setForecastData(data)
  }

  return (
    <WeatherContext.Provider value={{
      parameters,
      today,
      weatherData,
      forecastData,
      toggleLang,
      toggleUnits,
      storeWeatherData,
      storeForecastData
    }}>
      {props.children}
    </WeatherContext.Provider>
  )
}

export { WeatherContext, WeatherProvider }