import React, { useState } from 'react';


const PopMenu = ({ employee, onAdd, onUpdate, onClose }) => {
  const isEdit = !!employee; // Check if the popup is for editing

  const [formData, setFormData] = useState(
    employee || {
      EMPLOYEE_ID: '',
      NAME_ONE: '',
      NAME_TWO: '',
      EMAIL: '',
      AGE: '',
      JOINING_DATE: '',
      IS_ACTIVE_Y_N: '',
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await onUpdate(formData);
      } else {
        await onAdd(formData);
      }
    } catch (error) {
      console.error('Error in PopMenu submit:', error);
      alert('Failed to submit. Please check the input fields.');
    }
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className="popup-content animate-slide-in"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
      >
        <h2>{isEdit ? 'Edit Employee' : 'Add New Employee'}</h2>
        <form onSubmit={handleSubmit}>
          {isEdit && (
            <div className="form-group">
              <label htmlFor="EMPLOYEE_ID">Employee ID</label>
              <input
                type="text"
                id="EMPLOYEE_ID"
                name="EMPLOYEE_ID"
                value={formData.EMPLOYEE_ID}
                onChange={handleChange}
                readOnly
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="NAME_ONE">First Name</label>
            <input
              type="text"
              id="NAME_ONE"
              name="NAME_ONE"
              value={formData.NAME_ONE}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="NAME_TWO">Last Name</label>
            <input
              type="text"
              id="NAME_TWO"
              name="NAME_TWO"
              value={formData.NAME_TWO}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="EMAIL">Email</label>
            <input
              type="email"
              id="EMAIL"
              name="EMAIL"
              value={formData.EMAIL}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="AGE">Age</label>
            <input
              type="number"
              id="AGE"
              name="AGE"
              value={formData.AGE}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="JOINING_DATE">Joining Date</label>
            <input
              type="date"
              id="JOINING_DATE"
              name="JOINING_DATE"
              value={formData.JOINING_DATE}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="IS_ACTIVE_Y_N">Is Active</label>
            <select
              id="IS_ACTIVE_Y_N"
              name="IS_ACTIVE_Y_N"
              value={formData.IS_ACTIVE_Y_N}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Y">Yes</option>
              <option value="N">No</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">
              {isEdit ? 'Update' : 'Add'}
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopMenu;
