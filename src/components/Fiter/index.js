import React, {useState, useEffect} from 'react';
import './index.scss';

export default function Filter(props) {
  const [values, setValues] = useState({
    stars: '',
    title: ''
  });

  useEffect(() => {
      props.searchQuery(values);
  }, [values]);

  const searchQuery = (event) => {
    const { target } = event;
    const { name, value } = target;
    event.persist();
    setValues({ ...values, [name]: value });
  }

  return (
    <div className={'form'}>
      <div>
        <label htmlFor={'title'}>Search by title:</label>
        <input type={'text'}
               placeholder={'Search...'}
               id={'title'}
               name={'title'}
               value={values.title}
               onChange={searchQuery}
        />
      </div>
      <div>
        <label htmlFor={'star'}>Search by star:</label>
        <input type={'text'}
               placeholder={'Search...'}
               id={'stars'}
               name={'stars'}
               value={values.stars}
               onChange={searchQuery}
        />
      </div>
    </div>
  )
}