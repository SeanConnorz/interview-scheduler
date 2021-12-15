import axios from 'axios';
import { useState } from "react";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: [],
    renderData: 1
  });
  
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
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview}).then(() => {
      console.log('something')
      renderDataFunc(state.renderData);
    })
  };
  
  const cancelInterview = (appointmentId) => {
    return axios.delete(`http://localhost:8001/api/appointments/${appointmentId}`).then(() => renderDataFunc(state.renderData))
  }

  const renderDataFunc = (renderData) => {
    setState(prev => ({...prev, renderData: renderData + 1 }));
  }

  const setDay = day => setState({ ...state, day });

  return {renderDataFunc, state, setState, bookInterview, cancelInterview, setDay}
}
