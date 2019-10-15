import React from 'react';
import Movie from '../Movie/movie';
import JsonList from '../../data/list';
import AddMovie from '../AddMovie/index';
import orderBy from 'lodash/orderBy';
import './list.scss';
import Filter from "../Fiter";

const directionDictionary = {
    'asc': 'desc',
    'desc': 'asc'
};

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            movies: null,
            sortDirection: 'asc',
            moviesToSort: null
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
                movies: value,
                moviesToSort: value
            });
            // console.log(this.state);
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

    searchByTitle = (query) => {
        const unfilteredList = this.state.moviesToSort;
        console.log(query.title);
        console.log(query.star);
        let filteredList = unfilteredList.filter(
            movie => {return movie['Title'].toLowerCase().indexOf(query.title) !== -1;}
        );
        this.setState({
            movies: filteredList
        });
    }

    searchByStar = (query) => {
        const unfilteredList = this.state.moviesToSort;
        console.log(query.title);
        console.log(query.star);
        let filteredList = unfilteredList.filter(
            movie => {return movie["Stars"].join('').toLowerCase().indexOf(query.star) !== -1;}
        );
        this.setState({
            movies: filteredList
        });
    }

    handleSort = () => {
        const sortedData = orderBy(this.state.movies, 'title', this.state.sortDirection);
        this.setState({
            movies: sortedData,
            sortDirection: directionDictionary[this.state.sortDirection]
        })
        console.log(this.state.sortDirection);
    }

    render() {
        return (
            <div>
                {this.state.loading || !this.state.movies ? (
                    <div className={'loading'}>Loading...</div>) : (
                        <div>
                            <button onClick={() => this.handleSort()}>Sort by name</button>
                            <Filter queryTitle = {this.searchByTitle}
                                   queryStar = {this.searchByStar}
                            />
                            <ol>
                                {this.state.movies.map((movie, index) => (
                                    <Movie
                                        key = {movie.id}
                                        data = {movie}
                                        delMovie = {this.deleteMovie.bind(this, index)}
                                    />
                                ))}
                            </ol>
                            <AddMovie getNewMovie = {this.addMovie}/>
                        </div>
                )}
            </div>
        );
    }
}

export default List;