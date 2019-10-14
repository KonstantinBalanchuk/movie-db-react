import React from 'react';
import Movie from '../Movie/movie';
import JsonList from '../../data/list';
import AddMovie from '../AddMovie/AddMovie';

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            movies: null
        };

        function closureCounter() {
            let localCounter = 0;
            return function() {
                return localCounter++;
            }
        }

        this.counter = closureCounter();
    }

    componentDidMount() {
        let promiseList = new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve(JsonList);
            }, 2000);
        });
        promiseList.then(value => {
            value.forEach(movie => {
                movie.id = this.counter();
                movie.title = movie["Title"];
                movie.year = movie["Release Year"];
                movie.format = movie["Format"];
                movie.stars = movie["Stars"].join(', ');
            });
            this.setState({
                loading: false,
                movies: value
            });
            console.log(this.state);
        });
    }

    deleteMovie = (index) => {
        const movies = [...[], ...this.state.movies]
        movies.splice(index, 1);
        this.setState({
            movies: movies
        });
    }

    addMovie = (newMovie) => {
        newMovie.id = this.counter();
        const newMovieList = [...[], ...this.state.movies];
        newMovieList.push(newMovie);
        this.setState({
            movies: newMovieList
        });
        console.log(newMovie);
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
                    </ol>
                )}
                <AddMovie getNewMovie = {this.addMovie}/>
            </div>
        );
    }
}

export default List;