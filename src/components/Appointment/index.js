import React from 'react';
import "components/Appointment/styles.scss";
import Header from './Header.js';
import Show from './Show.js';
import Empty from './Empty.js';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm.js';
import useVisualMode from "hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview);
    setTimeout(() => {
      transition(SHOW);
    }, 1000)
  };

  const confirm = () => {
    props.cancelInterview(props.id);
    transition(CONFIRM);
  };

  const edit = () => {
    transition(EDIT);
  };

  const onDelete = () => {
    props.cancelInterview(props.id);
    transition(DELETING);
    setTimeout(() => {
      transition(EMPTY);
    }, 1000)
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirm}
          onEdit={edit}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          back = {back}
          onSave = {save}
        />
      )}

      {mode === SAVING && (
        <Status
          message='saving'
        />
      )}

      {mode === DELETING && (
        <Status
          message='Deleting'
        />
      )}

      {mode === CONFIRM && (
        <Confirm
          onConfirm={onDelete}
          onCancel={back}
          message='Are you sure you want to delete this appointment?'
        />
      )}

      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          back = {back}
          onSave = {save}
        />
      )}
        
    </article>
  )
}