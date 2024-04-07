import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/DataTable.css';


const DataTable = ({ user }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let url = 'http://localhost:5000/api/organizations';
      console.log(user);
      if (user && user.role === 'user') {
        let id = user._id;
        url = `http://localhost:5000/api/organizations/${id}`;
      }
      const response = await axios.get(url);
      console.log('Response data:', response.data);
      setData(Array.isArray(response.data) ? response.data : [response.data]);
    };
    fetchData();
  }, [user]);

  console.log(data);

  return (
    <div className="table-container">
      <h2>Organization Details</h2>
      <table>
        <thead>
          <tr>
            <th>Organization Name</th>
            <th>User Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>
              {Array.isArray(item.users) && item.users.length > 0
    ? item.users.map((user, index) => (
        <span key={user._id}>
          {user.username}
          {index !== item.users.length - 1 && <br />}
        </span>
      ))
    : ''}
              </td>
              <td>
              {Array.isArray(item.users) && item.users.length > 0
    ? item.users.map((user, index) => (
        <span key={user._id}>
          {user.email}
          {index !== item.users.length - 1 && <br/>}
        </span>
      ))
    : ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
