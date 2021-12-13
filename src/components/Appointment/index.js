import React from 'react';
import './styles.scss';
import Header from './Header.js';
import Show from './Show.js';
import Empty from './Empty.js';
import Form from './Form';
import useVisualMode from "hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  console.log(props.interviewers)
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time} />
      <footer className="appointment__footer">
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      </footer>
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
        )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          back = {back}
        />
        )}
    </article>
  )
}