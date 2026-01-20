import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "./utils/api";
import { User, Mail, Phone, Globe, MapPin, Building2, AlertCircle, CheckCircle, ArrowLeft, Save } from "lucide-react";
import "./styles/AddUser.css";

const AddUser = () => {
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [suite, setSuite] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [catchPhrase, setCatchPhrase] = useState('');
  const [bs, setBs] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => {
    if (!id.trim()) return 'ID is required';
    if (!name.trim()) return 'Name is required';
    if (!username.trim()) return 'Username is required';
    if (!email.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Email is invalid';
    if (!city.trim()) return 'City is required';
    return '';
  };

  const handleCreateUser = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {
      setLoading(true);
      const userData = {
        id,
        name,
        username,
        email,
        address: {
          street,
          suite,
          city,
          zipcode,
          geo: {
            lat,
            lng
          }
        },
        phone,
        website,
        company: {
          name: companyName,
          catchPhrase,
          bs
        }
      };

      const data = await createUser(userData);
      setSuccessMessage("User added successfully! Redirecting...");
      
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setErrorMessage(`Failed to add user: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

    return (
        <div className="add-user-container">
            <div className="add-user-wrapper">
                <div className="form-page-header">
                    <h1 className="form-page-title">
                        <User size={32} style={{ display: 'inline', marginRight: '10px' }} />
                        Add New User
                    </h1>
                    <p className="form-page-subtitle">Create a new user account with complete information</p>
                </div>

                {/* Success Message */}
                {successMessage && (
                    <div className="form-success-alert">
                        <CheckCircle size={20} style={{ marginRight: '10px', flexShrink: 0 }} />
                        <span>{successMessage}</span>
                    </div>
                )}

                {/* Error Message */}
                {errorMessage && (
                    <div className="form-error-alert">
                        <AlertCircle size={20} style={{ marginRight: '10px', flexShrink: 0 }} />
                        <span>{errorMessage}</span>
                    </div>
                )}

                <div className="add-user-form">
                    {/* Basic Information Section */}
                    <div className="form-section">
                        <h2 className="form-section-header">
                            <User size={24} style={{ marginRight: '8px' }} />
                            Basic Information
                        </h2>

                        <div className="form-row-2">
                            <div className="form-group">
                                <label className="form-label">ID <span className="required">*</span></label>
                                <input
                                    type="text"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                    placeholder="Enter unique ID"
                                    className="form-input"
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Full Name <span className="required">*</span></label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter full name"
                                    className="form-input"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="form-row-2">
                            <div className="form-group">
                                <label className="form-label">Username <span className="required">*</span></label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter username"
                                    className="form-input"
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    <Mail size={16} style={{ display: 'inline', marginRight: '5px' }} />
                                    Email <span className="required">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter email address"
                                    className="form-input"
                                    disabled={loading}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Address Section */}
                    <div className="form-section">
                        <h2 className="form-section-header">
                            <MapPin size={24} style={{ marginRight: '8px' }} />
                            Address
                        </h2>

                        <div className="form-row-2">
                            <div className="form-group">
                                <label className="form-label">Street</label>
                                <input
                                    type="text"
                                    value={street}
                                    onChange={(e) => setStreet(e.target.value)}
                                    placeholder="Enter street address"
                                    className="form-input"
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Suite</label>
                                <input
                                    type="text"
                                    value={suite}
                                    onChange={(e) => setSuite(e.target.value)}
                                    placeholder="Enter suite/apartment"
                                    className="form-input"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="form-row-2">
                            <div className="form-group">
                                <label className="form-label">City <span className="required">*</span></label>
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="Enter city"
                                    className="form-input"
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Zipcode</label>
                                <input
                                    type="text"
                                    value={zipcode}
                                    onChange={(e) => setZipcode(e.target.value)}
                                    placeholder="Enter zipcode"
                                    className="form-input"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="form-row-2">
                            <div className="form-group">
                                <label className="form-label">Latitude</label>
                                <input
                                    type="text"
                                    value={lat}
                                    onChange={(e) => setLat(e.target.value)}
                                    placeholder="Enter latitude"
                                    className="form-input"
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Longitude</label>
                                <input
                                    type="text"
                                    value={lng}
                                    onChange={(e) => setLng(e.target.value)}
                                    placeholder="Enter longitude"
                                    className="form-input"
                                    disabled={loading}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Information Section */}
                    <div className="form-section">
                        <h2 className="form-section-header">
                            <Phone size={24} style={{ marginRight: '8px' }} />
                            Contact Information
                        </h2>

                        <div className="form-row-2">
                            <div className="form-group">
                                <label className="form-label">Phone</label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Enter phone number"
                                    className="form-input"
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    <Globe size={16} style={{ display: 'inline', marginRight: '5px' }} />
                                    Website
                                </label>
                                <input
                                    type="url"
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                    placeholder="Enter website URL"
                                    className="form-input"
                                    disabled={loading}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Company Information Section */}
                    <div className="form-section">
                        <h2 className="form-section-header">
                            <Building2 size={24} style={{ marginRight: '8px' }} />
                            Company Information
                        </h2>

                        <div className="form-row-full">
                            <div className="form-group">
                                <label className="form-label">Company Name</label>
                                <input
                                    type="text"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    placeholder="Enter company name"
                                    className="form-input"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="form-row-2">
                            <div className="form-group">
                                <label className="form-label">Catch Phrase</label>
                                <input
                                    type="text"
                                    value={catchPhrase}
                                    onChange={(e) => setCatchPhrase(e.target.value)}
                                    placeholder="Enter company catch phrase"
                                    className="form-input"
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">BS</label>
                                <input
                                    type="text"
                                    value={bs}
                                    onChange={(e) => setBs(e.target.value)}
                                    placeholder="Enter business statement"
                                    className="form-input"
                                    disabled={loading}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="form-actions">
                        <button
                            onClick={handleCreateUser}
                            className="btn-add"
                            disabled={loading}
                        >
                            <Save size={20} style={{ display: 'inline', marginRight: '8px' }} />
                            {loading ? 'Creating User...' : 'Create User'}
                        </button>

                        <Link to="/" className="btn-back">
                            <ArrowLeft size={20} style={{ display: 'inline', marginRight: '8px' }} />
                            Back to List
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddUser;

