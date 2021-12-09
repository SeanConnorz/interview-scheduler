import React from 'react';
import './styles.scss';
import Header from './Header.js';
import Show from './Show.js';
import Empty from './Empty.js';

export default function Appointment(props) {
  return (
    <article className="appointment">
      <Header time={props.time} />
      <footer className="appointment__footer">
        { !props.interview && <Empty />}
      </footer>
      { props.interview && <Show interview={props.interview}/>}
    </article>
  )
}