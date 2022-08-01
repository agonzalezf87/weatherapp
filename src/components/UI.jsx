import { useContext } from "react"
import { WeatherContext } from "../context/WeatherContext"

const UI = () => {
  const {
    parameters,
    toggleLang,
    toggleMode,
    toggleUnits
  } = useContext(WeatherContext)

  const handleLang = () => {
    toggleLang()
  }

  const handleMode = () => {
    toggleMode()
  }

  const handleUnits = () => {
    toggleUnits()
  }

  return (
    <main>
      <h1>Weather App</h1>
      <p>Language: {parameters[0].appLang}</p>
      <p>Mode: {parameters[0].appMode}</p>
      <p>Units: {parameters[0].appUnits}</p>
      <div>
        <button onClick={handleLang}>Change Lang</button>
        <button onClick={handleMode}>Change Mode</button>
        <button onClick={handleUnits}>Change Units</button>
      </div>
    </main>
  )
}

export { UI }