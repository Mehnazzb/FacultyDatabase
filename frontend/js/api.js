/**
 * API Service Module
 * Handles all HTTP requests to the backend API
 */

const API = {
    /**
     * Make an HTTP request to the API
     * @param {string} endpoint - API endpoint
     * @param {Object} options - Fetch options
     * @returns {Promise<Object>} Response data
     */
    async request(endpoint, options = {}) {
        const url = `${CONFIG.API_BASE_URL}${endpoint}`;

        // Default headers
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        // Add auth token if available
        const token = localStorage.getItem(CONFIG.STORAGE_KEYS.TOKEN);
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers
            });

            const data = await response.json();

            // Handle unauthorized responses
            if (response.status === 401) {
                Auth.logout();
                window.location.href = 'login.html';
                throw new Error('Session expired. Please login again.');
            }

            if (!response.ok) {
                throw new Error(data.message || 'An error occurred');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    /**
     * GET request
     */
    get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    },

    /**
     * POST request
     */
    post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    /**
     * PUT request
     */
    put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },

    /**
     * DELETE request
     */
    delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    },

    // =====================================================
    // Faculty API Methods
    // =====================================================

    /**
     * Get all faculty with optional filters
     */
    getFaculty(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return this.get(`/faculty${queryString ? '?' + queryString : ''}`);
    },

    /**
     * Get faculty by ID
     */
    getFacultyById(id) {
        return this.get(`/faculty/${id}`);
    },

    /**
     * Create new faculty
     */
    createFaculty(data) {
        return this.post('/faculty', data);
    },

    /**
     * Update faculty
     */
    updateFaculty(id, data) {
        return this.put(`/faculty/${id}`, data);
    },

    /**
     * Delete faculty
     */
    deleteFaculty(id) {
        return this.delete(`/faculty/${id}`);
    },

    /**
     * Get faculty statistics
     */
    getStats() {
        return this.get('/faculty/stats');
    },

    /**
     * Search faculty
     */
    searchFaculty(query) {
        return this.get(`/faculty/search?q=${encodeURIComponent(query)}`);
    },

    // =====================================================
    // Auth API Methods
    // =====================================================

    /**
     * Login
     */
    login(username, password) {
        return this.post('/auth/login', { username, password });
    },

    /**
     * Register
     */
    register(data) {
        return this.post('/auth/register', data);
    },

    /**
     * Get current user
     */
    getMe() {
        return this.get('/auth/me');
    },

    /**
     * Update profile
     */
    updateProfile(data) {
        return this.put('/auth/me', data);
    },

    /**
     * Change password
     */
    changePassword(currentPassword, newPassword) {
        return this.put('/auth/password', { currentPassword, newPassword });
    }
};
