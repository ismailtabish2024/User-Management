import React from 'react';
import { Users } from 'lucide-react';
import '../styles/DashboardHeader.css';

const DashboardHeader = ({ totalUsers, activeUsers = 0 }) => {
  return (
    <header className="dashboard-header">
      <div className="header-container">
        <div className="header-content">
          <div className="logo-section">
            <h1 className="app-title"><Users size={36} style={{ display: 'inline', marginRight: '10px' }} /> User Management Dashboard</h1>
            <p className="app-subtitle">Manage and organize your users efficiently</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
