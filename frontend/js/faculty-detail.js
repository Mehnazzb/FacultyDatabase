/**
 * Faculty Detail Module
 * Handles the faculty profile detail page
 */

document.addEventListener('DOMContentLoaded', function () {
    // Get faculty ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const facultyId = urlParams.get('id');

    if (!facultyId) {
        showError();
        return;
    }

    // DOM Elements
    const loadingState = document.getElementById('loadingState');
    const errorState = document.getElementById('errorState');
    const profileMain = document.getElementById('profileMain');
    const profileActions = document.getElementById('profileActions');
    const editBtn = document.getElementById('editBtn');

    // Profile elements
    const avatarInitials = document.getElementById('avatarInitials');
    const facultyName = document.getElementById('facultyName');
    const facultyDesignation = document.getElementById('facultyDesignation');
    const facultyDepartment = document.getElementById('facultyDepartment');
    const statusBadge = document.getElementById('statusBadge');
    const employeeId = document.getElementById('employeeId');

    // Contact elements
    const facultyEmail = document.getElementById('facultyEmail');
    const facultyPhone = document.getElementById('facultyPhone');
    const officeLocation = document.getElementById('officeLocation');
    const officeHours = document.getElementById('officeHours');

    // Section elements
    const biographySection = document.getElementById('biographySection');
    const biographyText = document.getElementById('biographyText');
    const researchSection = document.getElementById('researchSection');
    const researchInterests = document.getElementById('researchInterests');
    const qualificationsSection = document.getElementById('qualificationsSection');
    const qualificationsList = document.getElementById('qualificationsList');
    const experienceSection = document.getElementById('experienceSection');
    const experienceList = document.getElementById('experienceList');
    const publicationsSection = document.getElementById('publicationsSection');
    const publicationsList = document.getElementById('publicationsList');
    const coursesSection = document.getElementById('coursesSection');
    const coursesList = document.getElementById('coursesList');
    const awardsSection = document.getElementById('awardsSection');
    const awardsList = document.getElementById('awardsList');
    const linksSection = document.getElementById('linksSection');
    const linksList = document.getElementById('linksList');

    // Load faculty data
    loadFacultyData();

    async function loadFacultyData() {
        try {
            const response = await API.getFacultyById(facultyId);

            if (response.success) {
                renderProfile(response.data);
            } else {
                showError();
            }
        } catch (error) {
            console.error('Error loading faculty:', error);
            showError();
        }
    }

    function renderProfile(data) {
        loadingState.style.display = 'none';
        profileMain.style.display = 'block';

        // Basic info
        avatarInitials.textContent = getInitials(data.name);
        facultyName.textContent = data.name;
        facultyDesignation.textContent = data.designation;
        facultyDepartment.textContent = data.department;
        employeeId.textContent = `ID: ${data.employeeId}`;

        // Status badge
        statusBadge.textContent = data.status;
        statusBadge.className = `badge ${getStatusClass(data.status)}`;

        // Contact info
        facultyEmail.innerHTML = `<a href="mailto:${data.email}">${data.email}</a>`;
        facultyPhone.textContent = data.phone || 'Not available';
        officeLocation.textContent = data.officeLocation || 'Not available';
        officeHours.textContent = data.officeHours || 'Not available';

        // Edit button
        if (Auth.canEdit()) {
            profileActions.style.display = 'block';
            editBtn.href = `faculty-form.html?id=${facultyId}`;
        }

        // Biography
        if (data.biography) {
            biographySection.style.display = 'block';
            biographyText.textContent = data.biography;
        }

        // Research Interests
        if (data.researchInterests && data.researchInterests.length > 0) {
            researchSection.style.display = 'block';
            researchInterests.innerHTML = data.researchInterests
                .map(interest => `<span class="tag">${escapeHtml(interest)}</span>`)
                .join('');
        }

        // Qualifications
        if (data.qualifications && data.qualifications.length > 0) {
            qualificationsSection.style.display = 'block';
            qualificationsList.innerHTML = data.qualifications
                .map(qual => `
                    <div class="timeline-item">
                        <h4>${escapeHtml(qual.degree)}${qual.specialization ? ` in ${escapeHtml(qual.specialization)}` : ''}</h4>
                        <p>${escapeHtml(qual.institution)}</p>
                        ${qual.yearOfPassing ? `<span class="year">${qual.yearOfPassing}</span>` : ''}
                    </div>
                `)
                .join('');
        }

        // Experience
        if (data.experience && data.experience.length > 0) {
            experienceSection.style.display = 'block';
            experienceList.innerHTML = data.experience
                .map(exp => `
                    <div class="timeline-item">
                        <h4>${escapeHtml(exp.position)}</h4>
                        <p>${escapeHtml(exp.organization)}</p>
                        ${exp.fromDate ? `<span class="year">${formatDate(exp.fromDate)}${exp.toDate ? ` - ${formatDate(exp.toDate)}` : ' - Present'}</span>` : ''}
                    </div>
                `)
                .join('');
        }

        // Publications
        if (data.publications && data.publications.length > 0) {
            publicationsSection.style.display = 'block';
            publicationsList.innerHTML = data.publications
                .map(pub => `
                    <div class="publication-item">
                        <h4>${escapeHtml(pub.title)}</h4>
                        <p>${escapeHtml(pub.authors || '')}</p>
                        <div class="publication-meta">
                            <span>${escapeHtml(pub.type)}</span>
                            ${pub.venue ? `<span>${escapeHtml(pub.venue)}</span>` : ''}
                            ${pub.year ? `<span>${pub.year}</span>` : ''}
                            ${pub.indexing && pub.indexing !== 'None' ? `<span class="badge badge-active">${pub.indexing}</span>` : ''}
                        </div>
                    </div>
                `)
                .join('');
        }

        // Courses Taught
        if (data.coursesTaught && data.coursesTaught.length > 0) {
            coursesSection.style.display = 'block';
            coursesList.innerHTML = data.coursesTaught
                .map(course => `
                    <div class="course-item">
                        <h4>${escapeHtml(course.courseName)}</h4>
                        <p>${course.courseCode ? `${escapeHtml(course.courseCode)} | ` : ''}Semester ${course.semester || 'N/A'}</p>
                    </div>
                `)
                .join('');
        }

        // Awards
        if (data.awards && data.awards.length > 0) {
            awardsSection.style.display = 'block';
            awardsList.innerHTML = data.awards
                .map(award => `
                    <div class="timeline-item">
                        <h4>${escapeHtml(award.title)}</h4>
                        <p>${escapeHtml(award.organization || '')}</p>
                        ${award.year ? `<span class="year">${award.year}</span>` : ''}
                    </div>
                `)
                .join('');
        }

        // Academic Links
        const links = [];
        if (data.website) {
            links.push({ label: 'Personal Website', url: data.website, icon: '🌐' });
        }
        if (data.linkedIn) {
            links.push({ label: 'LinkedIn', url: data.linkedIn, icon: '💼' });
        }
        if (data.googleScholar) {
            links.push({ label: 'Google Scholar', url: data.googleScholar, icon: '📚' });
        }
        if (data.orcid) {
            links.push({ label: 'ORCID', url: `https://orcid.org/${data.orcid}`, icon: '🆔' });
        }

        if (links.length > 0) {
            linksSection.style.display = 'block';
            linksList.innerHTML = links
                .map(link => `
                    <a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer" class="link-item">
                        <span>${link.icon}</span>
                        <span>${escapeHtml(link.label)}</span>
                    </a>
                `)
                .join('');
        }
    }

    function showError() {
        loadingState.style.display = 'none';
        errorState.style.display = 'block';
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

    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    }

    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
