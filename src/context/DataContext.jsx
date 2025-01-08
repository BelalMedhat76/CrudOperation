

// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const DataContext = createContext();

// const DataProvider = ({ children }) => {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage] = useState(5); // Customize rows per page

//   // Fetch Data from API
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get('https://aseer.aait.com.sa:4801/API/D9F4BC3B728D4BA7BB3E8FC1EB43FD45/Test/Custom/PrcEmployeeDataSel');
//         console.log('API Response:', response.data); // Log the full response data
//         console.log('DATA:', response.data.DATA); // Log the DATA object
//         console.log('REF_ID:', response.data.DATA.REF_ID); // Log the REF_ID array
  
//         // Check if the API returns data in the expected format
//         if (response.data.DATA && Array.isArray(response.data.DATA.REF_ID)) {
//           const employeeData = response.data.DATA.REF_ID; // Access the REF_ID array for employee data
//           setData(employeeData); // Set employee data
//           setFilteredData(employeeData); // Initialize filtered data with fetched data
//         } else {
//           setError('Fetched data is not in the expected format');
//         }
//       } catch (err) {
//         setError('Failed to fetch data. Please try again.');
//       } finally {
//         setLoading(false); // Ensure loading is set to false after fetch attempt
//       }
//     };
  
//     fetchData();
//   }, []);
  

//   // Provide context
//   return (
//     <DataContext.Provider
//       value={{
//         data,
//         filteredData,
//         setFilteredData,
//         loading,
//         error,
//         currentPage,
//         setCurrentPage, // Make sure this is passed down
//         rowsPerPage,
//       }}
//     >
//       {children}
//     </DataContext.Provider>
//   );
// };

// export { DataContext, DataProvider };


// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const DataContext = createContext();

// const DataProvider = ({ children }) => {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage] = useState(5); // Customize rows per page

//   // Fetch Data from API
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           'https://aseer.aait.com.sa:4801/API/D9F4BC3B728D4BA7BB3E8FC1EB43FD45/Test/Custom/PrcEmployeeDataSel'
//         );
//         console.log('API Response:', response.data);

//         // Check if the API returns data in the expected format
//         if (response.data.DATA && Array.isArray(response.data.DATA.REF_ID)) {
//           const employeeData = response.data.DATA.REF_ID; // Access the REF_ID array for employee data
//           setData(employeeData); // Set employee data
//           setFilteredData(employeeData); // Initialize filtered data with fetched data
//         } else {
//           setError('Fetched data is not in the expected format');
//         }
//       } catch (err) {
//         console.error('Error fetching data:', err);
//         setError('Failed to fetch data. Please try again.');
//       } finally {
//         setLoading(false); // Ensure loading is set to false after fetch attempt
//       }
//     };

//     fetchData();
//   }, []);

//   // Add new employee function
//   const addEmployee = (newEmployee) => {
//     setData((prevData) => [...prevData, newEmployee]); // Add to the main data state
//     setFilteredData((prevFilteredData) => [...prevFilteredData, newEmployee]); // Add to the filtered data state
//   };

//   // Delete employee function
//   const deleteEmployee = async (employeeId) => {
//     try {
//       const response = await fetch(
//         'https://aseer.aait.com.sa:4801/API/D9F4BC3B728D4BA7BB3E8FC1EB43FD45/Test/Custom/PrcEmployeeDataDel',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ EMPLOYEE_ID: employeeId }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error('Failed to delete employee from API');
//       }

//       // Remove the employee from the local state
//       setData((prevData) => prevData.filter((employee) => employee.EMPLOYEE_ID !== employeeId));
//       setFilteredData((prevFilteredData) =>
//         prevFilteredData.filter((employee) => employee.EMPLOYEE_ID !== employeeId)
//       );

//       alert('Employee deleted successfully!');
//     } catch (error) {
//       console.error('Error deleting employee:', error);
//       alert('Failed to delete employee. Please try again.');
//     }
//   };

//   // Provide context
//   return (
//     <DataContext.Provider
//       value={{
//         data,
//         setData,
//         filteredData,
//         setFilteredData,
//         loading,
//         error,
//         currentPage,
//         setCurrentPage,
//         rowsPerPage,
//         addEmployee, // Add employee function
//         deleteEmployee, // Delete employee function
//       }}
//     >
//       {children}
//     </DataContext.Provider>
//   );
// };

// export { DataContext, DataProvider };


import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5); // Customize rows per page

  // Fetch Data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://aseer.aait.com.sa:4801/API/D9F4BC3B728D4BA7BB3E8FC1EB43FD45/Test/Custom/PrcEmployeeDataSel'
        );
        console.log('API Response:', response.data);

        // Check if the API returns data in the expected format
        if (response.data.DATA && Array.isArray(response.data.DATA.REF_ID)) {
          const employeeData = response.data.DATA.REF_ID; // Access the REF_ID array for employee data
          setData(employeeData); // Set employee data
          setFilteredData(employeeData); // Initialize filtered data with fetched data
        } else {
          setError('Fetched data is not in the expected format');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data. Please try again.');
      } finally {
        setLoading(false); // Ensure loading is set to false after fetch attempt
      }
    };

    fetchData();
  }, []);

  // Add new employee function
  const addEmployee = (newEmployee) => {
    setData((prevData) => [newEmployee, ...prevData]); // Add to the top of the main data state
    setFilteredData((prevFilteredData) => [newEmployee, ...prevFilteredData]); // Add to the top of the filtered data state
    setCurrentPage(1); // Reset the page to the first page
  };

  // Delete employee function
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

      // Remove the employee from the local state
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

  // Provide context
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
        addEmployee, // Add employee function
        deleteEmployee, // Delete employee function
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };

