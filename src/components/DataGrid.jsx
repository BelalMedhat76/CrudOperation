
import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import PopMenu from './popupMenu';


const Alert = ({ message, type, onClose }) => {
  return (
    <div className={`custom-alert ${type}`}>
      <div className="alert-content">
        <span>{message}</span>
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
      </div>
    </div>
  );
};

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
    deleteEmployee,
  } = useContext(DataContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [editEmployee, setEditEmployee] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [isAscending, setIsAscending] = useState(true);
  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredData(data);
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

  const handleDelete = async (employeeId) => {
    try {
      await deleteEmployee(employeeId);
      const updatedData = filteredData.filter((row) => row.EMPLOYEE_ID !== employeeId);
      setFilteredData(updatedData);
      showAlert('Employee deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting employee:', error);
      showAlert('Failed to delete employee. Try again later.', 'error');
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
        showAlert('Employee updated successfully!', 'success');
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
      showAlert('Failed to update employee. Try again later.', 'error');
    }
    setEditEmployee(null);
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
        showAlert('Employee added successfully!', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        throw new Error(data.error || 'Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      showAlert('Failed to add employee. Try again later.', 'error');
    }

    setShowAddPopup(false);
  };
  const toggleSort = () => {
    const sortedData = [...filteredData].sort((a, b) =>
      isAscending ? b.EMPLOYEE_ID - a.EMPLOYEE_ID : a.EMPLOYEE_ID - b.EMPLOYEE_ID
    );
    setFilteredData(sortedData);
    setIsAscending(!isAscending);
  };


  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="data-grid-container">
      {alert.show && <Alert message={alert.message} type={alert.type} onClose={() => setAlert({ show: false, message: '', type: '' })} />}
      <div className="header">
        <h1>Employee Data Grid</h1>

      </div>

      <div className="filter-container">
        <input
          type="text"
          className="filter-input"
          placeholder="🔍 Search by ID, Name, or Email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        />

        <div className="sort-container">

          <button className="sort-btn" onClick={toggleSort}>
            Sort by ID ({isAscending ? 'Asc' : 'Desc'})
          </button>
          <button className="btnn-add-new" onClick={handleAddNew}>
            + Add New Employee
          </button>
        </div>
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
                  <td className='ActionButtons'>
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


