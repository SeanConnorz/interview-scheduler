import React, { useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button'

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  
  const validate = () => {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
  
    setError("");
    props.onSave(student, interviewer);
  }

  const onCancel = () => {
    setStudent("");
    props.back();
  }

  // const reset = () => {
  //   setInterviewer('');
  //   setStudent('');
  // }

  // const cancel = () => {
  //   reset();
  //   props.onCancel();
  // }
  
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            onChange={(event) => setStudent(event.target.value)}
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            data-testid="student-name-input"
            data-cy="input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList value={interviewer} onChange={setInterviewer} interviewers={props.interviewers}/>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={onCancel} danger>Cancel</Button>
          <Button onClick={validate} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
}