import { useEffect, useState } from "react";

const useGeoLocation = () => {
  const [coordinates, setCoordinates] = useState({
    loaded: false,
    coords: {
      lat: 0,
      lon: 0
    }
  })

  const onSuccess = (position) => {
    const crd = position.coords
    setCoordinates({
      loaded: true,
      coords: {
        lat: crd.latitude,
        lon: crd.longitude
      }
    })
  }

  const onError = (err) => {
    setCoordinates({
      error: {
        code: err.code,
        message: err.text
      }
    })
  }

  const getCoordinates = () => {
    if (!!navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy: true})
    } else {
      setCoordinates({
        error: {
          code: 0,
          message: 'Geolocation not supported'
        }
      })
    }
  }

  return {coordinates, getCoordinates}
}

export { useGeoLocation }