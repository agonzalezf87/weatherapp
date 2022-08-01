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

  const toggleLang = () => {
    const newLang = [...parameters]
    newLang[0].appLang === 'es' ? newLang[0].appLang ='en' : newLang[0].appLang = 'es'
    setParameters(newLang)
  }

  const toggleMode = () => {
    const newMode = [...parameters]
    newMode[0].appMode === 'day' ? newMode[0].appMode ='night' : newMode[0].appMode = 'day'
    setParameters(newMode)
  }

  const toggleUnits = () => {
    const newUnits = [...parameters]
    newUnits[0].appUnits === 'imperial' ? newUnits[0].appUnits ='metric' : newUnits[0].appUnits = 'imperial'
    setParameters(newUnits)
  }

  return (
    <WeatherContext.Provider value={{
      parameters,
      toggleLang,
      toggleMode,
      toggleUnits
    }}>
      {props.children}
    </WeatherContext.Provider>
  )
}

export { WeatherContext, WeatherProvider }