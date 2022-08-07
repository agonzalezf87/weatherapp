import { createContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const WeatherContext = createContext()

const WeatherProvider = (props) => {
  const [parameters, setParameters] = useLocalStorage('WeatherApp_V2', [{
    appLang: 'es',
    appUnits: 'metric',
    defaultLocation: {
      defLat: 19.25,
      defLon: -99.1667
    },
    savedLocations: []
  }])
  const [weatherData, setWeatherData] = useState({
    loading: true
  })
  const [currCity, setCurrCity] = useState({})
  
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
  
  const storeCurrCity = (cty, ctry) => {
    setCurrCity({
      name: cty,
      country: ctry
    })
  } 

  return (
    <WeatherContext.Provider value={{
      parameters,
      today,
      weatherData,
      currCity,
      toggleLang,
      toggleUnits,
      storeWeatherData,
      storeCurrCity
    }}>
      {props.children}
    </WeatherContext.Provider>
  )
}

export { WeatherContext, WeatherProvider }