import React from 'react';
import './index.scss';

class AddMovie extends React.Component {
    state = {
        title: '',
        year: '',
        format: 'DVD',
        stars: '',
        yearValidation: false,
        starValidation: false,
        duplicate: false
    };

    handleChange = (event) => {
        const value = event.target.value;
        this.setState({
            [event.target.name]: value
        }, this.validation);
    };

    handleSelect = (event) => {
        this.setState({
            format: event.target.value
        });
    };

    validation = () => {
        const yearActivate = this.state.year !== '';
        const numberYear = this.state.year;
        let starsArray = this.state.stars;
        starsArray.toString().split('').map(element => element.toLowerCase());
        let result =  starsArray.split(new RegExp(', '));
        let repeatResult = new Set(result);

        const inputMovie = this.state;
        const titleDuplicate = this.props.movieList.filter(movie => movie.title === inputMovie.title);
        const yearDuplicate = titleDuplicate.filter(movie => Number(movie.year) === Number(inputMovie.year));
        if(yearDuplicate.length > 0) {
            const duplicatedStars = yearDuplicate.map(movie => movie.stars);
            if(duplicatedStars.length > 1) {
                this.setState({
                    duplicate: false
                });
            } else {
                duplicatedStars.join(', ');
                this.setState({
                    duplicate: duplicatedStars.includes(starsArray)
                });
            }

        }

        this.setState({
            yearValidation: (!(isNaN(numberYear) || numberYear < 1850 || numberYear > 2020) && yearActivate),
            starValidation: (result.length === repeatResult.size)
        });
    };

    addItem(e) {
        e.preventDefault();
        this.validation(this.state.year);
        const inputMovie = this.state;
        this.props.getNewMovie(inputMovie);
        this.setState({
            title: '',
            year: '',
            format: 'DVD',
            stars: ''
        });
    }
    render() {
        return (
            <div>
                <h1>Add movie</h1>
                <form className={'add-user'} onSubmit={(e) => {this.addItem(e)}}>
                    <div>
                        <label htmlFor={'title'}>Movie title:</label>
                        <input type={'text'}
                               placeholder={'Title'}
                               id={'title'}
                               name={'title'}
                               value={this.state.title}
                               onChange={this.handleChange}
                               required
                        />
                    </div>
                    <div>
                        <label htmlFor={'year'}>Release Year: {this.state.year === '' || this.state.yearValidation ?
                            (<span></span>) : (<span className={'invalid'}>Invalid value</span>)}</label>
                        <input type={'text'}
                               placeholder={'Year'}
                               id={'year'}
                               name={'year'}
                               value={this.state.year}
                               onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <p className={'format'}>Format:</p>
                        <select value={this.state.format} onChange={this.handleSelect}>
                            <option value="DVD">DVD</option>
                            <option value="Blu-Ray">Blu-Ray</option>
                            <option value="VHS">VHS</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor={'stars'}>Stars: {this.state.stars === '' || this.state.starValidation ?
                            (<span></span>) : (<span className={'invalid'}>Invalid value</span>)}</label>
                        <input type={'text'}
                               placeholder={'Stars'}
                               id={'stars'}
                               name={'stars'}
                               value={this.state.stars}
                               onChange={this.handleChange}
                        />
                    </div>
                    {this.state.duplicate ? (<div className={'invalid'}>Duplicate movies</div>) : (<span></span>)}
                    <button type={'submit'} disabled={((this.state.year !== '') && !this.state.yearValidation) || !this.state.starValidation || this.state.duplicate}>Add</button>
                </form>
            </div>
        );
    }
}

export default AddMovie;