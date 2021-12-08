import React from 'react';
import './styles.scss';

export default function Appointment(props) {
  const { time } = props;
  
  const appointment = (time) => {
    if (time) {
      return `Appointment at ${time}`
    }
    return 'No appointments'
  };

  return (
    <article className="appointment">
      {appointment(time)}
    </article>
  )
}