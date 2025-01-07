// import React, { useContext } from 'react';
// import {DataContext} from '../context/DataContext';

// const Filters = () => {
//   const { data, setFilteredData } = useContext(DataContext);

//   // Sorting Logic
//   const handleSort = (field, order) => {
//     const sorted = [...data].sort((a, b) =>
//       order === 'asc' ? a[field].localeCompare(b[field]) : b[field].localeCompare(a[field])
//     );
//     setFilteredData(sorted);
//   };

//   // Filtering Logic
//   const handleFilter = (query) => {
//     const filtered = data.filter((row) =>
//       row.name.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredData(filtered);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search by name"
//         onChange={(e) => handleFilter(e.target.value)}
//       />
//       <button onClick={() => handleSort('name', 'asc')}>Sort Asc</button>
//       <button onClick={() => handleSort('name', 'desc')}>Sort Desc</button>
//     </div>
//   );
// };

// export default Filters;


import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';

const Filters = () => {
  const { data, setFilteredData } = useContext(DataContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Sorting Logic
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

  // Filtering Logic
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

      {/* Add more filter criteria if necessary */}
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
