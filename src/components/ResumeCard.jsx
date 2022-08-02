import ResumeCardStyle from '../styles/ResumeCard.module.css'

const ResumeCard = ({title, icon, alt, temp, minTemp, maxTemp, orientation}) => {
  switch (orientation) {
    case 'horizontal':
      return (
        <div className={ResumeCardStyle.ResumeCard}>
          <div className={ResumeCardStyle.ResumeCard__title}>
            {title}
          </div>
          <div className={ResumeCardStyle.ResumeCard__icon}>
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={alt} height='56px' />
          </div>
          <div className={ResumeCardStyle.ResumeCard__weather}>
            {parseInt(temp)}°
          </div>
        </div>
      )
    case 'vertical':
      return (
        <div className={ResumeCardStyle.ResumeCardVert}>
          <div className={ResumeCardStyle.ResumeCardVert__title}>
            {title}
          </div>
          <div className={ResumeCardStyle.ResumeCardVert__icon}>
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={alt} height='64px' />
          </div>
          <div className={ResumeCardStyle.ResumeCardVert__weather}>
            {parseInt(temp)}°
          </div>
          <div className={ResumeCardStyle.ResumeCardVert__minTemp}>
            {parseInt(minTemp)}°
          </div>
          <div className={ResumeCardStyle.ResumeCardVert__minmax}>
            <div className={ResumeCardStyle.ResumeCardVert__minmax__wrapper}>
              <div className={ResumeCardStyle.ResumeCardVert__minmax__content}>
                {title === 'today' && <div className={ResumeCardStyle.ResumeCardVert__minmax__today}></div>}
              </div>
            </div>
          </div>
          <div className={ResumeCardStyle.ResumeCardVert__maxTemp}>
            {parseInt(maxTemp)}°
          </div>
        </div>
      )
    break
  }
}

export { ResumeCard }