import React from 'react';

export default function Empty(props) {
  const { onAdd } = props; 
  return (
    <img
      onClick={onAdd}
      className="appointment__add-button"
      src="images/add.png"
      alt="Add"
    />
  );
}