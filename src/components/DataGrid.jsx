
// import React, { useContext, useState, useEffect } from 'react';
// import { DataContext } from '../context/DataContext'; // Adjust the path if necessary
// import PopMenu from './popupMenu'; // Import PopMenu

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

//   const handleAddNew = () => {
//     setEditEmployee({}); // Set an empty object to indicate new employee
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
//                     <button className="btn-add-new" onClick={handleAddNew}>
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




// import React, { useContext, useState, useEffect } from 'react';
// import { DataContext } from '../context/DataContext';
// import PopMenu from './popupMenu';

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
//     addNewEmployee, // Import the add function from context
//   } = useContext(DataContext);

//   const [searchQuery, setSearchQuery] = useState('');
//   const [editEmployee, setEditEmployee] = useState(null);
//   const [showAddPopup, setShowAddPopup] = useState(false); // Track popup state for adding

//   useEffect(() => {
//     if (searchQuery === '') {
//       setFilteredData(data);
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
//     setEditEmployee(employee);
//   };

//   const handleAddNew = () => {
//     setShowAddPopup(true); // Open the Add Employee popup
//   };

//   const handleAddEmployee = async (newEmployee) => {
//     try {
//       await addNewEmployee(newEmployee); // Use the context function to add an employee
//       setShowAddPopup(false); // Close the popup
//       alert('Employee added successfully!');
//     } catch (error) {
//       console.error('Error adding employee:', error);
//       alert('Failed to add employee. Please try again.');
//     }
//   };

//   const handleUpdate = async (updatedEmployee) => {
//     try {
//       const newEmployeeData = {
//         EMPLOYEE_ID: updatedEmployee.EMPLOYEE_ID,
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
//     setEditEmployee(null);
//   };

//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

//   return (
//     <div className="data-grid-container">
//       <div className="header">
//         <h1>Employee Data Grid</h1>
//         <p>Manage employee data seamlessly with a beautiful interface</p>
//         <button className="btn-add-global" onClick={handleAddNew}>
//           + Add New Employee
//         </button>
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
//           onClose={() => setEditEmployee(null)}
//         />
//       )}

//       {showAddPopup && (
//         <PopMenu
//           onAdd={handleAddEmployee} // Pass the add function to PopMenu
//           onClose={() => setShowAddPopup(false)} // Close the popup
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
//                   <td>{row.NAME_ONE}</td>
//                   <td>{row.NAME_TWO}</td>
//                   <td>{row.EMAIL}</td>
//                   <td>
//                     <button className="btn-edit" onClick={() => handleEdit(row)}>
//                       ✏️
//                     </button>
//                     <button className="btn-delete" onClick={() => handleDelete(row.EMPLOYEE_ID)}>
//                       ❌
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


// import React, { useContext, useState, useEffect } from 'react';
// import { DataContext } from '../context/DataContext'; // Adjust the path if necessary
// import PopMenu from './popupMenu'; // Import the updated PopMenu

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
//   const [showAddPopup, setShowAddPopup] = useState(false); // Track whether to show the Add New Employee popup

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
//     setEditEmployee(employee); // Open the popup with the employee's data
//   };

//   const handleAddNew = () => {
//     setEditEmployee(null); // Clear editEmployee to indicate adding a new employee
//     setShowAddPopup(true); // Open the Add New Employee popup
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
//         // Update state with new data
//         setFilteredData((prevData) => [...prevData, newEmployee]);
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
//           employee={editEmployee} // Pass employee for editing or null for adding
//           onAdd={handleAdd} // Function to handle adding new employees
//           onUpdate={handleUpdate} // Function to handle updating employees
//           onClose={() => {
//             setEditEmployee(null);
//             setShowAddPopup(false);
//           }} // Close popup
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

// import React, { useContext, useState, useEffect } from 'react';
// import { DataContext } from '../context/DataContext'; // Adjust the path if necessary
// import PopMenu from './popupMenu'; // Import the updated PopMenu

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
//     deleteEmployee,
//   } = useContext(DataContext);

//   const [searchQuery, setSearchQuery] = useState('');
//   const [editEmployee, setEditEmployee] = useState(null); // Track the employee being edited
//   const [showAddPopup, setShowAddPopup] = useState(false); // Track whether to show the Add New Employee popup

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
//     deleteEmployee(employeeId); // Call the deleteEmployee function from context
//   };

//   const handleEdit = (employee) => {
//     setEditEmployee(employee); // Open the popup with the employee's data
//   };

//   const handleAddNew = () => {
//     setEditEmployee(null); // Clear editEmployee to indicate adding a new employee
//     setShowAddPopup(true); // Open the Add New Employee popup
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
//         // Directly add the new employee to both data and filteredData
//         addEmployee(newEmployee); // Update state with new employee
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
//           employee={editEmployee} // Pass employee for editing or null for adding
//           onAdd={handleAdd} // Function to handle adding new employees
//           onUpdate={handleUpdate} // Function to handle updating employees
//           onClose={() => {
//             setEditEmployee(null);
//             setShowAddPopup(false);
//           }} // Close popup
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
import PopMenu from './popupMenu'
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
    addEmployee,
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

      // Remove the employee from the filtered data
      const updatedData = filteredData.filter((row) => row.EMPLOYEE_ID !== employeeId);
      setFilteredData(updatedData);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleEdit = (employee) => {
    setEditEmployee(employee);
  };

  const handleAddNew = () => {
    setEditEmployee(null);
    setShowAddPopup(true);
  };

  const handleUpdate = async (updatedEmployee) => {
    try {
      const response = await fetch(
        'https://aseer.aait.com.sa:4801/API/D9F4BC3B728D4BA7BB3E8FC1EB43FD45/Test/Custom/PrcEmployeeDataUpd',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedEmployee),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        alert('Employee updated successfully!');
        setFilteredData((prevData) =>
          prevData.map((row) =>
            row.EMPLOYEE_ID === updatedEmployee.EMPLOYEE_ID
              ? { ...updatedEmployee }
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
  const handleAdd = async (newEmployee) => {
    try {
      const response = await fetch(
        'https://aseer.aait.com.sa:4801/API/D9F4BC3B728D4BA7BB3E8FC1EB43FD45/Test/Custom/PrcEmployeeDataIns',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newEmployee),
        }
      );
  
      const data = await response.json();
  
      if (response.status === 200) {
        alert('Employee added successfully!');
        
        // Reload the page to reflect the changes
        window.location.reload();  // This will refresh the page
      } else {
        throw new Error(data.error || 'Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      alert(error.message);
    }
  
    setShowAddPopup(false); // Close the Add New Employee form
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
        <button className="btn-add-new" onClick={handleAddNew}>
          + Add New Employee
        </button>
      </div>

      {(editEmployee || showAddPopup) && (
        <PopMenu
          employee={editEmployee}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          onClose={() => {
            setEditEmployee(null);
            setShowAddPopup(false);
          }}
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
                      ✏️ Edit
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
