
import React, { Component } from 'react'
import {getMovies} from '../services/fakeMovieService';
import Pagination from './common/pagination'
import {paginate} from '../utils/paginate';
import ListGroup from './common/listGroup'
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable'
import _ from 'lodash';
import NavBar from './common/navBar';


export class Movies extends Component {


state = {
    genres: [],
    movies: [],
    currentPage:1,
    pageSize: 4,
    sortColumn: {path: 'title', order:'asc'}
    }

componentDidMount() {
  const genres = [{_id:"",name: 'All Genres'},...getGenres()]

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
 handleSort = sortColumn => {
  this.setState({sortColumn:sortColumn})
}

getPageData = () =>{
  const {pageSize, currentPage, sortColumn, selectedGenre, movies:allMovies} = this.state;

  const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m=>m.genre._id === selectedGenre._id) : allMovies; //itt szürjük meg mi kerüljön a pagere ha valasztunk gombot
  const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]) // _.orderBy(melyikobjectetszürjükmeg, melyikértékeketpluservagyage, noverkvovagycsokkeno)
  const movies = paginate(sorted, currentPage, pageSize);

  return {totalCount: filtered.length, data:movies }

}

  render() {
    const {length: count} = this.state.movies;
    const {pageSize, currentPage, sortColumn} = this.state;

    if(count === 0) {
      return <h2>There are no movies in the database.</h2>} 
    
   const {totalCount, data: movies} = this.getPageData();

    return (
    <div>
      <NavBar />
      <div className = "row">
        <div className="col-3">
          <ListGroup  
              items = {this.state.genres} 
              onItemSelect={this.handleGenreSelect} 
              selectedItem = {this.state.selectedGenre}/>
        </div>
        <div className="col">
          <h2>Showing {totalCount} movies in the database.</h2>
          <MoviesTable 
              movies = {movies} 
              onLike={this.handleLike} 
              onDelete={this.handleDelete} 
              onSort={this.handleSort}
              sortColumn={sortColumn}
              />
          <Pagination
              itemsCount={totalCount} 
              pageSize={pageSize} 
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
          />
        </div>
      </div>
    </div>
    )
  }
}


export default Movies
