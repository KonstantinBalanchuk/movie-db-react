import React from 'react';

class Filter extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            star: ''
        };
        this.updateSearchByTitle = this.updateSearchByTitle.bind(this);
        this.updateSearchByStar = this.updateSearchByStar.bind(this);
    }

    updateSearchByTitle(event) {
        const value = event.target.value;
        this.setState({
            [event.target.name]: value
        }, this.searchByTitle);
    }

    updateSearchByStar(event) {
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
            <div>
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