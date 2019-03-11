
import React, { Component } from 'react'
import {getMovies} from '../services/fakeMovieService';
import Pagination from './common/pagination'
import {paginate} from '../utils/paginate';
import ListGroup from './common/listGroup'
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable'


export class Movies extends Component {


state = {
    genres: [],
    movies: [],
    currentPage:1,
    pageSize: 4
    }

componentDidMount() {
  const genres = [{name: 'All Genres'},...getGenres()]

  this.setState({movies:getMovies(), genres:genres});
}

handleDelete = movie => {
  const movies = this.state.movies.filter(m => m._id !== movie._id);
  this.setState({movies:movies})
 };

 handleLike = movie => {
  const movies = [...this.state.movies];
  const index = movies.indexOf(movie);
  movies[index] = {...movies[index] };
  movies[index].liked = !movies[index].liked;
  this.setState({ movies });
}

handlePageChange = page => {
  this.setState({currentPage:page});
}
handleGenreSelect = genre => {
  this.setState({selectedGenre:genre, currentPage: 1});
 }
 handleSort = path => {
   console.log(path)
 }



  render() {
    const {length: count} = this.state.movies;
    const {pageSize, currentPage, selectedGenre, movies:allMovies} = this.state;
    if(count === 0) {
      return <h2>There are no movies in the database.</h2>} 
    
    const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m=>m.genre._id === selectedGenre._id) : allMovies; //itt szürjük meg mi kerüljön a pagere ha valasztunk gombot

    const movies = paginate(filtered, currentPage, pageSize)

    return (
      <div className = "row">
        <div className="col-3">
          <ListGroup  items = {this.state.genres} onItemSelect={this.handleGenreSelect} selectedItem = {this.state.selectedGenre}/>
        </div>
        <div className="col">
          <h2>Showing {filtered.length} movies in the database.</h2>
          <MoviesTable movies = {movies} onLike={this.handleLike} onDelete={this.handleDelete} onSort={this.handleSort}/>
          <Pagination
              itemsCount={filtered.length} 
              pageSize={pageSize} 
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
          />
        </div>
       
        </div>
    )
  }
}


export default Movies
