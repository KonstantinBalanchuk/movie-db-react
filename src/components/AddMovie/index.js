import React from 'react';
import './index.scss';

class AddMovie extends React.Component {
    state = {
        title: '',
        year: '',
        format: '',
        stars: ''
    };

    handleChange = (event) => {
        const value = event.target.value;
        this.setState({
            [event.target.name]: value
        });
    }

    addItem(e) {
        e.preventDefault();
        const inputMovie = this.state;
        this.props.getNewMovie(inputMovie);
        this.setState({
            title: '',
            year: '',
            format: '',
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
                        />
                    </div>
                    <div>
                        <label htmlFor={'year'}>Release Year:</label>
                        <input type={'text'}
                               placeholder={'Year'}
                               id={'year'}
                               name={'year'}
                               value={this.state.year}
                               onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor={'format'}>Format:</label>
                        <input type={'text'}
                               placeholder={'Format'}
                               id={'format'}
                               name={'format'}
                               value={this.state.format}
                               onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor={'stars'}>Stars:</label>
                        <input type={'text'}
                               placeholder={'Stars'}
                               id={'stars'}
                               name={'stars'}
                               value={this.state.stars}
                               onChange={this.handleChange}
                        />
                    </div>
                    <button type={'submit'}>Add</button>
                </form>
            </div>
        );
    }
}

export default AddMovie;