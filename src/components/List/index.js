import React from 'react';
import Movie from '../Movie/index';
import AddMovie from '../AddMovie/index';
import orderBy from 'lodash/orderBy';
import './index.scss';
import Filter from "../Fiter";
import Upload from "../Upload";

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            alertNotUploaded: true,
            movies: null,
            sortDirection: 'asc',
            moviesToSort: null,
            noResults: false
        };
        this._counter = 0;
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
        if(this.state.movies) {
            const newMovieList = [...this.state.movies, newMovie];
            this.setState({
                alertNotUploaded: false,
                movies: newMovieList,
                moviesToSort: newMovieList
            });
        } else {
            const newMovieList = [];
            newMovieList.push(newMovie);
            this.setState({
                alertNotUploaded: false,
                movies: newMovieList,
                moviesToSort: newMovieList
            });
        }
    };


    searchByQuery = (query) => {
        if(this.state.moviesToSort) {
            const filteredList = this.state.moviesToSort
                .filter( movie => {
                    const byTitle = movie.title.toLowerCase().indexOf(query.title.toLowerCase()) !== -1;
                    const byStar = Array.prototype.join.call(movie.stars, '').toLowerCase().indexOf(query.star.toLowerCase()) !== -1;
                    return byTitle && byStar;
                });
            this.setState({
                movies: filteredList,
                noResults: filteredList.length === 0
            });
        } else {
            this.setState({
                noResults: true
            })
        }
    };

    handleSort = () => {
        const sortDirection = this.state.sortDirection === 'asc' ? 'desc' : 'asc';
        const sortedData = orderBy(this.state.movies, [movie => movie.title.toLowerCase()], this.state.sortDirection);
        this.setState({
            movies: sortedData,
            sortDirection
        })
    };

    getMovies = (list) => {
        if(list) {
            const movies = list.text.map(movie => {
                movie.id = this.newItemId;
                movie.title = movie["Title"];
                movie.year = movie["Release Year"];
                movie.format = movie["Format"];
                movie.stars = movie["Stars"];
                return movie;
            });
            if(this.state.movies) {
                const newMovieList = [...this.state.movies, ...movies];
                this.setState({
                    alertNotUploaded: false,
                    moviesToSort: newMovieList,
                    movies: newMovieList
                });
            } else {
                this.setState({
                    alertNotUploaded: false,
                    movies: movies,
                    moviesToSort: movies
                });
            }
        } else {
            this.setState({
                alertNotUploaded: true
            })
        }
    };

    render() {
        return (
            <div>
                <div className={'container'}>
                    <button onClick={() => this.handleSort()}>Sort by name</button>
                    <Filter queryTitle = {this.searchByQuery}
                            queryStar = {this.searchByQuery}
                    />
                    <h1 className={this.state.noResults ? 'no-results': 'display-none'}>No results</h1>
                    <Upload getMovieList = {this.getMovies}/>
                    {this.state.alertNotUploaded || !this.state.movies ? (
                    <p className={'no-results'}>Movies are not uploaded yet</p>) : (
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
                    <AddMovie getNewMovie = {this.addMovie}
                              movieList = {this.state.moviesToSort}
                    />
                </div>
            </div>
        );
    }
}

export default List;