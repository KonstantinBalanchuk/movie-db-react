import React from 'react';
import Movie from '../movie/movie';
import UniqueId from 'react-html-id';

class List extends React.Component {
    constructor() {
        super();
        UniqueId.enableUniqueIds(this);
        this.state = {
            // loading: true,
            loading: false,
            // movies: null,
            movies: [
                {
                    id: this.nextUniqueId(),
                    title: 'Blazing Saddles',
                    year: 1974,
                    format: 'VHS',
                    stars: ['Mel Brooks', 'Clevon Little', 'Harvey Korman', 'Gene Wilder', 'Slim Pickens','Madeline Kahn']
                },
                {
                    id: this.nextUniqueId(),
                    title: 'Casablanca',
                    year: 1942,
                    format: 'DVD',
                    stars: ['Humphrey Bogart', 'Ingrid Bergman', 'Claude Rains', 'Peter Lorre']
                }
            ]
        };
        console.log(this.state);
    }

    deleteMovie = (index) => {
        const movies = Object.assign([],this.state.movies,);
        movies.splice(index, 1);
        this.setState({movies: movies});
    }

    addMovie = () => {

    }

    render() {
        return (
            <div>
                {this.state.loading || !this.state.movies ? (
                    <div>Loading...</div>) : (
                    <ol>
                        {this.state.movies.map((movie, index) => (
                            <Movie
                                key = {movie.id}
                                data = {movie}
                                delMovie = {this.deleteMovie.bind(this, index)}
                            />
                        ))}
                        <input onClick={this.addMovie}/>
                    </ol>
                )}
            </div>
        );
    }
}

export default List;