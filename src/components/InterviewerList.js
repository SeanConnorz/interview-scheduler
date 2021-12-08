import React from 'react';
import 'components/InterviewerList.scss';
import InterviewerListItem from 'components/InterviewerListItem'

export default function InterviewerList(props) {
  const { interviewers, setInterviewer } = props;

  const interviewer = interviewers.map((interviewer, index) => {
    if (props.interviewer === interviewer.id) {
      return <InterviewerListItem setInterviewer={setInterviewer} selected={true} key={interviewer.id} name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}/>
    }
    return <InterviewerListItem setInterviewer={setInterviewer} key={interviewer.id} name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}/>
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewer}</ul>
    </section>
  );
}