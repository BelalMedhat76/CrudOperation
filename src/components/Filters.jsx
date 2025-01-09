

import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';

const Filters = () => {
  const { data, setFilteredData } = useContext(DataContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');


  const handleSort = (field) => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    setSortField(field);

    const sorted = [...data].sort((a, b) =>
      newOrder === 'asc'
        ? a[field].localeCompare(b[field])
        : b[field].localeCompare(a[field])
    );
    setFilteredData(sorted);
  };


  const handleFilter = (query) => {
    setSearchQuery(query);
    const filtered = data.filter((row) =>
      row.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div className="filters-container">
      <input
        type="text"
        value={searchQuery}
        placeholder="Search by name"
        onChange={(e) => handleFilter(e.target.value)}
      />

      <button onClick={() => handleSort('name')}>
        Sort by Name {sortOrder === 'asc' ? 'Asc' : 'Desc'}
      </button>

      {/* You can extend the sorting functionality to other fields */}
      <button onClick={() => handleSort('age')}>
        Sort by Age {sortOrder === 'asc' ? 'Asc' : 'Desc'}
      </button>


      <div className="filters-info">
        <p>Filter and Sort Options:</p>
        <ul>
          <li>Sort by: {sortField}</li>
          <li>Search Query: {searchQuery}</li>
        </ul>
      </div>
    </div>
  );
};

export default Filters;
