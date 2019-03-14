import React, { Component } from 'react'
import TableHeader from './common/tableHeader'
import Like from './common/like'
import TableBody from './common/TableBody'


class moviesTable extends Component {
  
  columns = [
    {path: 'title', label: 'Title'},
    {path: 'genre.name', label: 'Genre'},
    {path: 'numberInStock', label: 'Stock'},
    {path: 'dailyRentalRate', label: 'Rate'},
    {
      key:  'like',
      content: movie =>(
        <Like liked={movie.liked} onClick={()=>this.props.onLike(movie)} />
        )
      },
    {
      key: 'delete',
      content: movie => (
        <button className="btn btn-danger btn-sm"onClick={() => this.props.onDelete(movie)}
        >
        Delete
        </button>)
    }
  ];

  render() {
    const { movies, onDelete, onLike, onSort, sortColumn } = this.props;
    return (
      <table className="table">
          <TableHeader 
              columns={this.columns}
              sortColumns={sortColumn}
              onSort={onSort} />
          <TableBody
              columns={this.columns} 
              data={movies}/>
      </table>
    );
  }
}

export default moviesTable;

