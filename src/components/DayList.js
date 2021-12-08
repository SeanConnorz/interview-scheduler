import React from 'react';
import DayListItem from 'components/DayListItem'

export default function DayList(props) {

  const { days } = props;
  const dayListItem = days.map((item, index) => {
    return <DayListItem 
    key={props.days[index].id}
    name={props.days[index].name} 
    spots={props.days[index].spots} 
    selected={props.days[index].name === props.value}
    setDay={props.onChange}  
  />;
  });

  return(
    <ul>
      {dayListItem}  
    </ul>
  )
};