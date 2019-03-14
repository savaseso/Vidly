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
    {key:  'like'},
    {key: 'delete'}
  ];

  render() {
    const { movies, onDelete, onLike, onSort, sortColumn } = this.props;
    return (
      <table className="table">
          <TableHeader 
          columns={this.columns}
          sortColumns={sortColumn}
          onSort={onSort} />
          <TableBody data={movies}/>
        
    );
  }
}

export default moviesTable;

