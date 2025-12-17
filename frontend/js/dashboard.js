/**
 * Dashboard Module
 * Handles the admin dashboard functionality
 */

document.addEventListener('DOMContentLoaded', function () {
    // Check authentication
    if (!Auth.requireAuth()) return;

    // State
    let currentPage = 1;
    let totalPages = 1;
    let facultyData = [];
    let deleteTargetId = null;

    // DOM Elements
    const userName = document.getElementById('userName');
    const tableLoading = document.getElementById('tableLoading');
    const tableContainer = document.getElementById('tableContainer');
    const facultyTableBody = document.getElementById('facultyTableBody');
    const tablePagination = document.getElementById('tablePagination');
    const tableSearch = document.getElementById('tableSearch');
    const tablePrevPage = document.getElementById('tablePrevPage');
    const tableNextPage = document.getElementById('tableNextPage');
    const tablePageInfo = document.getElementById('tablePageInfo');

    // Stats Elements
    const totalFacultyDash = document.getElementById('totalFacultyDash');
    const professorCountDash = document.getElementById('professorCountDash');
    const assocProfCount = document.getElementById('assocProfCount');
    const assistProfCount = document.getElementById('assistProfCount');
    const publicationCountDash = document.getElementById('publicationCountDash');
    const activeCountDash = document.getElementById('activeCountDash');

    // Modal Elements
    const deleteModal = document.getElementById('deleteModal');
    const deleteFacultyName = document.getElementById('deleteFacultyName');
    const cancelDelete = document.getElementById('cancelDelete');
    const confirmDelete = document.getElementById('confirmDelete');

    // Toast Elements
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    // Initialize
    init();

    function init() {
        // Set user name
        const user = Auth.getUser();
        if (user && userName) {
            userName.textContent = user.name;
        }

        loadStats();
        loadFaculty();
        setupEventListeners();
    }

    function setupEventListeners() {
        // Table search
        let searchTimeout;
        tableSearch.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                currentPage = 1;
                loadFaculty();
            }, 300);
        });

        // Pagination
        tablePrevPage.addEventListener('click', () => changePage(-1));
        tableNextPage.addEventListener('click', () => changePage(1));

        // Delete modal
        cancelDelete.addEventListener('click', closeDeleteModal);
        confirmDelete.addEventListener('click', handleDeleteConfirm);
        deleteModal.addEventListener('click', (e) => {
            if (e.target === deleteModal) closeDeleteModal();
        });
    }

    async function loadStats() {
        try {
            const response = await API.getStats();
            if (response.success) {
                const stats = response.data;
                totalFacultyDash.textContent = stats.totalFaculty || 0;
                publicationCountDash.textContent = stats.totalPublications || 0;

                // Find counts by designation
                const professors = stats.byDesignation?.find(d => d._id === 'Professor');
                const assocProfs = stats.byDesignation?.find(d => d._id === 'Associate Professor');
                const assistProfs = stats.byDesignation?.find(d => d._id === 'Assistant Professor');

                professorCountDash.textContent = professors?.count || 0;
                assocProfCount.textContent = assocProfs?.count || 0;
                assistProfCount.textContent = assistProfs?.count || 0;

                // Find active count
                const active = stats.byStatus?.find(s => s._id === 'Active');
                activeCountDash.textContent = active?.count || 0;
            }
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    }

    async function loadFaculty() {
        tableLoading.style.display = 'flex';
        tableContainer.style.display = 'none';
        tablePagination.style.display = 'none';

        try {
            const params = {
                page: currentPage,
                limit: CONFIG.DEFAULT_PAGE_SIZE
            };

            const searchTerm = tableSearch.value.trim();
            if (searchTerm) {
                params.search = searchTerm;
            }

            const response = await API.getFaculty(params);

            if (response.success) {
                facultyData = response.data;
                totalPages = response.totalPages || 1;
                renderTable();
            }
        } catch (error) {
            console.error('Error loading faculty:', error);
            showToast('Error loading faculty data', 'error');
        }
    }

    function renderTable() {
        tableLoading.style.display = 'none';
        tableContainer.style.display = 'block';
        tablePagination.style.display = 'flex';

        facultyTableBody.innerHTML = '';

        if (facultyData.length === 0) {
            facultyTableBody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 2rem; color: var(--gray-500);">
                        No faculty members found
                    </td>
                </tr>
            `;
            return;
        }

        facultyData.forEach(member => {
            const row = document.createElement('tr');
            const statusClass = getStatusClass(member.status);

            row.innerHTML = `
                <td>${escapeHtml(member.employeeId)}</td>
                <td>
                    <strong>${escapeHtml(member.name)}</strong>
                </td>
                <td>${escapeHtml(member.email)}</td>
                <td>${escapeHtml(member.designation)}</td>
                <td><span class="badge ${statusClass}">${escapeHtml(member.status)}</span></td>
                <td>
                    <div class="table-actions">
                        <a href="faculty-detail.html?id=${member._id}" class="btn btn-sm btn-secondary">View</a>
                        <a href="faculty-form.html?id=${member._id}" class="btn btn-sm btn-primary">Edit</a>
                        <button class="btn btn-sm btn-danger" onclick="openDeleteModal('${member._id}', '${escapeHtml(member.name)}')">Delete</button>
                    </div>
                </td>
            `;

            facultyTableBody.appendChild(row);
        });

        updatePagination();
    }

    function changePage(delta) {
        const newPage = currentPage + delta;
        if (newPage >= 1 && newPage <= totalPages) {
            currentPage = newPage;
            loadFaculty();
        }
    }

    function updatePagination() {
        tablePageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        tablePrevPage.disabled = currentPage <= 1;
        tableNextPage.disabled = currentPage >= totalPages;
    }

    // Make openDeleteModal global for onclick
    window.openDeleteModal = function (id, name) {
        deleteTargetId = id;
        deleteFacultyName.textContent = name;
        deleteModal.classList.add('active');
    };

    function closeDeleteModal() {
        deleteModal.classList.remove('active');
        deleteTargetId = null;
    }

    async function handleDeleteConfirm() {
        if (!deleteTargetId) return;

        confirmDelete.disabled = true;
        confirmDelete.textContent = 'Deleting...';

        try {
            const response = await API.deleteFaculty(deleteTargetId);

            if (response.success) {
                showToast('Faculty member deleted successfully', 'success');
                closeDeleteModal();
                loadStats();
                loadFaculty();
            } else {
                showToast(response.message || 'Failed to delete', 'error');
            }
        } catch (error) {
            showToast(error.message || 'Error deleting faculty', 'error');
        } finally {
            confirmDelete.disabled = false;
            confirmDelete.textContent = 'Delete';
        }
    }

    function showToast(message, type = 'info') {
        toastMessage.textContent = message;
        toast.className = `toast show ${type}`;

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Helper Functions
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
