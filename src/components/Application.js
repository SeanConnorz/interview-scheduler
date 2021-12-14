import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment"
import { getAppointmentsForDay, getInterviewersForDay } from "helpers/selectors";
import axios from 'axios';
import useVisualMode from "hooks/useVisualMode";

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//   }
// ];

const daysUrl = 'http://localhost:8001/api/days';
const appointmentsUrl = 'http://localhost:8001/api/appointments'
const interviewersUrl = 'http://localhost:8001/api/interviewers'
let error;

export default function Application(props) {
  const { mode, transition, back } = useVisualMode();
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: []
  });
  
  useEffect(() => {
    Promise.all([
      axios.get(daysUrl),
      axios.get(appointmentsUrl),
      axios.get(interviewersUrl)
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });   
  }, []);

  const setDay = day => setState({ ...state, day });
  
  
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    })
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
  };
  
  const cancelInterview = (appointmentId) => {
    return axios.delete(`http://localhost:8001/api/appointments/${appointmentId}`)
  }

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointmentsMap = dailyAppointments.map((appointment, i) => {
    return (
      <Appointment 
      key={appointment.id} 
      id={appointment.id}
      time={appointment.time}
      interview={appointment.interview}
      interviewers={getInterviewersForDay(state, state.day)}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
       />
    );
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsMap}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
