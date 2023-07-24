import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import logo from '../src/img/vijay imag.jpeg'
import { FaUserFriends, FaChartBar, FaCog } from 'react-icons/fa';

function App() {
  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState('');

  useEffect(() => {
    async function fetching() {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      setData(response.data);
    }
    fetching();
  }, []);

  const searchHandler = (e) => {
    setInputData(e.target.value);
  };

  return (
    <div className="container">
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt="logo" /> 
        </div>
      </div>

     
      <div className="search">
        <input placeholder='Search' value={inputData} onChange={searchHandler} />
      </div>

   

    
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {inputData === '' ? data.map((item, index) => {
              const { name, username, email } = item;
              return (
                <tr key={index}>
                  <td>{name}</td>
                  <td>{username}</td>
                  <td>{email}</td>
                </tr>
              );
            }) : data.filter((item) => {
              const { name, username, email } = item;
              const input = inputData.toLowerCase();
              return name.toLowerCase().includes(input) || username.toLowerCase().includes(input) || email.toLowerCase().includes(input);
            }).map((item, index) => {
              const { name, username, email } = item;
              return (
                <tr key={index}>
                  <td>{name}</td>
                  <td>{username}</td>
                  <td>{email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="features">
        <div className="feature">
          <FaUserFriends className="icon" />
          <p>Connect with other users</p>
        </div>
        <div className="feature">
          <FaChartBar className="icon" />
          <p>Analyze your data</p>
        </div>
        <div className="feature">
          <FaCog className="icon" />
          <p>Customize your settings</p>
        </div>
      </div>
    </div>
  );
}

export default App;
