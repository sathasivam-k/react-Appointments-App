// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentObject, isStarredFn} = props
  const {id, title, date, isStarred} = appointmentObject
  const starUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    isStarredFn(id)
  }

  return (
    <li className="list-container">
      <div className="name-btn">
        <p>{title}</p>
        <button
          className="star-button"
          data-testid="star"
          type="button"
          onClick={onClickStar}
        >
          <img className="star" src={starUrl} alt="star" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
