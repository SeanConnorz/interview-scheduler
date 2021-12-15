import React from 'react';
import 'components/InterviewerList.scss';
import InterviewerListItem from 'components/InterviewerListItem';
import PropTypes from 'prop-types';

export default function InterviewerList(props) {  
  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };
  
  const interviewerList = props.interviewers.map((interviewer, index) => {
    return <InterviewerListItem 
    onChange={props.onChange} 
    key={interviewer.id} 
    id={interviewer.id} 
    name={interviewer.name}
    avatar={interviewer.avatar}
    selected={interviewer.id === props.value}
    interviewers={props.interviewers}
    />
  });
  
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  );
}