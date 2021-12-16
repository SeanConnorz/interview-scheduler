import React from 'react';
import 'components/InterviewerListItem.scss';
import classNames from 'classnames';

export default function InterviewerListItem(props) {
  const { id, name, avatar } = props;
  const interviewerClass = classNames(['interviewers__item', {
    "interviewers__item--selected": props.selected
  }]);

  return (
    <li className={interviewerClass} onClick={() => props.onChange(id)}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
        data-cy='interviewer'
      />
      {props.selected && <>{name}</>}
  </li>
  );
}