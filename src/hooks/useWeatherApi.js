import { useContext, useEffect } from "react"
import { WeatherContext } from "../context/WeatherContext"
import axios from "axios"

const apiURL = import.meta.env.VITE_API_URL
const apiKey = import.meta.env.VITE_API_KEY

const useWeatherApi = () => {
  const {parameters, storeWeatherData, storeCurrCity} = useContext(WeatherContext)
  const {defaultLocation, appLang, appUnits} = parameters[0]

  const {defLat, defLon} = defaultLocation
  const exclude = 'minutely'
  
  // This function will launch if user blocks location or an error occur in the process
  const defaultWeather = () => {
    try {
      const owInstance = axios.create({
        baseURL: `${apiURL}/onecall`,
        params: {
          'appid': apiKey,
          'lat': defLat,
          'lon': defLon,
          'units': appUnits,
          'lang': appLang,
          'exclude': exclude
        }
      })
  
      owInstance.get()
      .then(res => {
        if(res.status === 200) {
          storeWeatherData({
            loading: false,
            data: res.data
          })

          currCityData(res.data.lat, res.data.lon)
        } else {
          storeWeatherData({
            loading: false,
            error: {
              code: res.status,
              message: res.statusText
            }
          })
        }
      })
      .catch(err =>{
        storeWeatherData({
          loading: false,
          error: {
            code: 2,
            message: err
          }
        })
      })
    } catch (error) {
      storeWeatherData({
        loading: false,
        error: {
          code: 2,
          message: error
        }
      })
    }
  }

  // This fucntion will fetch weather for current location
  const fetchWeather = () => {
    if (!navigator.geolocation) {
      storeWeatherData({
        loading: false,
        error: {
          code: 0,
          message: appLang === 'es' ? 'Geolocalización no soportada' : 'Geolocation not supported'
        }
      })
    } else {
      try {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude
            const lon = position.coords.longitude
  
            const owInstance = axios.create({
              baseURL: `${apiURL}/onecall`,
              params: {
                'appid': apiKey,
                'lat': lat,
                'lon': lon,
                'units': appUnits,
                'lang': appLang,
                'exclude': exclude
              }
            })
  
            owInstance.get()
            .then(res => {
              if(res.status === 200) {
                storeWeatherData({
                  loading: false,
                  data: res.data
                })

                currCityData(res.data.lat, res.data.lon)
              } else {
                storeWeatherData({
                  loading: false,
                  error: {
                    code: res.status,
                    message: res.statusText
                  }
                })
              }
            })
            .catch(err =>{
              storeWeatherData({
                loading: false,
                error: {
                  code: 2,
                  message: err
                }
              })
            })
  
          },
          (err) => {
            storeWeatherData({
              loading: false,
              error: {
                code: parseInt(err.code),
                message: err.message
              }
            })
          },
          {enableHighAccuracy: true}
        )
      } catch (error) {
        storeWeatherData({
          loading: false,
          error: {
            code: 2,
            message: error
          }
        })
      }
    }
  }
  
  // This function calls the current city data and store city and country
  const currCityData = (lat, lon) => {
    const owInstance = axios.create({
      baseURL: `${apiURL}/weather`,
      params: {
        'appid': apiKey,
        'lat': lat,
        'lon':  lon,
        'units': appUnits,
        'lang': appLang
      }
    })

    owInstance.get()
    .then(res => {
      if(res.status === 200) {
        storeCurrCity(res.data.name, res.data.sys.country)
      }
      else {
        storeCurrCity({
          error: res.statusText
        })
      }
    })
    .catch(error => {
      storeCurrCity({
        error: error
      })
    })
  }

  return { defaultWeather, fetchWeather}
}

export { useWeatherApi }