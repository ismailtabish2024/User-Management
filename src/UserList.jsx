import React, { useEffect, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { Users, Search, ArrowDownUp, Zap, AlertCircle, RotateCcw, Plus } from "lucide-react";
import Table from "./components/Table";
import UserDetail from "./components/UserDetail";
import DashboardHeader from "./components/DashboardHeader";
import StatsCard from "./components/StatsCard";
import { debounce } from "./utils/debounce";
import "./styles/UserList.css";

const UserList = () => {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortAlphabetically, setSortAlphabetically] = useState(true);
  const debouncedSearchRef = useRef(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = "http://localhost:3001/users";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      const data = await response.json();
      setUserData(data);
      setFilteredData(applyFiltersAndSort(data, searchTerm, sortAlphabetically));
    } catch (error) {
      setError(`Failed to fetch users: ${error.message}`);
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Apply both search and sort
  const applyFiltersAndSort = (data, term, sort) => {
    let result = data;

    // Apply search filter
    if (term.trim() !== "") {
      result = data.filter((user) =>
        user.name.toLowerCase().includes(term.toLowerCase())
      );
    }

    // Apply alphabetical sort
    if (sort) {
      result = [...result].sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
      );
    }

    return result;
  };

  // Debounced search handler
  const handleDebouncedSearch = useCallback((term) => {
    setFilteredData(applyFiltersAndSort(userData, term, sortAlphabetically));
  }, [userData, sortAlphabetically]);

  // Initialize debounced function
  useEffect(() => {
    debouncedSearchRef.current = debounce(handleDebouncedSearch, 300);
  }, [handleDebouncedSearch]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (debouncedSearchRef.current) {
      debouncedSearchRef.current(term);
    }
  };

  const toggleSort = () => {
    setSortAlphabetically((prev) => {
      const newSort = !prev;
      setFilteredData(applyFiltersAndSort(userData, searchTerm, newSort));
      return newSort;
    });
  };

  return (
    <div className="dashboard">
      <DashboardHeader totalUsers={userData.length} />

      <div className="dashboard-container">
        {/* Stats Cards */}
        <div className="stats-grid">
          <StatsCard
            icon={<Users size={32} />}
            title="Total Users"
            value={userData.length}
            description="All registered users"
            color="blue"
          />
          <StatsCard
            icon={<Search size={32} />}
            title="Results Found"
            value={filteredData.length}
            description="Based on your search"
            color="green"
          />
          <StatsCard
            icon={<ArrowDownUp size={32} />}
            title="Sort"
            value={sortAlphabetically ? "A-Z" : "Off"}
            description="Alphabetical order"
            color="purple"
          />
          <StatsCard
            icon={<Zap size={32} />}
            title="Status"
            value={loading ? "Loading..." : "Active"}
            description="Dashboard status"
            color="orange"
          />
        </div>

        {/* Main Content */}
        <div className="dashboard-content">
          <div className="content-header">
            <h2 className="content-title">User Directory</h2>
            <div className="header-actions">
              <button className="btn-refresh" onClick={fetchUsers} disabled={loading}>
                {loading ? <><RotateCcw size={18} style={{ display: 'inline', marginRight: '5px' }} /> Refreshing...</> : <><RotateCcw size={18} style={{ display: 'inline', marginRight: '5px' }} /> Refresh</>}
              </button>
              <Link to="/add-user">
                <button className="btn-add-user">
                  <Plus size={18} style={{ display: 'inline', marginRight: '5px' }} /> Add New User
                </button>
              </Link>
            </div>
          </div>

          <div className="search-section">
            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Search by user name..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
                aria-label="Search users by name"
              />
              <button
                className="btn-sort"
                onClick={toggleSort}
                aria-label={`Sort alphabetically ${sortAlphabetically ? "enabled" : "disabled"}`}
                title="Click to toggle alphabetical sorting"
              >
                <ArrowDownUp size={18} style={{ display: 'inline' }} /> {sortAlphabetically ? "A-Z" : "Unsorted"}
              </button>
            </div>
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon"><AlertCircle size={20} style={{ display: 'inline' }} /></span>
              <span>{error}</span>
              <button onClick={fetchUsers} className="error-retry">Retry</button>
            </div>
          )}

          {loading && (
            <div className="loading-indicator">
              <div className="spinner"></div>
              <p>Loading users...</p>
            </div>
          )}

          {!loading && !error && (
            <>
              <p className="results-count">
                Showing {filteredData.length} of {userData.length} user{userData.length !== 1 ? "s" : ""}
              </p>
              <Table userData={filteredData} onUserClick={setSelectedUser} selectedUserId={selectedUser?.id} />
            </>
          )}

          {selectedUser && (
            <UserDetail
              user={selectedUser}
              onClose={() => setSelectedUser(null)}
              onUpdate={(updatedUser) => {
                setUserData(userData.map(u => u.id === updatedUser.id ? updatedUser : u));
                setFilteredData(filteredData.map(u => u.id === updatedUser.id ? updatedUser : u));
                setSelectedUser(null);
              }}
              onDelete={(deletedUserId) => {
                const newUserData = userData.filter(u => u.id !== deletedUserId);
                setUserData(newUserData);
                setFilteredData(filteredData.filter(u => u.id !== deletedUserId));
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
