import { useContext, useEffect, useState } from "react"
import { WeatherContext } from "../context/WeatherContext"
import axios from "axios"
import UIStyle from '../styles/UI.module.css'
import testWeather from "../testWeather"
import testForecast from "../testForecast"
import { Hero } from './Hero'
import { Details } from './Details'

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
  const [weather, setWeather] = useState()
  const [forecast, setForecast] = useState()
  
  const handleLang = () => {
    toggleLang()
  }

  const handleMode = () => {
    toggleMode()
  }

  const handleUnits = () => {
    toggleUnits()
  }

  /* useEffect(() =>{
    setTimeout(() => {
      setWeather(testWeather)
      setForecast(testForecast)
    }, 1500)
  }, []) */
  
  useEffect(() => {
    if(!navigator.geolocation) {
      setWData({
        error: {
          code: 0,
          message:  "Geolocation not supported"
        }
      })

      setForecast({
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
          const wtInstance = axios.create({
            baseURL: `${apiURL}weather`,
            params: {
              'appid': apiKey,
              'lat': lat,
              'lon': lon,
              'units': appUnits,
              'lang': appLang
            }
          })

          const fcInstance = axios.create({
            baseURL: `${apiURL}forecast`,
            params: {
              'appid': apiKey,
              'lat': lat,
              'lon': lon,
              'units': appUnits,
              'lang': appLang
            }
          })

          wtInstance.get()
          .then(res => {
            if(res.status === 200) {
              setWeather(res.data)
            } else {
              setWeather({
                error: {
                  code: res.status,
                  text: res.statusText
                }
              })
            }
          })

          fcInstance.get()
          .then(res => {
            if(res.status === 200) {
              setForecast(res.data)
            } else {
              setForecast({
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
  }, [appUnits, appLang])

  if (weather === undefined) {
    return (
      <main className={appMode === 'day' ? UIStyle.day : UIStyle.night}>
        <section className={UIStyle.container}>
          <div className={UIStyle.loader}>
            <div className={UIStyle.loader__spinner}></div>
            <div className={UIStyle.loader__text}>Loading data...</div>
          </div>
        </section>
      </main>
    )
  } else if (forecast === undefined){
    return (
      <main className={appMode === 'day' ? UIStyle.day : UIStyle.night}>
        <section className={UIStyle.container}>
          <div className={UIStyle.loader}>
            <div className={UIStyle.loader__spinner}></div>
            <div className={UIStyle.loader__text}>Loading data...</div>
          </div>
        </section>
      </main>
    )
  } else if (weather !== undefined && !!weather.error) {
    <main className={appMode === 'day' ? UIStyle.day : UIStyle.night}>
      <section className={UIStyle.container}>
        <div className={UIStyle.error}>
          <p>{`Error ${weather.error.code}: ${weather.error.text}`}</p>
        </div>
      </section>
    </main>
  } else if (forecast !== undefined && !!forecast.error ) {
    <main className={appMode === 'day' ? UIStyle.day : UIStyle.night}>
      <section className={UIStyle.container}>
        <div className={UIStyle.error}>
          <p>{`Error ${forecast.error.code}: ${forecast.error.text}`}</p>
        </div>
      </section>
    </main>
  } else if (weather !== undefined && forecast !== undefined) {
    return (
      <main className={appMode === 'day' ? UIStyle.day : UIStyle.night}>
        <section className={UIStyle.container}>
          <Hero data={weather} />
          <Details weather={weather} forecast={forecast.list} variation={'time'}/>
        </section>
      </main>
    )
  }
}

export { UI }