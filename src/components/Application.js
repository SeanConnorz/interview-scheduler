import React, { useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";
import axios from "axios";

const daysUrl = "http://localhost:8001/api/days";
const appointmentsUrl = "http://localhost:8001/api/appointments";
const interviewersUrl = "http://localhost:8001/api/interviewers";

export default function Application() {
  const { state, setState, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  // Fetches data from api server
  useEffect(() => {
    Promise.all([
      axios.get(daysUrl),
      axios.get(appointmentsUrl),
      axios.get(interviewersUrl),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, [state.renderData]);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  // creates appointment components list
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
        interviewObj={getInterview(state, appointment.interview)}
      />
    );
  });

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
          <DayList days={state.days} value={state.day} onChange={setDay} />
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
