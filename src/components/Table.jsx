import React from 'react';
import { Eye } from 'lucide-react';
import '../styles/Table.css';

const Table = ({ userData, onUserClick, selectedUserId }) => {
  return (
    <div className="table-wrapper">
      <div className="table-container">
        <table className="data-table">
          <thead className="table-head">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Website</th>
              <th>City</th>
              <th>Company</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {userData && userData.length > 0 ? (
              userData.map((user, index) => (
                <tr
                  key={user.id}
                  className={`table-row ${index % 2 === 0 ? 'even' : 'odd'} ${
                    selectedUserId === user.id ? 'selected' : ''
                  }`}
                >
                  <td className="table-cell">{user.id}</td>
                  <td className="table-cell font-medium">{user.name}</td>
                  <td className="table-cell">{user.username}</td>
                  <td className="table-cell email">{user.email}</td>
                  <td className="table-cell">{user.phone || 'N/A'}</td>
                  <td className="table-cell">
                    {user.website ? (
                      <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">
                        {user.website}
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="table-cell">{user.address?.city || 'N/A'}</td>
                  <td className="table-cell">{user.company?.name || 'N/A'}</td>
                  <td className="table-cell action">
                    <button 
                      className="btn-view-details"
                      onClick={() => onUserClick(user)}
                      aria-label={`View details for ${user.name}`}
                    >
                      <Eye size={18} style={{ display: 'inline', marginRight: '5px' }} /> View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="table-cell table-empty">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
