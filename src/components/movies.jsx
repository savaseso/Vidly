
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { toast } from  'react-toastify'
import MoviesTable from './moviesTable';
import ListGroup from './common/listGroup'
import Pagination from './common/pagination'
import {getMovies, deleteMovie} from '../services/movieService';
import { getGenres } from '../services/genreService';
import {paginate} from '../utils/paginate';
import _ from 'lodash';
import SearchBox from './common/searchBox';


export class Movies extends Component {


state = {
    movies: [],
    genres: [],
    currentPage:1,
    pageSize: 4,
    searchQuery: '',
    selectedGenre: null,
    sortColumn: {path: 'title', order:'asc'}
    }

async componentDidMount() {
  const {data} = await getGenres();
  const genres = [{_id:"",name: 'All Genres'},...data]
  const {data:movies} = await getMovies();

  this.setState({movies, genres:genres});
}

handleDelete = async movie => {
  const originalMovies = this.state.movies;
  const movies = originalMovies.filter(m => m._id !== movie._id);
  this.setState({movies:movies})
  try {
  await deleteMovie(movie._id);
  }
  catch (ex) {
    if (ex.response && ex.response.status === 404)
    toast.error('This movie has already been deleted');
    this.setState({movies:originalMovies});
  }
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
  this.setState({selectedGenre:genre, searchQuery:'', currentPage: 1});
}
handleSearch = query => {
  this.setState({ searchQuery: query, selectedGenre:null, currentPage:1})
}
 handleSort = sortColumn => {
  this.setState({sortColumn})
}
getPagedData = () => {
  const {
    pageSize,
    currentPage,
    sortColumn,
    selectedGenre,
    searchQuery,
    movies: allMovies
  } = this.state;

  let filtered = allMovies;
  if (searchQuery)
   filtered = allMovies.filter(m=>
    m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
  else if (selectedGenre && selectedGenre._id)
    filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
const movies = paginate(sorted, currentPage, pageSize);

return {totalCount: filtered.length, data: movies};
}


  render() {
    const {length: count} = this.state.movies;
    const {pageSize, currentPage, sortColumn, searchQuery} = this.state;
    const { user } = this.props;

    if(count === 0) {
      return <h2>There are no movies in the database.</h2>} 
    
   const {totalCount, data: movies} = this.getPagedData();

    return (
      <div className = "row">
        <div className="col-3">
          <ListGroup  
              items = {this.state.genres} 
              onItemSelect={this.handleGenreSelect} 
              selectedItem = {this.state.selectedGenre}/>
        </div>
        <div className="col">
          {user && <Link to="/movies/new" className="btn btn-primary" style={{marginBottom:20}}>New Movie</Link>}
          <h2>Showing {totalCount} movies in the database.</h2>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
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
    )
  }
}


export default Movies
