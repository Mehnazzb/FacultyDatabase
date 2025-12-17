/**
 * Authentication Module
 * Handles user authentication and session management
 */

const Auth = {
    /**
     * Login user
     * @param {string} username - Username or email
     * @param {string} password - Password
     * @returns {Promise<Object>} Login result
     */
    async login(username, password) {
        try {
            const response = await API.login(username, password);

            if (response.success) {
                // Store token and user data
                localStorage.setItem(CONFIG.STORAGE_KEYS.TOKEN, response.data.token);
                localStorage.setItem(CONFIG.STORAGE_KEYS.USER, JSON.stringify(response.data.user));
            }

            return response;
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Login failed'
            };
        }
    },

    /**
     * Logout user
     */
    logout() {
        localStorage.removeItem(CONFIG.STORAGE_KEYS.TOKEN);
        localStorage.removeItem(CONFIG.STORAGE_KEYS.USER);
    },

    /**
     * Check if user is logged in
     * @returns {boolean}
     */
    isLoggedIn() {
        const token = localStorage.getItem(CONFIG.STORAGE_KEYS.TOKEN);
        return !!token;
    },

    /**
     * Get current user data
     * @returns {Object|null}
     */
    getUser() {
        const userData = localStorage.getItem(CONFIG.STORAGE_KEYS.USER);
        return userData ? JSON.parse(userData) : null;
    },

    /**
     * Get auth token
     * @returns {string|null}
     */
    getToken() {
        return localStorage.getItem(CONFIG.STORAGE_KEYS.TOKEN);
    },

    /**
     * Check if user has specific role
     * @param {string} role - Role to check
     * @returns {boolean}
     */
    hasRole(role) {
        const user = this.getUser();
        return user && user.role === role;
    },

    /**
     * Check if user can edit (admin or editor)
     * @returns {boolean}
     */
    canEdit() {
        const user = this.getUser();
        return user && (user.role === 'admin' || user.role === 'editor');
    },

    /**
     * Check if user is admin
     * @returns {boolean}
     */
    isAdmin() {
        return this.hasRole('admin');
    },

    /**
     * Update UI based on auth state
     */
    updateUI() {
        const isLoggedIn = this.isLoggedIn();
        const user = this.getUser();

        // Login/Logout buttons
        const loginLink = document.getElementById('loginLink');
        const logoutBtn = document.getElementById('logoutBtn');
        const dashboardLink = document.getElementById('dashboardLink');
        const userInfo = document.getElementById('userInfo');

        if (loginLink) {
            loginLink.style.display = isLoggedIn ? 'none' : 'block';
        }

        if (logoutBtn) {
            logoutBtn.style.display = isLoggedIn ? 'block' : 'none';
        }

        if (dashboardLink) {
            dashboardLink.style.display = isLoggedIn ? 'block' : 'none';
        }

        if (userInfo && user) {
            userInfo.textContent = user.name;
        }

        // Logout button handler
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.logout();
                window.location.href = 'index.html';
            });
        }
    },

    /**
     * Require authentication - redirect to login if not logged in
     */
    requireAuth() {
        if (!this.isLoggedIn()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    },

    /**
     * Require admin role
     */
    requireAdmin() {
        if (!this.isLoggedIn() || !this.isAdmin()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }
};

// Initialize auth UI on page load
document.addEventListener('DOMContentLoaded', () => {
    Auth.updateUI();
});
