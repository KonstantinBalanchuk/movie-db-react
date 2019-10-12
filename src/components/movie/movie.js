import React from 'react';

class Movie extends React.Component {
    render() {
        return (
            <li>
                <p>Title: {this.props.data.title}</p>
                <p>Release Year: {this.props.data.year}</p>
                <p>Format: {this.props.data.format}</p>
                <p>Stars: {this.props.data.stars}</p>
                <button onClick={this.props.delMovie}>Delete</button>
            </li>
        );
    }
}

export default Movie;