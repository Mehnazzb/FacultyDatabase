/**
 * Main Application Module
 * Handles the main landing page functionality
 */

document.addEventListener('DOMContentLoaded', function () {
    // State
    let currentPage = 1;
    let totalPages = 1;
    let currentFilters = {};

    // DOM Elements
    const facultyGrid = document.getElementById('facultyGrid');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const noResults = document.getElementById('noResults');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const designationFilter = document.getElementById('designationFilter');
    const statusFilter = document.getElementById('statusFilter');
    const clearFilters = document.getElementById('clearFilters');
    const prevPage = document.getElementById('prevPage');
    const nextPage = document.getElementById('nextPage');
    const pageInfo = document.getElementById('pageInfo');
    const facultyModal = document.getElementById('facultyModal');
    const closeModal = document.getElementById('closeModal');
    const modalBody = document.getElementById('modalBody');

    // Statistics Elements
    const totalFaculty = document.getElementById('totalFaculty');
    const professorCount = document.getElementById('professorCount');
    const publicationCount = document.getElementById('publicationCount');
    const activeCount = document.getElementById('activeCount');

    // Initialize
    init();

    function init() {
        loadStats();
        loadFaculty();
        setupEventListeners();
    }

    function setupEventListeners() {
        // Search
        searchBtn.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSearch();
        });

        // Filters
        designationFilter.addEventListener('change', handleFilterChange);
        statusFilter.addEventListener('change', handleFilterChange);
        clearFilters.addEventListener('click', handleClearFilters);

        // Pagination
        prevPage.addEventListener('click', () => changePage(-1));
        nextPage.addEventListener('click', () => changePage(1));

        // Modal
        closeModal.addEventListener('click', closeModalFn);
        facultyModal.addEventListener('click', (e) => {
            if (e.target === facultyModal) closeModalFn();
        });

        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModalFn();
        });
    }

    async function loadStats() {
        try {
            const response = await API.getStats();
            if (response.success) {
                const stats = response.data;
                totalFaculty.textContent = stats.totalFaculty || 0;
                publicationCount.textContent = stats.totalPublications || 0;

                // Find professor count
                const professors = stats.byDesignation?.find(d => d._id === 'Professor');
                professorCount.textContent = professors?.count || 0;

                // Find active count
                const active = stats.byStatus?.find(s => s._id === 'Active');
                activeCount.textContent = active?.count || 0;
            }
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    }

    async function loadFaculty() {
        showLoading();

        try {
            const params = {
                page: currentPage,
                limit: CONFIG.DEFAULT_PAGE_SIZE,
                ...currentFilters
            };

            const response = await API.getFaculty(params);

            if (response.success) {
                totalPages = response.totalPages || 1;
                renderFaculty(response.data);
                updatePagination();
            }
        } catch (error) {
            console.error('Error loading faculty:', error);
            showNoResults();
        }
    }

    function renderFaculty(faculty) {
        hideLoading();

        if (!faculty || faculty.length === 0) {
            showNoResults();
            return;
        }

        noResults.style.display = 'none';
        facultyGrid.innerHTML = '';

        faculty.forEach(member => {
            const card = createFacultyCard(member);
            facultyGrid.appendChild(card);
        });
    }

    function createFacultyCard(member) {
        const card = document.createElement('div');
        card.className = 'faculty-card';
        card.onclick = () => showFacultyDetail(member._id);

        const initials = getInitials(member.name);
        const statusClass = getStatusClass(member.status);

        card.innerHTML = `
            <div class="faculty-card-header">
                <div class="faculty-avatar">${initials}</div>
                <h3>${escapeHtml(member.name)}</h3>
                <p class="designation">${escapeHtml(member.designation)}</p>
            </div>
            <div class="faculty-card-body">
                <div class="faculty-info-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span>${escapeHtml(member.email)}</span>
                </div>
                ${member.phone ? `
                <div class="faculty-info-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span>${escapeHtml(member.phone)}</span>
                </div>
                ` : ''}
                <div class="faculty-info-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                        <path d="M6 12v5c0 2.21 3.582 4 8 4s8-1.79 8-4v-5"></path>
                    </svg>
                    <span>${escapeHtml(member.department)}</span>
                </div>
            </div>
            <div class="faculty-card-footer">
                <span class="badge ${statusClass}">${escapeHtml(member.status)}</span>
                <span class="employee-id">${escapeHtml(member.employeeId)}</span>
            </div>
        `;

        return card;
    }

    async function showFacultyDetail(id) {
        // Redirect to detail page
        window.location.href = `faculty-detail.html?id=${id}`;
    }

    function closeModalFn() {
        facultyModal.classList.remove('active');
    }

    function handleSearch() {
        const searchTerm = searchInput.value.trim();
        currentFilters.search = searchTerm || undefined;
        currentPage = 1;
        loadFaculty();
    }

    function handleFilterChange() {
        currentFilters.designation = designationFilter.value || undefined;
        currentFilters.status = statusFilter.value || undefined;
        currentPage = 1;
        loadFaculty();
    }

    function handleClearFilters() {
        searchInput.value = '';
        designationFilter.value = '';
        statusFilter.value = '';
        currentFilters = {};
        currentPage = 1;
        loadFaculty();
    }

    function changePage(delta) {
        const newPage = currentPage + delta;
        if (newPage >= 1 && newPage <= totalPages) {
            currentPage = newPage;
            loadFaculty();
        }
    }

    function updatePagination() {
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        prevPage.disabled = currentPage <= 1;
        nextPage.disabled = currentPage >= totalPages;
    }

    function showLoading() {
        loadingSpinner.style.display = 'flex';
        facultyGrid.style.display = 'none';
        noResults.style.display = 'none';
    }

    function hideLoading() {
        loadingSpinner.style.display = 'none';
        facultyGrid.style.display = 'grid';
    }

    function showNoResults() {
        loadingSpinner.style.display = 'none';
        facultyGrid.style.display = 'none';
        noResults.style.display = 'block';
    }

    // Helper Functions
    function getInitials(name) {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    }

    function getStatusClass(status) {
        switch (status) {
            case 'Active': return 'badge-active';
            case 'On Leave': return 'badge-leave';
            case 'Retired': return 'badge-retired';
            default: return '';
        }
    }

    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
