import React from 'react';
import useCustomForm from "../hooks/useCustomForm";
import './index.scss';

export default function AddMovie(props) {
    const {
        values,
        handleChange,
        handleSubmit,
        errors
    } = useCustomForm(props);

        return (
            <div>
                <h1>Add movie</h1>
                <form className={'add-user'} onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor={'title'}>Movie title:</label>
                        <input type={'text'}
                               placeholder={'Title'}
                               id={'title'}
                               name={'title'}
                               value={values.title}
                               onChange={handleChange}
                               required
                        />
                    </div>
                    <div>
                        <label htmlFor={'year'}>
                            Release Year: {errors.year &&
                            (<span className={'invalid'}>Invalid value</span>)}
                        </label>
                        <input type={'text'}
                               placeholder={'Year'}
                               id={'year'}
                               name={'year'}
                               value={values.year}
                               onChange={handleChange}
                        />
                    </div>
                    <div>
                        <p className={'format'}>Format:</p>
                        <select value={values.format}
                                onChange={handleChange}
                                name={'format'}
                        >
                            <option value="DVD">DVD</option>
                            <option value="Blu-Ray">Blu-Ray</option>
                            <option value="VHS">VHS</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor={'stars'}>
                            Stars: {errors.stars &&
                           <span className={'invalid'}>Invalid value</span>}
                        </label>
                        <input type={'text'}
                               placeholder={'Stars'}
                               id={'stars'}
                               name={'stars'}
                               value={values.stars}
                               onChange={handleChange}
                        />
                    </div>
                    <button type={'submit'} disabled={errors.year || errors.stars || errors.duplicate}>Add</button>
                    {errors.duplicate && (<div className={'invalid'}>Duplicate movies</div>)}
                </form>
            </div>
        );
}