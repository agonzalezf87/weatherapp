import ResumeCardStyle from '../styles/ResumeCard.module.css'


const ResumeCard = ({title, icon, alt, temp}) => {
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
}

export { ResumeCard }