import axios from "axios";
import { useState } from "react";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: [],
    renderData: 1,
  });

  const updateSpots = (stateDays, appointments) => {
    let counter = 0;

    for (const id of stateDays.appointments) {
      if (!appointments[id].interview) {
        counter++;
      }
    }

    return counter;
  };

  const spotCounter = (stateDays, appointments) => {
    const spotsObj = stateDays.map((day) => {
      return { ...day, spots: updateSpots(day, appointments) };
    });

    return spotsObj;
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = spotCounter(state.days, appointments);
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        setState({
          ...state,
          appointments,
          days,
        });
      });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = spotCounter(state.days, appointments);
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState({
          ...state,
          appointments,
          days,
        });
      });
  };

  const setDay = (day) => setState({ ...state, day });

  return {
    state,
    setState,
    bookInterview,
    cancelInterview,
    setDay,
  };
}
