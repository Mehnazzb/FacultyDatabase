/**
 * Faculty Form Module
 * Handles the add/edit faculty form functionality
 */

document.addEventListener('DOMContentLoaded', function () {
    // Check authentication
    if (!Auth.requireAuth()) return;

    // Get faculty ID from URL (if editing)
    const urlParams = new URLSearchParams(window.location.search);
    const facultyId = urlParams.get('id');
    const isEditing = !!facultyId;

    // State
    let currentStep = 1;
    const totalSteps = 4;
    let qualificationIndex = 1;
    let publicationIndex = 1;

    // DOM Elements
    const formTitle = document.getElementById('formTitle');
    const facultyForm = document.getElementById('facultyForm');
    const formError = document.getElementById('formError');
    const formErrorMessage = document.getElementById('formErrorMessage');
    const progressSteps = document.querySelectorAll('.progress-step');
    const formSteps = document.querySelectorAll('.form-step');
    const prevStepBtn = document.getElementById('prevStepBtn');
    const nextStepBtn = document.getElementById('nextStepBtn');
    const submitBtn = document.getElementById('submitBtn');

    // Dynamic entries
    const qualificationsContainer = document.getElementById('qualificationsContainer');
    const publicationsContainer = document.getElementById('publicationsContainer');
    const addQualificationBtn = document.getElementById('addQualification');
    const addPublicationBtn = document.getElementById('addPublication');

    // Toast
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    // Initialize
    init();

    async function init() {
        if (isEditing) {
            formTitle.textContent = 'Edit Faculty';
            await loadFacultyData();
        }

        setupEventListeners();
        updateNavigation();
    }

    function setupEventListeners() {
        // Navigation
        prevStepBtn.addEventListener('click', () => changeStep(-1));
        nextStepBtn.addEventListener('click', () => changeStep(1));

        // Form submission
        facultyForm.addEventListener('submit', handleSubmit);

        // Dynamic entries
        addQualificationBtn.addEventListener('click', addQualification);
        addPublicationBtn.addEventListener('click', addPublication);

        // Remove buttons delegation
        qualificationsContainer.addEventListener('click', (e) => {
            if (e.target.closest('.remove-qualification')) {
                e.target.closest('.qualification-entry').remove();
                updateQualificationNumbers();
            }
        });

        publicationsContainer.addEventListener('click', (e) => {
            if (e.target.closest('.remove-publication')) {
                e.target.closest('.publication-entry').remove();
                updatePublicationNumbers();
            }
        });
    }

    async function loadFacultyData() {
        try {
            const response = await API.getFacultyById(facultyId);

            if (response.success) {
                populateForm(response.data);
            } else {
                showError('Failed to load faculty data');
            }
        } catch (error) {
            showError('Error loading faculty data');
            console.error(error);
        }
    }

    function populateForm(data) {
        // Personal Info
        setValue('employeeId', data.employeeId);
        setValue('name', data.name);
        setValue('email', data.email);
        setValue('phone', data.phone);
        setValue('dateOfBirth', formatDateForInput(data.dateOfBirth));
        setValue('gender', data.gender);
        setValue('address', data.address);

        // Professional Info
        setValue('designation', data.designation);
        setValue('department', data.department);
        setValue('dateOfJoining', formatDateForInput(data.dateOfJoining));
        setValue('employmentType', data.employmentType);
        setValue('status', data.status);
        setValue('officeLocation', data.officeLocation);
        setValue('officeHours', data.officeHours);
        setValue('researchInterests', data.researchInterests?.join(', '));
        setValue('biography', data.biography);

        // Links
        setValue('website', data.website);
        setValue('linkedIn', data.linkedIn);
        setValue('googleScholar', data.googleScholar);
        setValue('orcid', data.orcid);

        // Qualifications
        if (data.qualifications && data.qualifications.length > 0) {
            qualificationsContainer.innerHTML = '';
            data.qualifications.forEach((qual, index) => {
                addQualification(qual, index);
            });
        }

        // Publications
        if (data.publications && data.publications.length > 0) {
            publicationsContainer.innerHTML = '';
            data.publications.forEach((pub, index) => {
                addPublication(pub, index);
            });
        }
    }

    function setValue(id, value) {
        const element = document.getElementById(id);
        if (element && value !== undefined && value !== null) {
            element.value = value;
        }
    }

    function formatDateForInput(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }

    function changeStep(delta) {
        // Validate current step before moving forward
        if (delta > 0 && !validateCurrentStep()) {
            return;
        }

        const newStep = currentStep + delta;
        if (newStep >= 1 && newStep <= totalSteps) {
            currentStep = newStep;
            updateStepDisplay();
            updateNavigation();
        }
    }

    function updateStepDisplay() {
        // Update progress indicators
        progressSteps.forEach((step, index) => {
            step.classList.remove('active', 'completed');
            if (index + 1 < currentStep) {
                step.classList.add('completed');
            } else if (index + 1 === currentStep) {
                step.classList.add('active');
            }
        });

        // Update form steps
        formSteps.forEach((step, index) => {
            step.classList.remove('active');
            if (index + 1 === currentStep) {
                step.classList.add('active');
            }
        });
    }

    function updateNavigation() {
        prevStepBtn.style.display = currentStep > 1 ? 'flex' : 'none';
        nextStepBtn.style.display = currentStep < totalSteps ? 'flex' : 'none';
        submitBtn.style.display = currentStep === totalSteps ? 'flex' : 'none';
    }

    function validateCurrentStep() {
        const currentFormStep = document.querySelector(`.form-step[data-step="${currentStep}"]`);
        const requiredFields = currentFormStep.querySelectorAll('[required]');

        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            } else {
                field.classList.remove('error');
            }
        });

        if (!isValid) {
            showError('Please fill in all required fields');
        } else {
            hideError();
        }

        return isValid;
    }

    function addQualification(data = null, index = null) {
        if (index === null) {
            index = qualificationIndex++;
        } else {
            qualificationIndex = Math.max(qualificationIndex, index + 1);
        }

        const entry = document.createElement('div');
        entry.className = 'qualification-entry';
        entry.dataset.index = index;

        entry.innerHTML = `
            <div class="entry-header">
                <h4>Qualification ${qualificationsContainer.children.length + 1}</h4>
                <button type="button" class="btn btn-icon btn-danger remove-qualification">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Degree</label>
                    <input type="text" name="qualifications[${index}][degree]" placeholder="e.g., Ph.D., M.Tech, B.E." value="${data?.degree || ''}">
                </div>
                <div class="form-group">
                    <label>Specialization</label>
                    <input type="text" name="qualifications[${index}][specialization]" placeholder="e.g., Machine Learning" value="${data?.specialization || ''}">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Institution</label>
                    <input type="text" name="qualifications[${index}][institution]" placeholder="Institution name" value="${data?.institution || ''}">
                </div>
                <div class="form-group">
                    <label>Year of Passing</label>
                    <input type="number" name="qualifications[${index}][yearOfPassing]" placeholder="e.g., 2020" min="1950" max="2030" value="${data?.yearOfPassing || ''}">
                </div>
            </div>
        `;

        qualificationsContainer.appendChild(entry);
        updateQualificationNumbers();
    }

    function addPublication(data = null, index = null) {
        if (index === null) {
            index = publicationIndex++;
        } else {
            publicationIndex = Math.max(publicationIndex, index + 1);
        }

        const entry = document.createElement('div');
        entry.className = 'publication-entry';
        entry.dataset.index = index;

        entry.innerHTML = `
            <div class="entry-header">
                <h4>Publication ${publicationsContainer.children.length + 1}</h4>
                <button type="button" class="btn btn-icon btn-danger remove-publication">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" name="publications[${index}][title]" placeholder="Publication title" value="${data?.title || ''}">
                </div>
                <div class="form-group">
                    <label>Type</label>
                    <select name="publications[${index}][type]">
                        <option value="Journal" ${data?.type === 'Journal' ? 'selected' : ''}>Journal</option>
                        <option value="Conference" ${data?.type === 'Conference' ? 'selected' : ''}>Conference</option>
                        <option value="Book" ${data?.type === 'Book' ? 'selected' : ''}>Book</option>
                        <option value="Book Chapter" ${data?.type === 'Book Chapter' ? 'selected' : ''}>Book Chapter</option>
                        <option value="Patent" ${data?.type === 'Patent' ? 'selected' : ''}>Patent</option>
                        <option value="Other" ${data?.type === 'Other' ? 'selected' : ''}>Other</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Authors</label>
                    <input type="text" name="publications[${index}][authors]" placeholder="Author names" value="${data?.authors || ''}">
                </div>
                <div class="form-group">
                    <label>Year</label>
                    <input type="number" name="publications[${index}][year]" placeholder="e.g., 2023" min="1950" max="2030" value="${data?.year || ''}">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Venue</label>
                    <input type="text" name="publications[${index}][venue]" placeholder="Journal/Conference name" value="${data?.venue || ''}">
                </div>
                <div class="form-group">
                    <label>Indexing</label>
                    <select name="publications[${index}][indexing]">
                        <option value="None" ${data?.indexing === 'None' ? 'selected' : ''}>None</option>
                        <option value="SCI" ${data?.indexing === 'SCI' ? 'selected' : ''}>SCI</option>
                        <option value="Scopus" ${data?.indexing === 'Scopus' ? 'selected' : ''}>Scopus</option>
                        <option value="Web of Science" ${data?.indexing === 'Web of Science' ? 'selected' : ''}>Web of Science</option>
                        <option value="UGC" ${data?.indexing === 'UGC' ? 'selected' : ''}>UGC</option>
                        <option value="Other" ${data?.indexing === 'Other' ? 'selected' : ''}>Other</option>
                    </select>
                </div>
            </div>
        `;

        publicationsContainer.appendChild(entry);
        updatePublicationNumbers();
    }

    function updateQualificationNumbers() {
        const entries = qualificationsContainer.querySelectorAll('.qualification-entry');
        entries.forEach((entry, index) => {
            entry.querySelector('h4').textContent = `Qualification ${index + 1}`;
            // Show/hide remove button
            const removeBtn = entry.querySelector('.remove-qualification');
            removeBtn.style.display = entries.length > 1 ? 'flex' : 'none';
        });
    }

    function updatePublicationNumbers() {
        const entries = publicationsContainer.querySelectorAll('.publication-entry');
        entries.forEach((entry, index) => {
            entry.querySelector('h4').textContent = `Publication ${index + 1}`;
            // Show/hide remove button
            const removeBtn = entry.querySelector('.remove-publication');
            removeBtn.style.display = entries.length > 1 ? 'flex' : 'none';
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!validateCurrentStep()) {
            return;
        }

        // Show loading state
        submitBtn.querySelector('.btn-text').style.display = 'none';
        submitBtn.querySelector('.btn-loading').style.display = 'flex';
        submitBtn.disabled = true;

        try {
            const formData = collectFormData();

            let response;
            if (isEditing) {
                response = await API.updateFaculty(facultyId, formData);
            } else {
                response = await API.createFaculty(formData);
            }

            if (response.success) {
                showToast(isEditing ? 'Faculty updated successfully!' : 'Faculty created successfully!', 'success');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            } else {
                showError(response.message || 'Failed to save faculty');
                resetSubmitButton();
            }
        } catch (error) {
            showError(error.message || 'Error saving faculty');
            resetSubmitButton();
        }
    }

    function collectFormData() {
        const data = {
            employeeId: document.getElementById('employeeId').value.trim(),
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim() || undefined,
            dateOfBirth: document.getElementById('dateOfBirth').value || undefined,
            gender: document.getElementById('gender').value || undefined,
            address: document.getElementById('address').value.trim() || undefined,
            designation: document.getElementById('designation').value,
            department: document.getElementById('department').value.trim(),
            dateOfJoining: document.getElementById('dateOfJoining').value,
            employmentType: document.getElementById('employmentType').value,
            status: document.getElementById('status').value,
            officeLocation: document.getElementById('officeLocation').value.trim() || undefined,
            officeHours: document.getElementById('officeHours').value.trim() || undefined,
            biography: document.getElementById('biography').value.trim() || undefined,
            website: document.getElementById('website').value.trim() || undefined,
            linkedIn: document.getElementById('linkedIn').value.trim() || undefined,
            googleScholar: document.getElementById('googleScholar').value.trim() || undefined,
            orcid: document.getElementById('orcid').value.trim() || undefined
        };

        // Research interests
        const researchInterests = document.getElementById('researchInterests').value.trim();
        if (researchInterests) {
            data.researchInterests = researchInterests.split(',').map(s => s.trim()).filter(s => s);
        }

        // Qualifications
        data.qualifications = [];
        qualificationsContainer.querySelectorAll('.qualification-entry').forEach(entry => {
            const qual = {
                degree: entry.querySelector('[name*="[degree]"]').value.trim(),
                specialization: entry.querySelector('[name*="[specialization]"]').value.trim(),
                institution: entry.querySelector('[name*="[institution]"]').value.trim(),
                yearOfPassing: parseInt(entry.querySelector('[name*="[yearOfPassing]"]').value) || undefined
            };
            if (qual.degree || qual.institution) {
                data.qualifications.push(qual);
            }
        });

        // Publications
        data.publications = [];
        publicationsContainer.querySelectorAll('.publication-entry').forEach(entry => {
            const pub = {
                title: entry.querySelector('[name*="[title]"]').value.trim(),
                type: entry.querySelector('[name*="[type]"]').value,
                authors: entry.querySelector('[name*="[authors]"]').value.trim(),
                year: parseInt(entry.querySelector('[name*="[year]"]').value) || undefined,
                venue: entry.querySelector('[name*="[venue]"]').value.trim(),
                indexing: entry.querySelector('[name*="[indexing]"]').value
            };
            if (pub.title) {
                data.publications.push(pub);
            }
        });

        return data;
    }

    function resetSubmitButton() {
        submitBtn.querySelector('.btn-text').style.display = 'inline';
        submitBtn.querySelector('.btn-loading').style.display = 'none';
        submitBtn.disabled = false;
    }

    function showError(message) {
        formErrorMessage.textContent = message;
        formError.style.display = 'flex';
        formError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function hideError() {
        formError.style.display = 'none';
    }

    function showToast(message, type = 'info') {
        toastMessage.textContent = message;
        toast.className = `toast show ${type}`;

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
});
