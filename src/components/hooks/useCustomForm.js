import { useState, useEffect, useRef } from "react";

const useCustomForm = (props) => {
  const initialValues = {
    title: '',
    year: '',
    format: 'DVD',
    stars: ''
  };
  const initialErrors = {
    year: false,
    stars: false,
    duplicate: false
  };
  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState(initialErrors || {});
  const [isSubmitting, setSubmitting] = useState(false);
  const formRendered = useRef(true);

  useEffect(() => {
    if (formRendered.current) {
      setValues(initialValues);
    }
    if(isSubmitting) {
      const noErrors = !errors.year && !errors.stars && !errors.duplicate;
      if(noErrors) {
        props.getNewMovie(values);
        setValues(initialValues);
        setSubmitting(false);
      } else {
        console.log(errors);
        setSubmitting(false);
      }
    }
    formRendered.current = false;
  }, [values, errors]);

  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    event.persist();
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    validation();
    setSubmitting(true);
  };

  const validation = () => {
    let starsArray = values.stars;
    starsArray.toString().split('').map(element => element.toLowerCase());
    let result =  starsArray.split(new RegExp(','))
      .map(name => name.trim());
    let repeatResult = new Set(result);
    if(props.movieList) {
      const listToValidate = props.movieList.filter( movie => movie.title.toLowerCase().indexOf(values.title.toLowerCase()) !== -1);
      if(listToValidate) {
        const yearDuplicate = listToValidate.filter(movie => movie.year.indexOf(values.year) !== -1);
        if(yearDuplicate) {
          setErrors({ ...errors, duplicate: yearDuplicate.length > 0 });
        }
      }
    }
    setErrors({
      ...errors,
      year: !values.year || isNaN(values.year) || (values.year < 1850) || (values.year > 2020),
      stars: (result.length !== repeatResult.size) || !starsArray
    });
  };

  return {
    values,
    handleChange,
    handleSubmit,
    errors
  };
};

export default useCustomForm;