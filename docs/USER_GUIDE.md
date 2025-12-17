# User Guide

This guide explains how to use the Faculty Database Management System.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Browsing Faculty Directory](#browsing-faculty-directory)
3. [Searching and Filtering](#searching-and-filtering)
4. [Viewing Faculty Profiles](#viewing-faculty-profiles)
5. [Admin Functions](#admin-functions)
6. [Managing Faculty Records](#managing-faculty-records)

---

## Getting Started

### Accessing the System

Open your web browser and navigate to:
- **Faculty Directory**: `http://localhost:5000`
- **Admin Login**: `http://localhost:5000/login.html`

### User Roles

| Role | Capabilities |
|------|-------------|
| Public | View faculty directory, search, view profiles |
| Admin | Add, edit, delete faculty records |

---

## Browsing Faculty Directory

The home page displays all faculty members in a card grid format.

### Faculty Cards Show:
- Profile avatar with initials
- Name and designation
- Email and phone
- Department
- Employment status badge

### Statistics Bar
At the top of the page, you'll see:
- Total Faculty count
- Number of Professors
- Total Publications
- Active Faculty count

---

## Searching and Filtering

### Search Box
- Type a name, email, or employee ID
- Click **Search** or press Enter
- Results update automatically

### Filters
- **Designation Filter**: Filter by Professor, Associate Professor, etc.
- **Status Filter**: Filter by Active, On Leave, Retired
- **Clear Filters**: Reset all filters

### Example Searches
- Search by name: `Ramesh`
- Search by email: `@rit.edu.in`
- Search by ID: `ISE001`

---

## Viewing Faculty Profiles

Click on any faculty card to view their complete profile.

### Profile Sections

1. **Contact Information**
   - Email address (clickable)
   - Phone number
   - Office location
   - Office hours

2. **Biography**
   - Brief description of the faculty member

3. **Research Interests**
   - List of research areas as tags

4. **Educational Qualifications**
   - Degrees, institutions, years
   - Displayed in timeline format

5. **Work Experience**
   - Previous positions and organizations
   - Duration at each position

6. **Publications**
   - Research papers, books, patents
   - Includes indexing information (SCI, Scopus)

7. **Courses Taught**
   - Course names and codes
   - Semester information

8. **Awards & Achievements**
   - Recognition and honors received

9. **Academic Links**
   - Personal website
   - LinkedIn profile
   - Google Scholar
   - ORCID

---

## Admin Functions

### Logging In

1. Click **Admin Login** in the navigation
2. Enter your username and password
3. Click **Sign In**

Default credentials:
- Username: `admin`
- Password: `admin123`

### Admin Dashboard

After logging in, you'll see:
- Welcome message
- Statistics overview
- Faculty management table
- Quick actions

### Dashboard Features

| Feature | Description |
|---------|-------------|
| Add New Faculty | Opens the faculty form |
| View | View faculty profile |
| Edit | Edit faculty details |
| Delete | Remove faculty record |
| Search | Quick search in table |

---

## Managing Faculty Records

### Adding New Faculty

1. Click **Add New Faculty** on the dashboard
2. Complete the multi-step form:

   **Step 1: Personal Information**
   - Employee ID (required)
   - Full Name (required)
   - Email (required)
   - Phone number
   - Date of birth
   - Gender
   - Address

   **Step 2: Professional Information**
   - Designation (required)
   - Department (required)
   - Date of joining (required)
   - Employment type
   - Status
   - Office location
   - Research interests
   - Biography

   **Step 3: Qualifications**
   - Add educational qualifications
   - Click "Add Another Qualification" for more

   **Step 4: Publications & Links**
   - Add publications
   - Add academic profile links

3. Click **Save Faculty**

### Editing Faculty

1. Go to Dashboard
2. Find the faculty in the table
3. Click **Edit**
4. Modify the information
5. Click **Save Faculty**

### Deleting Faculty

1. Go to Dashboard
2. Find the faculty in the table
3. Click **Delete**
4. Confirm the deletion

> **Warning**: Deletion is permanent and cannot be undone!

---

## Navigation Summary

| Page | URL | Purpose |
|------|-----|---------|
| Home | `/` | Faculty directory |
| Login | `/login.html` | Admin authentication |
| Dashboard | `/dashboard.html` | Admin management |
| Add Faculty | `/faculty-form.html` | Add new record |
| Edit Faculty | `/faculty-form.html?id=...` | Edit existing |
| View Profile | `/faculty-detail.html?id=...` | View details |

---

## Tips and Best Practices

1. **Use Descriptive Employee IDs**: Follow a consistent format (e.g., `ISE001`)
2. **Complete All Fields**: More complete profiles are more useful
3. **Keep Information Updated**: Review and update records periodically
4. **Use Proper Formatting**: For publications, include all author names
5. **Secure Your Account**: Use a strong password and don't share credentials

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Enter | Submit search |
| Escape | Close modal dialogs |

---

## Getting Help

If you encounter issues:
1. Check the [Quickstart Guide](QUICKSTART.md) for setup help
2. Review the [API Documentation](API_DOCUMENTATION.md) for technical details
3. Contact the system administrator

---

**Department of Information Science and Engineering**  
**Ramaiah Institute of Technology, Bangalore**
