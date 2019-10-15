import React from 'react';
import Movie from '../Movie/index';
import JsonList from '../../data/list';
import AddMovie from '../AddMovie/index';
import orderBy from 'lodash/orderBy';
import './index.scss';
import Filter from "../Fiter";

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            movies: null,
            sortDirection: 'asc',
            moviesToSort: null
        };
        this._counter = 0;
    }

    componentDidMount() {
        let promiseList = new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve(JsonList);
            }, 2000);
        });
        promiseList.then(value => {
            const movies = value.map(movie => {
                movie.id = this.newItemId;
                // movie.id = this.counter();
                movie.title = movie["Title"];
                movie.year = movie["Release Year"];
                movie.format = movie["Format"];
                movie.stars = movie["Stars"].join(', ');
                return movie;
            });
            this.setState({
                loading: false,
                moviesToSort: movies,
                movies
            });
        });
    }

    get newItemId() {
        return this._counter++;
    }

    deleteMovie = (index) => {
        const movies = this.state.movies;
        const listWithDeletedItem = [...movies.slice(0, index), ...movies.slice(index+1)]
        this.setState({
            movies: listWithDeletedItem
        });
    };

    addMovie = (newMovie) => {
        newMovie.id = this.newItemId;
        const newMovieList = [...this.state.movies, newMovie];
        this.setState({
            movies: newMovieList
        });
    };


    searchByQuery = (query) => {
        const filteredList = this.state.moviesToSort
            .filter( movie => {
                const byTitle = movie["Title"].toLowerCase().indexOf(query.title) !== -1;
                const byStar = movie["Stars"].join('').toLowerCase().indexOf(query.star) !== -1;
                return byTitle && byStar;
            });
        this.setState({
            movies: filteredList
        });
    };

    handleSort = () => {
        const sortDirection = this.state.sortDirection === 'asc' ? 'desc' : 'asc';
        const sortedData = orderBy(this.state.movies, 'title', this.state.sortDirection);
        this.setState({
            movies: sortedData,
            sortDirection
        })
    };

    render() {
        return (
            <div>
                {this.state.loading || !this.state.movies ? (
                    <div className={'loading'}>Loading...</div>) : (
                        <div className={'container'}>
                            <button onClick={() => this.handleSort()}>Sort by name</button>
                            <Filter queryTitle = {this.searchByQuery}
                                    queryStar = {this.searchByQuery}
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