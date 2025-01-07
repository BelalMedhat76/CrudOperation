import React, { useContext } from 'react';
import {DataContext} from '../context/DataContext';

const Pagination = () => {
  const { filteredData, currentPage, setCurrentPage, rowsPerPage } = useContext(DataContext);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          disabled={currentPage === index + 1}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
