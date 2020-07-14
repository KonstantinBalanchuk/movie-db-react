import React, {useState, useEffect} from 'react';
import Confirmation from "../Confirmation";
import './index.scss';

export default function Movie(props) {
  const [open, setOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (confirmed) {
      props.delMovie()
    }
  }, [open, confirmed]);

  function show() {
    setOpen(true);
  }

  function options(status) {
    setOpen(false);
    setConfirmed(status);
  }

  function toggleClass() {
    setShowInfo(!showInfo);
  }


  return (
    <li>
      <div className={'card'}>
        {!showInfo ? (
            <div>
              <p className={'title'}>{props.data.title}</p>
              <p className={'open-info'} onClick={toggleClass}>Show full information</p>
            </div>) :
          (
            <div className="info">
              <p>Title: <span className={'title'}>{props.data.title}</span></p>
              <p>Release Year: {props.data.year}</p>
              <p>Format: {props.data.format}</p>
              <p>Stars: {props.data.stars}</p>
              <p className={'open-info'} onClick={toggleClass}>Hide full information</p>
            </div>
          )}
        {open && (
          <Confirmation workWithModal={options}/>
        )}
        <button onClick={show}>Delete</button>
      </div>
    </li>
  );
}