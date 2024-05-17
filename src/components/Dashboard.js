// Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import inventoryService from '../services/inventoryService';
import './Dashboard.css';

const Dashboard = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const data = await inventoryService.fetchInventoryData();
        setInventoryData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching inventory data:', error);
        setLoading(false);
      }
    };

    fetchInventoryData();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3>Inventory Overview</h3>
          <div className="inventory-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {inventoryData.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="dashboard-links">
            <Link to="/Equipment-details">Equipment Details</Link>
            <Link to="/data-entry">Data Entry</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
