import React from 'react';
import './index.scss';

class Filter extends React.Component {
    state = {
        title: '',
        star: ''
    };

    updateSearchByTitle = (event) => {
        const value = event.target.value;
        this.setState({
            [event.target.name]: value
        }, this.searchByTitle);
    }

    updateSearchByStar = (event) => {
        const value = event.target.value;
        this.setState({
            [event.target.name]: value
        }, this.searchByStar);
    }

    searchByTitle() {
        this.props.queryTitle(this.state);
    }

    searchByStar() {
        this.props.queryStar(this.state);
    }

    render() {
        return (
            <div className={'form'}>
                <div>
                    <label htmlFor={'title'}>Search by title:</label>
                    <input type={'text'}
                           placeholder={'Search...'}
                           id={'title'}
                           name={'title'}
                           value={this.state.title}
                           onChange={this.updateSearchByTitle}
                    />
                </div>
                <div>
                    <label htmlFor={'star'}>Search by star:</label>
                    <input type={'text'}
                           placeholder={'Search...'}
                           id={'star'}
                           name={'star'}
                           value={this.state.star}
                           onChange={this.updateSearchByStar}
                    />
                </div>
            </div>
        )
    }
}

export default Filter;