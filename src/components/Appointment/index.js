import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty.js";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm.js";
import Error from "./Error.js";
import useVisualMode from "hooks/useVisualMode";
import useApplicationData from "hooks/useApplicationData";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // Saves form value and converts form component to show component
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    if (interviewer && name) {
      transition(SAVING);
      props
        .bookInterview(props.id, interview)
        .then(() => {
          transition(SHOW);
        })
        .catch(() => {
          transition(ERROR_SAVE, true);
        });
    }
  };

  // Deletes appointment on confirm
  const confirm = () => {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => {
        transition(ERROR_DELETE, true);
      });
  };

  // Transitions to confirm component
  const onDelete = () => {
    transition(CONFIRM);
  };

  // Transitions to form component on edit mode
  const edit = () => {
    transition(EDIT);
  };

  return (
    <article className="appointment">
      {("This one", console.log(props.interview))}
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          interviewer={props.interview.interviewer}
          interviewObj={props.interviewObj}
          onDelete={onDelete}
          onEdit={edit}
        />
      )}

      {mode === CREATE && (
        <Form interviewers={props.interviewers} back={back} onSave={save} />
      )}

      {mode === SAVING && <Status message="saving" />}

      {mode === DELETING && <Status message="Deleting" />}

      {mode === CONFIRM && (
        <Confirm
          onConfirm={confirm}
          onCancel={back}
          message="Are you sure you want to delete this appointment?"
        />
      )}

      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          back={back}
          onSave={save}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error message="error with delete" onClose={back} />
      )}
      {mode === ERROR_SAVE && (
        <Error message="error with save" onClose={back} />
      )}
    </article>
  );
}
