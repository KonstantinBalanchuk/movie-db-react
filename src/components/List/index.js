import React, {useState} from 'react';
import Movie from '../Movie/index';
import AddMovie from '../AddMovie/index';
import orderBy from 'lodash/orderBy';
import './index.scss';
import Filter from "../Fiter";
import Upload from "../Upload";

export default function List() {
  const [values, setValues] = useState({
    alertNotUploaded: true,
    movies: null,
    sortDirection: 'asc',
    moviesToSort: null,
    noResults: false
  });

  function simpleCounter() {
    let counter = 0;
    return function () {
      ++counter;
    }
  }

  const newItemId = simpleCounter();

  const deleteMovie = (index) => {
    // e.persist();
    // const index = e.target.dataset.index;
    console.log(index);
    const movies = values.movies;
    const listWithDeletedItem = [...movies.slice(0, index), ...movies.slice(index + 1)];

    setValues({ ...values, movies: listWithDeletedItem });
  };

  const addMovie = (newMovie) => {
    newMovie.id = newItemId();
    const newMovieList = values.movies ? [...values.movies, newMovie] : [...[], newMovie];
    setValues({
      ...values,
      alertNotUploaded: false,
      movies: newMovieList,
      moviesToSort: newMovieList
    });
  };


  const searchByQuery = (query) => {
    if (values.moviesToSort) {
      const filteredList = values.moviesToSort
        .filter(movie => {
          const byTitle = movie.title.toLowerCase().indexOf(query.title.toLowerCase()) !== -1;
          const byStar = Array.prototype.join.call(movie.stars, '').toLowerCase().indexOf(query.stars.toLowerCase()) !== -1;
          return byTitle && byStar;
        });
      setValues({
        ...values,
        movies: filteredList,
        noResults: filteredList.length === 0
      });
    } else {
      setValues({
        ...values,
        noResults: true
      });
    }
  };

  const handleSort = () => {
    const sortDirection = values.sortDirection === 'asc' ? 'desc' : 'asc';
    const sortedData = orderBy(values.movies, [movie => movie.title.toLowerCase()], values.sortDirection);
    setValues({
      ...values,
      movies: sortedData,
      sortDirection
    });
  };

  const getMovies = (list) => {
    if (list) {
      const movies = list.text.map(movie => {
        movie.id = newItemId();
        movie.title = movie["Title"];
        movie.year = movie["Release Year"];
        movie.format = movie["Format"];
        movie.stars = movie["Stars"];
        return movie;
      });
      if (values.movies) {
        const newMovieList = [...values.movies, ...movies];
        setValues({
          ...values,
          alertNotUploaded: false,
          moviesToSort: newMovieList,
          movies: newMovieList
        });
      } else {
        setValues({
          ...values,
          alertNotUploaded: false,
          movies: movies,
          moviesToSort: movies
        });
      }
    } else {
      setValues({
        ...values,
        alertNotUploaded: true
      });
    }
  };

  return (
      <div className={'container'}>
        <button onClick={handleSort}>Sort by name</button>
        <Filter searchQuery={searchByQuery}/>
        <h1 className={values.noResults ? 'no-results' : 'display-none'}>No results</h1>
        <Upload getMovieList={getMovies}/>
        {values.alertNotUploaded || !values.movies ? (
          <p className={'no-results'}>Movies are not uploaded yet</p>) : (
          <ol>
            {values.movies.map((movie, index) => (
              <Movie
                key={index}
                data={movie}
                data-index={index}
                //TODO fix this arrow function
                delMovie={() => deleteMovie(index)}
              />
            ))}
          </ol>
        )}
        <AddMovie getNewMovie={addMovie}
                  movieList={values.moviesToSort}
        />
      </div>
  );
}