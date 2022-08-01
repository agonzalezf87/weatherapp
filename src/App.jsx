import { useContext } from 'react'
import { WeatherProvider } from './context/WeatherContext'
import { UI } from './components/UI'

function App() {
  return (
    <WeatherProvider>
      <UI />
    </WeatherProvider>
  )
}

export { App }