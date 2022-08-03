const getDayName = (code, lang) => {
  const date = new Date(code)
  const day = date.getDay()
  switch(day) {
    case 0:
      return lang === 'es' ? 'Dom' : 'Sun'
    case 1:
      return lang === 'es' ? 'Lun' : 'Mon'
    case 2:
      return lang === 'es' ? 'Mar' : 'Tue'
    case 3:
      return lang === 'es' ? 'Mie' : 'Wed'
    case 4:
      return lang === 'es' ? 'Jue' : 'Thu'
    case 5:
      return lang === 'es' ? 'Vie' : 'Fri'
    case 6:
      return lang === 'es' ? 'Sab' : 'Sat'
  }
}

const setDate = (variable) => {
  const t = variable.split(/[- :]/)
  const d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
  const date = new Date(d)
  return date
}

const getDay = (code) => {
  const date = setDate(code)
  return date.getDate()
}

const getTsDay = (code) => {
  const date = new Date(code)
  return date.getDate()
}

const getHour = (code) => {
  const date = setDate(code)
  return date.getHours() === 0 ? '00' : date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
}

const getMonth =(date, lang) => {
  const month = date.getMonth()

  switch (month) {
    case 1:
      return lang === 'es' ? 'Enero' : 'January'
    case 2:
      return lang === 'es' ? 'Febrero' : 'February'
    case 3:
      return lang === 'es' ? 'Marzo' : 'March'
    case 4:
      return lang === 'es' ? 'Abril' : 'April'
    case 5:
      return lang === 'es' ? 'Mayo' : 'May'
    case 6:
      return lang === 'es' ? 'Junio' : 'June'
    case 7:
      return lang === 'es' ? 'Julio' : 'July'
    case 8:
      return lang === 'es' ? 'Agosto' : 'Agugust'
    case 9:
      return lang === 'es' ? 'Septiembre' : 'September'
    case 10:
      return lang === 'es' ? 'Octubre' : 'October'
    case 11:
      return lang === 'es' ? 'Noviembre' : 'November'
    case 12:
      return lang === 'es' ? 'Diciembre' : 'December'
  }
}

const getDayMonth = (date, language) => {
  const today = new Date(date)
  return language === 'es' ? `${today.getDate()} ${getMonth(today)} ${today.getUTCFullYear()}` : `${getMonth(today, language)} ${today.getDate()} ${today.getUTCFullYear()}`
} 

export {getDay, getDayName, getHour, getDayMonth, getTsDay}