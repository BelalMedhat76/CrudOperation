import React, { useState, useEffect } from 'react';

const AddNewEmployee = ({ onClose, onAdd }) => {
  const [newEmployee, setNewEmployee] = useState({
    NAME_ONE: '',
    NAME_TWO: '',
    EMAIL: '',
    AGE: '',
    JOINING_DATE: '',
    IS_ACTIVE_Y_N: 'Y',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(newEmployee);
  };

  useEffect(() => {
    // Reset the form values in case the parent changes any state (e.g. when closing the popup).
    setNewEmployee({
      NAME_ONE: '',
      NAME_TWO: '',
      EMAIL: '',
      AGE: '',
      JOINING_DATE: '',
      IS_ACTIVE_Y_N: 'Y',
    });
  }, []);

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Add New Employee</h3>
        <form onSubmit={handleSubmit}>
          <label>Name One:</label>
          <input
            type="text"
            name="NAME_ONE"
            value={newEmployee.NAME_ONE}
            onChange={handleChange}
          />
          <label>Name Two:</label>
          <input
            type="text"
            name="NAME_TWO"
            value={newEmployee.NAME_TWO}
            onChange={handleChange}
          />
          <label>Email:</label>
          <input
            type="email"
            name="EMAIL"
            value={newEmployee.EMAIL}
            onChange={handleChange}
          />
          <label>Age:</label>
          <input
            type="number"
            name="AGE"
            value={newEmployee.AGE}
            onChange={handleChange}
          />
          <label>Joining Date:</label>
          <input
            type="date"
            name="JOINING_DATE"
            value={newEmployee.JOINING_DATE}
            onChange={handleChange}
          />
          <label>Active:</label>
          <select
            name="IS_ACTIVE_Y_N"
            value={newEmployee.IS_ACTIVE_Y_N}
            onChange={handleChange}
          >
            <option value="Y">Active</option>
            <option value="N">Inactive</option>
          </select>
          <div className="popup-buttons">
            <button type="submit" className="btn-save">Add</button>
            <button type="button" onClick={onClose} className="btn-cancel">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewEmployee;
