// Production-ready API utility with error handling and timeout support
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const API_USERS_ENDPOINT = `${API_BASE_URL}/users`;
const REQUEST_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000', 10);

/**
 * Helper function to add request timeout
 */
const fetchWithTimeout = (url, options = {}, timeout = REQUEST_TIMEOUT) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeout)
    ),
  ]);
};

/**
 * Handle API response and errors
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.message || `HTTP ${response.status}: ${response.statusText}`;
    throw new Error(errorMessage);
  }
  return response.json();
};

/**
 * Fetch all users from API
 */
export const fetchUsers = async () => {
  try {
    const response = await fetchWithTimeout(API_USERS_ENDPOINT);
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw new Error(
      error.message === 'Request timeout'
        ? 'Request timed out. Please check your connection.'
        : `Failed to fetch users: ${error.message}`
    );
  }
};

/**
 * Create a new user
 */
export const createUser = async (userData) => {
  try {
    const response = await fetchWithTimeout(API_USERS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to create user:', error);
    throw new Error(
      error.message === 'Request timeout'
        ? 'Request timed out. Please try again.'
        : `Failed to create user: ${error.message}`
    );
  }
};

/**
 * Update an existing user
 */
export const updateUser = async (userId, userData) => {
  try {
    const response = await fetchWithTimeout(`${API_USERS_ENDPOINT}/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to update user:', error);
    throw new Error(
      error.message === 'Request timeout'
        ? 'Request timed out. Please try again.'
        : `Failed to update user: ${error.message}`
    );
  }
};

/**
 * Delete a user
 */
export const deleteUser = async (userId) => {
  try {
    const response = await fetchWithTimeout(`${API_USERS_ENDPOINT}/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to delete user:', error);
    throw new Error(
      error.message === 'Request timeout'
        ? 'Request timed out. Please try again.'
        : `Failed to delete user: ${error.message}`
    );
  }
};
