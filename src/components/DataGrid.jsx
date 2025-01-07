// import React, { useContext, useState, useEffect } from 'react';
// import { DataContext } from '../context/DataContext'; // Adjust the path if necessary
// import PopMenu from './popupMenu'; // Import PopupMenu
// import AddNewEmployeePopup from './addNew'; // Import AddNewEmployeePopup

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
//   } = useContext(DataContext);

//   const [searchQuery, setSearchQuery] = useState('');
//   const [editEmployee, setEditEmployee] = useState(null); // Track the employee being edited
//   const [showAddPopup, setShowAddPopup] = useState(false); // Track whether to show the AddNewEmployeePopup

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

//   const handleDelete = (employeeId) => {
//     const updatedData = filteredData.filter((row) => row.EMPLOYEE_ID !== employeeId);
//     setFilteredData(updatedData);
//   };

//   const handleEdit = (employee) => {
//     setEditEmployee(employee); // Show the popup menu when editing
//   };

//   const handleUpdate = async (updatedEmployee) => {
//     try {
//       const newEmployeeData = {
//         EMPLOYEE_ID: updatedEmployee.EMPLOYEE_ID, // Ensure EMPLOYEE_ID is sent
//         NAME_ONE: updatedEmployee.NAME_ONE,
//         NAME_TWO: updatedEmployee.NAME_TWO,
//         EMAIL: updatedEmployee.EMAIL,
//         AGE: updatedEmployee.AGE,
//         JOINING_DATE: updatedEmployee.JOINING_DATE,
//         IS_ACTIVE_Y_N: updatedEmployee.IS_ACTIVE_Y_N,
//       };

//       const response = await fetch('https://aseer.aait.com.sa:4801/API/D9F4BC3B728D4BA7BB3E8FC1EB43FD45/Test/Custom/PrcEmployeeDataUpd', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newEmployeeData),
//       });

//       const data = await response.json();

//       if (response.status === 200) {
//         alert('Employee updated successfully!');
//         // Update state with new data
//         setFilteredData((prevData) =>
//           prevData.map((row) =>
//             row.EMPLOYEE_ID === updatedEmployee.EMPLOYEE_ID
//               ? { ...updatedEmployee } // Replace updated employee
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

//   const handleAddNew = (newEmployee) => {
//     setFilteredData((prevData) => [...prevData, newEmployee]); // Add the new employee to the filtered data
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
//       </div>

//       {editEmployee && (
//         <PopMenu
//           employee={editEmployee}
//           onUpdate={handleUpdate}
//           onClose={() => setEditEmployee(null)} // Close the popup menu
//         />
//       )}

//       {showAddPopup && (
//         <AddNewEmployeePopup
//           onClose={() => setShowAddPopup(false)} // Close the add new employee popup
//           onAdd={handleAddNew} // Add new employee to the data
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
//                       ✏️
//                     </button>
//                     <button className="btn-delete" onClick={() => handleDelete(row.EMPLOYEE_ID)}>
//                       ❌
//                     </button>
//                     <button className="btn-add-new" onClick={() =>  handleEdit(row)}>
//         + Add New Employee
//       </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4">No data available</td>
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

//       {/* Button to open the Add New Employee popup */}
   
//     </div>
//   );
// };

// export default DataGrid;





























// import React, { useContext, useState, useEffect } from 'react';
// import { DataContext } from '../context/DataContext'; // Adjust the path if necessary
// import PopMenu from './popupMenu'; // Import PopupMenu
// import AddNewEmployeePopup from './addNew'; // Import AddNewEmployeePopup

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
//   } = useContext(DataContext);

//   const [searchQuery, setSearchQuery] = useState('');
//   const [editEmployee, setEditEmployee] = useState(null); // Track the employee being edited
//   const [showAddPopup, setShowAddPopup] = useState(false); // Track whether to show the AddNewEmployeePopup

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

//   const handleDelete = (employeeId) => {
//     const updatedData = filteredData.filter((row) => row.EMPLOYEE_ID !== employeeId);
//     setFilteredData(updatedData);
//   };

//   const handleEdit = (employee) => {
//     setEditEmployee(employee); // Show the popup menu when editing
//   };

//   const handleUpdate = async (updatedEmployee) => {
//     try {
//       const newEmployeeData = {
//         EMPLOYEE_ID: updatedEmployee.EMPLOYEE_ID, // Ensure EMPLOYEE_ID is sent
//         NAME_ONE: updatedEmployee.NAME_ONE,
//         NAME_TWO: updatedEmployee.NAME_TWO,
//         EMAIL: updatedEmployee.EMAIL,
//         AGE: updatedEmployee.AGE,
//         JOINING_DATE: updatedEmployee.JOINING_DATE,
//         IS_ACTIVE_Y_N: updatedEmployee.IS_ACTIVE_Y_N,
//       };

//       const response = await fetch('https://aseer.aait.com.sa:4801/API/D9F4BC3B728D4BA7BB3E8FC1EB43FD45/Test/Custom/PrcEmployeeDataUpd', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newEmployeeData),
//       });

//       const data = await response.json();

//       if (response.status === 200) {
//         alert('Employee updated successfully!');
//         // Update state with new data
//         setFilteredData((prevData) =>
//           prevData.map((row) =>
//             row.EMPLOYEE_ID === updatedEmployee.EMPLOYEE_ID
//               ? { ...updatedEmployee } // Replace updated employee
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

//   const handleAddNew = (newEmployee) => {
//     setFilteredData((prevData) => [...prevData, newEmployee]); // Add the new employee to the filtered data
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
//       </div>

//       {editEmployee && (
//         <PopMenu
//           employee={editEmployee}
//           onUpdate={handleUpdate}
//           onClose={() => setEditEmployee(null)} // Close the popup menu
//         />
//       )}

//       {showAddPopup && (
//         <AddNewEmployeePopup
//           onClose={() => setShowAddPopup(false)} // Close the add new employee popup
//           onAdd={handleAddNew} // Add new employee to the data
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
//                       ✏️
//                     </button>
//                     <button className="btn-delete" onClick={() => handleDelete(row.EMPLOYEE_ID)}>
//                       ❌
//                     </button>
//                     {/* Add New Employee button with animation */}
//                     <button
//                       className="btn-add-new-animated"
//                       onClick={() => setShowAddPopup(true)} // Open Add New Employee popup
//                     >
//                       + Add New Employee
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4">No data available</td>
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
import { DataContext } from '../context/DataContext'; // Adjust the path if necessary
import PopMenu from './popupMenu'; // Import PopMenu

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
  } = useContext(DataContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [editEmployee, setEditEmployee] = useState(null); // Track the employee being edited
  const [showAddPopup, setShowAddPopup] = useState(false); // Track whether to show the AddNewEmployeePopup

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

  const handleDelete = (employeeId) => {
    const updatedData = filteredData.filter((row) => row.EMPLOYEE_ID !== employeeId);
    setFilteredData(updatedData);
  };

  const handleEdit = (employee) => {
    setEditEmployee(employee); // Show the popup menu when editing
  };

  const handleAddNew = () => {
    setEditEmployee({}); // Set an empty object to indicate new employee
  };

  const handleUpdate = async (updatedEmployee) => {
    try {
      const newEmployeeData = {
        EMPLOYEE_ID: updatedEmployee.EMPLOYEE_ID, // Ensure EMPLOYEE_ID is sent
        NAME_ONE: updatedEmployee.NAME_ONE,
        NAME_TWO: updatedEmployee.NAME_TWO,
        EMAIL: updatedEmployee.EMAIL,
        AGE: updatedEmployee.AGE,
        JOINING_DATE: updatedEmployee.JOINING_DATE,
        IS_ACTIVE_Y_N: updatedEmployee.IS_ACTIVE_Y_N,
      };

      const response = await fetch('https://aseer.aait.com.sa:4801/API/D9F4BC3B728D4BA7BB3E8FC1EB43FD45/Test/Custom/PrcEmployeeDataUpd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmployeeData),
      });

      const data = await response.json();

      if (response.status === 200) {
        alert('Employee updated successfully!');
        // Update state with new data
        setFilteredData((prevData) =>
          prevData.map((row) =>
            row.EMPLOYEE_ID === updatedEmployee.EMPLOYEE_ID
              ? { ...updatedEmployee } // Replace updated employee
              : row
          )
        );
      } else {
        throw new Error(data.error || 'Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      alert(error.message);
    }
    setEditEmployee(null); // Close the edit form
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="data-grid-container">
      <div className="header">
        <h1>Employee Data Grid</h1>
        <p>Manage employee data seamlessly with a beautiful interface</p>
      </div>

      <div className="filter-container">
        <input
          type="text"
          className="filter-input"
          placeholder="🔍 Search by ID, Name, or Email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        />
      </div>

      {editEmployee && (
        <PopMenu
          employee={editEmployee}
          onUpdate={handleUpdate}
          onClose={() => setEditEmployee(null)} // Close the popup menu
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
                  <td>{row.NAME_ONE} </td>
                  <td>{row.NAME_TWO}</td>
                  <td>{row.EMAIL}</td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEdit(row)}>
                      ✏️
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(row.EMPLOYEE_ID)}>
                      ❌
                    </button>
                    <button className="btn-add-new" onClick={handleAddNew}>
                      + Add New Employee
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No data available</td>
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
