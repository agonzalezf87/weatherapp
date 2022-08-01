import { useContext, useEffect } from "react"
import { WeatherContext } from "../context/WeatherContext"
import { useGeoLocation } from "../hooks/useGeoLocation"

const UI = () => {
  const {
    parameters,
    toggleLang,
    toggleMode,
    toggleUnits
  } = useContext(WeatherContext)
  const {coordinates, getCoordinates} = useGeoLocation()

  const handleLang = () => {
    toggleLang()
  }

  const handleMode = () => {
    toggleMode()
  }

  const handleUnits = () => {
    toggleUnits()
  }

  useEffect(() => {
    getCoordinates()
  }, [])
  


  return (
    <main>
      <section>
        <h1>Weather App</h1>
        <p>Language: {parameters[0].appLang}</p>
        <p>Mode: {parameters[0].appMode}</p>
        <p>Units: {parameters[0].appUnits}</p>
        <div>
          <button onClick={handleLang}>Change Lang</button>
          <button onClick={handleMode}>Change Mode</button>
          <button onClick={handleUnits}>Change Units</button>
        </div>
      </section>
      <section>
        <h2>User GeoLocation</h2>
        {!coordinates.loaded && <p>Loading geolocation..</p>}
        {!!coordinates.loaded && (
          <>
            <p>Latitude: {coordinates.coords.lat}</p>
            <p>Longitude: {coordinates.coords.lon}</p>
          </>
        )}
        {!!coordinates.error && <p>Error {coordinates.error.code}: {coordinates.error.message}</p>}
      </section>
    </main>
  )
}

export { UI }