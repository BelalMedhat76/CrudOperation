


// import React, { useContext, useState, useEffect } from 'react';
// import { DataContext } from '../context/DataContext'; // Import the context
// import PopMenu from './popupMenu'
// const DataGrid = () => {
//   const {
//     filteredData,
//     loading,
//     error,
//     currentPage,
//     rowsPerPage,
//     setCurrentPage,
//     setFilteredData,
//     data,
//     addEmployee,
//     deleteEmployee, // Destructure deleteEmployee from the context
//   } = useContext(DataContext); // Access the context

//   const [searchQuery, setSearchQuery] = useState('');
//   const [editEmployee, setEditEmployee] = useState(null);
//   const [showAddPopup, setShowAddPopup] = useState(false);

//   useEffect(() => {
//     if (searchQuery === '') {
//       setFilteredData(data); // Reset to original data if search is empty
//     } else {
//       const filtered = data.filter(
//         (row) =>
//           row.EMPLOYEE_ID.toString().includes(searchQuery) ||
//           row.NAME_ONE.toLowerCase().includes(searchQuery) ||
//           row.NAME_TWO.toLowerCase().includes(searchQuery) ||
//           row.EMAIL.toLowerCase().includes(searchQuery)
//       );
//       setFilteredData(filtered);
//     }
//   }, [searchQuery, data, setFilteredData]);

//   if (loading) {
//     return <div className="loading">Loading...</div>;
//   }

//   if (error) {
//     return <div className="error">Error: {error}</div>;
//   }

//   const handleDelete = async (employeeId) => {
//     try {
//       await deleteEmployee(employeeId); // Use deleteEmployee from the context

//       // Remove the employee from the filtered data
//       const updatedData = filteredData.filter((row) => row.EMPLOYEE_ID !== employeeId);
//       setFilteredData(updatedData);
//     } catch (error) {
//       console.error('Error deleting employee:', error);
//     }
//   };

//   const handleEdit = (employee) => {
//     setEditEmployee(employee);
//   };

//   const handleAddNew = () => {
//     setEditEmployee(null);
//     setShowAddPopup(true);
//   };

//   const handleUpdate = async (updatedEmployee) => {
//     try {
//       const response = await fetch(
//         'https://aseer.aait.com.sa:4801/API/D9F4BC3B728D4BA7BB3E8FC1EB43FD45/Test/Custom/PrcEmployeeDataUpd',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(updatedEmployee),
//         }
//       );

//       const data = await response.json();

//       if (response.status === 200) {
//         alert('Employee updated successfully!');
//         setFilteredData((prevData) =>
//           prevData.map((row) =>
//             row.EMPLOYEE_ID === updatedEmployee.EMPLOYEE_ID
//               ? { ...updatedEmployee }
//               : row
//           )
//         );
//       } else {
//         throw new Error(data.error || 'Something went wrong. Please try again later.');
//       }
//     } catch (error) {
//       console.error('Error updating employee:', error);
//       alert(error.message);
//     }
//     setEditEmployee(null); // Close the edit form
//   };
//   const handleAdd = async (newEmployee) => {
//     try {
//       const response = await fetch(
//         'https://aseer.aait.com.sa:4801/API/D9F4BC3B728D4BA7BB3E8FC1EB43FD45/Test/Custom/PrcEmployeeDataIns',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(newEmployee),
//         }
//       );
  
//       const data = await response.json();
  
//       if (response.status === 200) {
//         alert('Employee added successfully!');
        
//         // Reload the page to reflect the changes
//         window.location.reload();  // This will refresh the page
//       } else {
//         throw new Error(data.error || 'Something went wrong. Please try again later.');
//       }
//     } catch (error) {
//       console.error('Error adding employee:', error);
//       alert(error.message);
//     }
  
//     setShowAddPopup(false); // Close the Add New Employee form
//   };
  
  
//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

//   return (
//     <div className="data-grid-container">
//       <div className="header">
//         <h1>Employee Data Grid</h1>
//         <p>Manage employee data seamlessly with a beautiful interface</p>
//       </div>

//       <div className="filter-container">
//         <input
//           type="text"
//           className="filter-input"
//           placeholder="🔍 Search by ID, Name, or Email"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
//         />
//         <button className="btn-add-new" onClick={handleAddNew}>
//           + Add New Employee
//         </button>
//       </div>

//       {(editEmployee || showAddPopup) && (
//         <PopMenu
//           employee={editEmployee}
//           onAdd={handleAdd}
//           onUpdate={handleUpdate}
//           onClose={() => {
//             setEditEmployee(null);
//             setShowAddPopup(false);
//           }}
//         />
//       )}

//       <div className="table-container">
//         <table className="data-grid-table">
//           <thead>
//             <tr>
//               <th>Employee ID</th>
//               <th>Name ONE</th>
//               <th>Name TWO</th>
//               <th>Email</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentRows.length > 0 ? (
//               currentRows.map((row) => (
//                 <tr key={row.EMPLOYEE_ID}>
//                   <td>{row.EMPLOYEE_ID}</td>
//                   <td>{row.NAME_ONE} </td>
//                   <td>{row.NAME_TWO}</td>
//                   <td>{row.EMAIL}</td>
//                   <td>
//                     <button className="btn-edit" onClick={() => handleEdit(row)}>
//                       ✏️ Edit
//                     </button>
//                     <button className="btn-delete" onClick={() => handleDelete(row.EMPLOYEE_ID)}>
//                       ❌ Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5">No data available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div className="pagination">
//         <button
//           className="prev-btn"
//           onClick={() => setCurrentPage((prev) => prev - 1)}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         <span className="page-info">Page {currentPage}</span>
//         <button
//           className="next-btn"
//           onClick={() => setCurrentPage((prev) => prev + 1)}
//           disabled={filteredData.length <= currentPage * rowsPerPage}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DataGrid;

import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../context/DataContext'; // Import the context
import PopMenu from './popupMenu';


const DataGrid = () => {
  const {
    filteredData,
    loading,
    error,
    currentPage,
    rowsPerPage,
    setCurrentPage,
    setFilteredData,
    data,
    deleteEmployee, // Destructure deleteEmployee from the context
  } = useContext(DataContext); // Access the context

  const [searchQuery, setSearchQuery] = useState('');
  const [editEmployee, setEditEmployee] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredData(data); // Reset to original data if search is empty
    } else {
      const filtered = data.filter(
        (row) =>
          row.EMPLOYEE_ID.toString().includes(searchQuery) ||
          row.NAME_ONE.toLowerCase().includes(searchQuery) ||
          row.NAME_TWO.toLowerCase().includes(searchQuery) ||
          row.EMAIL.toLowerCase().includes(searchQuery)
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, data, setFilteredData]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  const handleDelete = async (employeeId) => {
    try {
      await deleteEmployee(employeeId); // Use deleteEmployee from the context
      const updatedData = filteredData.filter((row) => row.EMPLOYEE_ID !== employeeId);
      setFilteredData(updatedData);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleEdit = (employee) => {
    setEditEmployee(employee);
    setShowAddPopup(true);
  };

  const handleAddNew = () => {
    setEditEmployee(null);
    setShowAddPopup(true);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="data-grid-container">
      <div className="header">
        <h1>Employee Data Grid</h1>
        <p>Manage employee data seamlessly with a responsive interface</p>
      </div>

      <div className="filter-container">
        <input
          type="text"
          className="filter-input"
          placeholder="🔍 Search by ID, Name, or Email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        />
        <button className="btnn-add-new" onClick={handleAddNew}>
          + Add New Employee
        </button>
      </div>

      {showAddPopup && (
        <PopMenu
          employee={editEmployee}
          onAdd={() => handleAddNew()}
          onUpdate={() => handleEdit()}
          onClose={() => setShowAddPopup(false)}
        />
      )}

      <div className="table-container">
        <table className="data-grid-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name ONE</th>
              <th>Name TWO</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((row) => (
                <tr key={row.EMPLOYEE_ID}>
                  <td>{row.EMPLOYEE_ID}</td>
                  <td>{row.NAME_ONE}</td>
                  <td>{row.NAME_TWO}</td>
                  <td>{row.EMAIL}</td>
                  <td className="actions">
                    <button className="btn-edit" onClick={() => handleEdit(row)}>
                      ✏️ Ediet
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(row.EMPLOYEE_ID)}>
                      ❌ Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          className="prev-btn"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="page-info">Page {currentPage}</span>
        <button
          className="next-btn"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={filteredData.length <= currentPage * rowsPerPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataGrid;
