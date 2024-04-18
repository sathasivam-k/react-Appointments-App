// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appoinmentList: [],
    isFilterActive: false,
  }

  getTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  getDate = event => {
    this.setState({dateInput: event.target.value})
  }

  onAddFn = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const dateFormat = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: dateFormat,
      isStarred: false,
    }

    this.setState(prevState => ({
      appoinmentList: [...prevState.appoinmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  isStarredFn = id => {
    this.setState(prevState => ({
      appoinmentList: prevState.appoinmentList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  onClickFilter = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  getFilteredAppointmentList = () => {
    const {isFilterActive, appoinmentList} = this.state
    if (isFilterActive) {
      return appoinmentList.filter(eachItem => eachItem.isStarred === true)
    }
    return appoinmentList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filteredClassName = isFilterActive ? 'active' : ''
    const filteredList = this.getFilteredAppointmentList()

    return (
      <div className="bg-container">
        <div className="inner-container">
          <div className="form-container">
            <form className="form-style" onSubmit={this.onAddFn}>
              <h1 className="heading">Add Appointment</h1>
              <label className="label" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={titleInput}
                placeholder="title"
                onChange={this.getTitle}
                autoComplete="OFF"
                className="input"
              />
              <label className="label" htmlFor="date">
                Date
              </label>
              <input
                className="input"
                type="date"
                id="date"
                value={dateInput}
                onChange={this.getDate}
              />
              <button className="submit-button" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr className="line" />
          <div>
            <div className="starred">
              <h1 className="heading2">Appointments</h1>
              <button
                type="button"
                onClick={this.onClickFilter}
                className={`style ${filteredClassName}`}
              >
                Starred
              </button>
            </div>
            <ul className="ul-style">
              {filteredList.map(eachObject => (
                <AppointmentItem
                  key={eachObject.id}
                  appointmentObject={eachObject}
                  isStarredFn={this.isStarredFn}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
