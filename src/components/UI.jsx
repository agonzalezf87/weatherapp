import { useContext, useEffect, useState } from "react"
import { WeatherContext } from "../context/WeatherContext"
import axios from "axios"
import uiStyles from '../styles/UI.module.css'
import testWeather from "../testWeather"

const apiURL = import.meta.env.VITE_API_URL
const apiKey = import.meta.env.VITE_API_KEY

const UI = () => {
  const {
    parameters,
    toggleLang,
    toggleMode,
    toggleUnits
  } = useContext(WeatherContext)
  const {appLang, appMode, appUnits} = parameters[0]
  const [wData, setWData] = useState()
  
  const handleLang = () => {
    toggleLang()
  }

  const handleMode = () => {
    toggleMode()
  }

  const handleUnits = () => {
    toggleUnits()
  }

  useEffect(() =>{
    setTimeout(() => {
      setWData(testWeather)
    }, 1500)
  }, [])
  
  /* useEffect(() => {
    if(!navigator.geolocation) {
      setWData({
        error: {
          code: 0,
          message:  "Geolocation not supported"
        }
      })
    } else {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude
          const lon = pos.coords.longitude
          const apiInstance = axios.create({
            baseURL: apiURL,
            params: {
              'appid' : apiKey,
              'lat': lat,
              'lon': lon,
              'units': appUnits,
            }
          })

          apiInstance.get()
          .then(res => {
            if(res.status === 200) {
              setWData(res.data)
            } else {
              setWData({
                error: {
                  code: res.status,
                  text: res.statusText
                }
              })
            }
          })
        }
      )
    }
  }, [appUnits]) */
  
  if (wData === undefined) {
    return (
      <main className={appMode === 'day' ? uiStyles.day : uiStyles.night}>
        <section className={uiStyles.container}>
          <div className={uiStyles.loader}>
            <div className={uiStyles.loader__spinner}></div>
            <div className={uiStyles.loader__text}>Loading data...</div>
          </div>
        </section>
      </main>
    )
  }else if (wData !== undefined && !!wData.error) {
    <main className={appMode === 'day' ? uiStyles.day : uiStyles.night}>
      <section className={uiStyles.container}>
        <div className={uiStyles.error}>
          <p>error</p>
        </div>
      </section>
    </main>
  } else if (wData !== undefined) {
    return (
      <main className={appMode === 'day' ? uiStyles.day : uiStyles.night}>
        <section className={uiStyles.container}>
          <div className={uiStyles.Hero}>
            <h2>{wData[0].city.name}, {wData[0].city.country}</h2>
            <div className={uiStyles.Hero__temp}>
              <p>{parseInt(wData[0].list[0].main.temp)}<span>°{appUnits === 'imperial' ? 'F' : 'C'}</span></p>
            </div>
            <div className={uiStyles.Hero__condition}>
              <p>{wData[0].list[0].weather[0].description}</p>
            </div>
            <div className={uiStyles.Hero__minMax}>
              <div>Min: {parseInt(wData[0].list[0].main.temp_min)}°</div>
              <div>Max: {parseInt(wData[0].list[0].main.temp_max)}°</div>
            </div>
          </div>
          <div>
            <button onClick={handleLang}>{appLang === 'es' ? 'Idioma' : 'Change Language'}</button>
            <button onClick={handleMode}>{appLang === 'es' ? 'Tema' : 'Mode'}</button>
            <button onClick={handleUnits}>{appLang === 'es' ? 'Métrico' : 'Imperial'}</button>
          </div>
        </section>
      </main>
    )
  }
}

export { UI }