import React, { useEffect, useRef, useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { deleteUser, updateUser } from '../utils/api';
import '../styles/UserDetail.css';

const UserDetail = ({ user, onClose, onUpdate, onDelete }) => {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle keyboard events (ESC to close, focus management)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    // Focus close button when modal opens
    if (closeButtonRef.current && !isEditing) {
      closeButtonRef.current.focus();
    }

    // Cleanup
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
    setError(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(user);
    setError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    
    if (keys.length > 1) {
      setEditData(prev => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: value
        }
      }));
    } else {
      setEditData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateUser(user.id, editData);
      onUpdate(response);
      setIsEditing(false);
    } catch (err) {
      setError(`Failed to update user: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${user.name}? This action cannot be undone.`)) {
      setLoading(true);
      setError(null);
      try {
        await deleteUser(user.id);
        onDelete(user.id);
        onClose();
      } catch (err) {
        setError(`Failed to delete user: ${err.message}`);
        setLoading(false);
      }
    }
  };

  if (!user) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        ref={modalRef}
      >
        <button
          className="modal-close"
          onClick={onClose}
          ref={closeButtonRef}
          aria-label="Close modal"
          title="Press ESC to close"
        >
          &times;
        </button>

        {error && (
          <div className="modal-error">
            <span>{error}</span>
            <button className="modal-error-close" onClick={() => setError(null)}>×</button>
          </div>
        )}

        <div className="modal-header">
          <div>
            <h2 className="modal-title" id="modal-title">
              {isEditing ? `Edit ${user.name}` : user.name}
            </h2>
            <p className="modal-subtitle">{user.username}</p>
          </div>
          {!isEditing && (
            <div className="modal-actions">
              <button 
                className="btn-modal-edit" 
                onClick={handleEdit}
                aria-label="Edit user"
              >
                <Edit2 size={18} style={{ display: 'inline', marginRight: '5px' }} /> Edit
              </button>
              <button 
                className="btn-modal-delete" 
                onClick={handleDelete}
                aria-label="Delete user"
              >
                <Trash2 size={18} style={{ display: 'inline', marginRight: '5px' }} /> Delete
              </button>
            </div>
          )}
        </div>

        <div className="modal-body">
          {isEditing ? (
            <div className="edit-form">
              <div className="form-section">
                <h3 className="section-title">Basic Information</h3>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={editData.username}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">Contact Information</h3>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={editData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Website</label>
                  <input
                    type="text"
                    name="website"
                    value={editData.website}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">Address</h3>
                <div className="form-group">
                  <label className="form-label">Street</label>
                  <input
                    type="text"
                    name="address.street"
                    value={editData.address?.street || ''}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    name="address.city"
                    value={editData.address?.city || ''}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Zipcode</label>
                  <input
                    type="text"
                    name="address.zipcode"
                    value={editData.address?.zipcode || ''}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">Company</h3>
                <div className="form-group">
                  <label className="form-label">Company Name</label>
                  <input
                    type="text"
                    name="company.name"
                    value={editData.company?.name || ''}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button 
                  className="btn-save" 
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button 
                  className="btn-cancel" 
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="detail-section">
                <h3 className="section-title">Contact Information</h3>
                <div className="detail-row">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{user.email}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Phone:</span>
                  <span className="detail-value">{user.phone}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Website:</span>
                  <span className="detail-value">
                    <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">
                      {user.website}
                    </a>
                  </span>
                </div>
              </div>

              <div className="detail-section">
                <h3 className="section-title">Address</h3>
                <div className="detail-row">
                  <span className="detail-label">Street:</span>
                  <span className="detail-value">{user.address?.street}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Suite:</span>
                  <span className="detail-value">{user.address?.suite}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">City:</span>
                  <span className="detail-value">{user.address?.city}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Zipcode:</span>
                  <span className="detail-value">{user.address?.zipcode}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Coordinates:</span>
                  <span className="detail-value">
                    {user.address?.geo?.lat}, {user.address?.geo?.lng}
                  </span>
                </div>
              </div>

              <div className="detail-section">
                <h3 className="section-title">Company</h3>
                <div className="detail-row">
                  <span className="detail-label">Name:</span>
                  <span className="detail-value">{user.company?.name}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Catch Phrase:</span>
                  <span className="detail-value">{user.company?.catchPhrase}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">BS:</span>
                  <span className="detail-value">{user.company?.bs}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
