import { useContext, useEffect, useState } from "react"
import { WeatherContext } from "../context/WeatherContext"
import axios from "axios"
import UIStyle from '../styles/UI.module.css'
import { Hero } from './Hero'
import { Details } from './Details'
import { DailyDetails } from "./DailyDetails"
import { Menu } from './Menu'

const apiURL = import.meta.env.VITE_API_URL
const apiKey = import.meta.env.VITE_API_KEY

const UI = () => {
  const {
    parameters,
    weatherData,
    forecastData,
    storeForecastData,
    storeWeatherData
  } = useContext(WeatherContext)
  const {appLang, appMode, appUnits} = parameters[0]
  
  useEffect(() => {
    if(!navigator.geolocation) {
      storeWeatherData({
        error: {
          code: 0,
          message:  "Geolocation not supported"
        }
      })

      storeForecastData({
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
              storeWeatherData(res.data)
            } else {
              storeWeatherData({
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
              storeForecastData(res.data)
            } else {
              storeForecastData({
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
  }, [appLang, appUnits])

  /* useEffect(() => {
    if (weather !== undefined && forecast !== undefined) {
      console.log(today)
    }
  }) */

  if (weatherData === undefined) {
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
  } else if (forecastData === undefined){
    return (
      <main>
        <section className={UIStyle.container}>
          <div className={UIStyle.loader}>
            <div className={UIStyle.loader__spinner}></div>
            <div className={UIStyle.loader__text}>Loading data...</div>
          </div>
        </section>
      </main>
    )
  } else if (weatherData !== undefined && !!weatherData.error) {
    <main>
      <section className={UIStyle.container}>
        <div className={UIStyle.error}>
          <p>{`Error ${weatherData.error.code}: ${weatherData.error.text}`}</p>
        </div>
      </section>
    </main>
  } else if (forecastData !== undefined && !!forecastData.error ) {
    <main>
      <section className={UIStyle.container}>
        <div className={UIStyle.error}>
          <p>{`Error ${forecastData.error.code}: ${forecastData.error.text}`}</p>
        </div>
      </section>
    </main>
  } else if (weatherData !== undefined && forecastData !== undefined) {
    return (
      <main>
        <div className={UIStyle.shadow}>
          <section className={weatherData.dt < weatherData.sys.sunset && weatherData.dt > weatherData.sys.sunrise ? UIStyle.Container__day : UIStyle.Container__night}>
            <Menu />
            <Hero data={weatherData} />
            <Details weather={weatherData} forecast={forecastData.list} variation={'time'}/>
            <DailyDetails weather={weatherData} forecast={forecastData.list} />
          </section>
        </div>
      </main>
    )
  }
}

export { UI }