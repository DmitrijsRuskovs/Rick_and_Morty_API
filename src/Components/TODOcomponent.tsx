/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable react/require-default-props */
/* eslint-disable linebreak-style */
import React from 'react';
import './TODOcomponent.scss';

type TODOprops = {
    id: number;
    title: string;
    onClickComplete: () => void;
    onClickDelete: () => void;
    disabled: boolean
}

const TODOcomponent = ({
  id, title, onClickComplete, onClickDelete, disabled,
}: TODOprops) => (
  <div className={`item ${disabled && 'completed'}`} key={id}>
    {title}
    <div className="buttonWrapper">
      <button type="button" className="deleteButton" onClick={onClickComplete} disabled={disabled}>
        Complete
      </button>
      <button type="button" className="deleteButton" onClick={onClickDelete}>
        Delete
      </button>
    </div>
  </div>
);

export default TODOcomponent;
