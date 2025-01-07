import React, { useState, useEffect } from 'react';

const PopMenu = ({ employee, onClose, onUpdate }) => {
  const [updatedEmployee, setUpdatedEmployee] = useState({ ...employee });

  // Handle input changes and update the state locally
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployee({ ...updatedEmployee, [name]: value });
  };

  // Handle form submission (Update employee)
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedEmployee); // Pass updated employee to parent (DataGrid)
  };

  useEffect(() => {
    setUpdatedEmployee({ ...employee }); // Reset form to original employee on mount
  }, [employee]);

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Edit Employee</h3>
        <form onSubmit={handleSubmit}>
          <label>Name One:</label>
          <input
            type="text"
            name="NAME_ONE"
            value={updatedEmployee.NAME_ONE}
            onChange={handleChange}
          />
          <label>Name Two:</label>
          <input
            type="text"
            name="NAME_TWO"
            value={updatedEmployee.NAME_TWO}
            onChange={handleChange}
          />
          <label>Email:</label>
          <input
            type="email"
            name="EMAIL"
            value={updatedEmployee.EMAIL}
            onChange={handleChange}
          />
          <label>Age:</label>
          <input
            type="number"
            name="AGE"
            value={updatedEmployee.AGE}
            onChange={handleChange}
          />
          <label>Joining Date:</label>
          <input
            type="date"
            name="JOINING_DATE"
            value={updatedEmployee.JOINING_DATE}
            onChange={handleChange}
          />
          <label>Active:</label>
          <select
            name="IS_ACTIVE_Y_N"
            value={updatedEmployee.IS_ACTIVE_Y_N}
            onChange={handleChange}
          >
            <option value="Y">Active</option>
            <option value="N">Inactive</option>
          </select>
          <div className="popup-buttons">
            <button type="submit" className="btn-save">Save</button>
            <button type="button" onClick={onClose} className="btn-cancel">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopMenu;




// import React from 'react';

// const PopMenu = ({ employee, onClose, onSave }) => {
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     onSave({ ...employee, [name]: value }); // Ensure the onSave function is called with the correct data
//   };

//   return (
//     <div className="popup-overlay">
//       <div className="popup-content">
//         <h3>Edit Employee</h3>
//         <form onSubmit={(e) => { e.preventDefault(); onSave(employee); }}>
//           <label>Name One:</label>
//           <input
//             type="text"
//             name="NAME_ONE"
//             value={employee.NAME_ONE}
//             onChange={handleChange} // Use handleChange to update the value
//           />
//           <label>Name Two:</label>
//           <input
//             type="text"
//             name="NAME_TWO"
//             value={employee.NAME_TWO}
//             onChange={handleChange}
//           />
//           <label>Email:</label>
//           <input
//             type="email"
//             name="EMAIL"
//             value={employee.EMAIL}
//             onChange={handleChange}
//           />
//           <label>Age:</label>
//           <input
//             type="number"
//             name="AGE"
//             value={employee.AGE}
//             onChange={handleChange}
//           />
//           <label>Joining Date:</label>
//           <input
//             type="date"
//             name="JOINING_DATE"
//             value={employee.JOINING_DATE}
//             onChange={handleChange}
//           />
//           <label>Active:</label>
//           <select
//             name="IS_ACTIVE_Y_N"
//             value={employee.IS_ACTIVE_Y_N}
//             onChange={handleChange}
//           >
//             <option value="Y">Active</option>
//             <option value="N">Inactive</option>
//           </select>
//           <div className="popup-buttons">
//             <button type="submit" className="btn-save">Save</button>
//             <button type="button" onClick={onClose} className="btn-cancel">Cancel</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PopMenu;
