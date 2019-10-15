import React from 'react';
import './movie.scss';

class Movie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };
        this.toggleClass= this.toggleClass.bind(this);
    }

    toggleClass() {
        const currentState = this.state.active;
        this.setState({ active: !currentState });
    };

    render() {
        return (
            <li className={this.state.active ? 'fullInfo': 'titleOnly'}
                onClick={this.toggleClass} >
                <div className={''}>
                    <p className={'title'}>{this.props.data.title}</p>
                    <div className="info">
                        <p>Title: {this.props.data.title}</p>
                        <p>Release Year: {this.props.data.year}</p>
                        <p>Format: {this.props.data.format}</p>
                        <p>Stars: {this.props.data.stars}</p>
                    </div>
                    <button onClick={this.props.delMovie}>Delete</button>
                </div>
            </li>
        );
    }
}

export default Movie;