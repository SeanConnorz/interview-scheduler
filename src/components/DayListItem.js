import React from 'react';
import classNames from 'classnames';
import 'components/DayListItem.scss';

export default function DayListItem(props) {

  const checkFull = (obj) => {
    if (obj.spots === 0) {
      return true;
    }
    return false;
  };

  const formatSpots = (obj) => {
    if (obj.spots ===  1) {
      return '1 spot remaining';
    } else if (obj.spots === 0){
      return 'no spots remaining'
    }
    return `${obj.spots} spots remaining`;
  };

  const dayClass = classNames(['day-list__item', {
    "day-list__item--selected": props.selected,
    "day-list__item--full": checkFull(props)
  }]);

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props)}</h3>
    </li>
  );
}