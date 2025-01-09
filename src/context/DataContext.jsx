


import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://aseer.aait.com.sa:4801/API/D9F4BC3B728D4BA7BB3E8FC1EB43FD45/Test/Custom/PrcEmployeeDataSel'
        );
        console.log('API Response:', response.data);


        if (response.data.DATA && Array.isArray(response.data.DATA.REF_ID)) {
          const employeeData = response.data.DATA.REF_ID;
          setData(employeeData);
          setFilteredData(employeeData);
        } else {
          setError('Fetched data is not in the expected format');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const addEmployee = (newEmployee) => {
    setData((prevData) => [newEmployee, ...prevData]);
    setFilteredData((prevFilteredData) => [newEmployee, ...prevFilteredData]);
    setCurrentPage(1);
  };

  const deleteEmployee = async (employeeId) => {
    try {
      const response = await fetch(
        'https://aseer.aait.com.sa:4801/API/D9F4BC3B728D4BA7BB3E8FC1EB43FD45/Test/Custom/PrcEmployeeDataDel',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ EMPLOYEE_ID: employeeId }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete employee from API');
      }


      setData((prevData) => prevData.filter((employee) => employee.EMPLOYEE_ID !== employeeId));
      setFilteredData((prevFilteredData) =>
        prevFilteredData.filter((employee) => employee.EMPLOYEE_ID !== employeeId)
      );

      alert('Employee deleted successfully!');
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Failed to delete employee. Please try again.');
    }
  };

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        filteredData,
        setFilteredData,
        loading,
        error,
        currentPage,
        setCurrentPage,
        rowsPerPage,
        addEmployee,
        deleteEmployee,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };

