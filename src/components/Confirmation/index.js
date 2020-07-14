import React from 'react';
import './index.scss';

export default function Confirmation(props) {
  function hide() {
    toggleConfirmation(false);
  }

  function confirm() {
    toggleConfirmation(true);
  }

  function toggleConfirmation(option) {
    props.workWithModal(option);
  }

  return (
    <div className={'modalWindow'}>
      <h1>Are you sure?</h1>
      <div>
        <button onClick={confirm}>Yes, delete movie</button>
        <button onClick={hide}>No</button>
      </div>
    </div>
  );
}