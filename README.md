# College Portal System — Complete Project Requirements

## 1. Project Overview

**Project Type:** Web-Based College Management and Student Portal

The College Portal is a modern, responsive, role-based web application designed to manage college academic and administrative activities.

The project starts with a frontend-based implementation using HTML, CSS, JavaScript, and LocalStorage, and is designed to evolve into a complete full-stack system using PHP, MySQL, APIs, authentication, security, reporting, analytics, and optional AI features.

### Main Objectives

- Centralize college management.
- Provide separate experiences for Admin, Faculty, and Students.
- Manage students, faculty, courses, attendance, assignments, results, fees, notices, and timetable.
- Support desktop, tablet, and mobile devices.
- Start with local/demo data and later migrate to MySQL.
- Develop from basic functionality to advanced features.

## 2. User Roles

### Admin
Overall system and academic management.

### Faculty
Teaching-related activities such as courses, attendance, assignments, and results.

### Student
Personal academic information, courses, attendance, assignments, results, fees, notices, profile, and timetable.

Each role must have appropriate permissions.

## 3. Technology Requirements

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript
- Responsive Web Design
- LocalStorage
- Modular HTML pages
- Shared CSS and JavaScript
- Modern UI components

### Development Environment
- VS Code or similar editor
- XAMPP
- Apache
- MySQL
- Web browser

### Run the current frontend locally

The current demo uses static HTML, JavaScript, and browser LocalStorage; it does not require MySQL or PHP yet. Serve the project over HTTP so the portal can load its modular pages:

**VS Code Live Server**
1. Open the project folder in VS Code and install the Live Server extension if needed.
2. Right-click `index.html` and choose **Open with Live Server**.
3. Sign in with a demo account listed in the login page.

**XAMPP**
1. Copy the project folder into XAMPP's `htdocs` directory (commonly `C:\xampp\htdocs\college-portal`).
2. Start **Apache** in the XAMPP Control Panel. MySQL is not needed for this frontend demo.
3. Open `http://localhost/college-portal/` in your browser.
4. Open that `htdocs` copy in VS Code when you want to edit the version being served.

### Current Backend Starter
The project now includes a PHP/MySQL starter layer to move toward the full-stack version while keeping the existing frontend prototype working.

Files added:
- `api/config.php` — database configuration
- `api/db.php` — MySQL connection utility
- `api/auth.php` — demo login API
- `api/students.php` — sample students API
- `api/index.php` — route entry point
- `database/schema.sql` — MySQL schema and sample data

The frontend login is now configured to try the PHP backend first and fall back to the existing local demo accounts when the backend is unavailable.

### Run the backend starter with XAMPP
1. Start Apache and MySQL in XAMPP.
2. Open PHPMyAdmin and import `database/schema.sql`.
3. Place the project in `htdocs/college-portal`.
4. Test the login endpoint:
   `http://localhost/college-portal/api/index.php?resource=auth`
5. Send a POST request with JSON:
   ```json
   {"username":"admin","password":"admin123"}
   ```

### Future Backend
- PHP
- MySQL
- REST-style APIs
- Secure authentication
- Server-side validation

## 4. Project Architecture

```text
college-portal/
├── index.html
├── portal.html
├── pages/
│   ├── dashboard.html
│   ├── students.html
│   ├── faculty.html
│   ├── courses.html
│   ├── attendance.html
│   ├── timetable.html
│   ├── assignments.html
│   ├── results.html
│   ├── fees.html
│   ├── notices.html
│   ├── profile.html
│   └── settings.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── api/
│   └── future PHP API files
├── database/
│   └── future MySQL files
├── uploads/
│   └── future uploaded files
└── README.md
```

## 5. Authentication and Login

### Current / Demo Requirements
- Login page
- Username and password
- Role-based access
- Current-user information
- Logout
- Demo authentication
- LocalStorage session state

### Demo Accounts

```text
Admin
Username: admin
Password: admin123

Faculty
Username: faculty
Password: faculty123

Student
Username: student
Password: student123
```

These are development/demo credentials only.

### Future Authentication
- PHP authentication
- MySQL user accounts
- Password hashing
- Secure sessions
- RBAC
- Password reset
- Account management
- Session expiration
- Secure logout
- Login-attempt protection

## 6. Main Portal Layout

- Sidebar navigation
- Header
- User information
- Role information
- Dynamic page loading
- Logout
- Responsive navigation
- Light/Dark theme
- Mobile navigation
- Role-specific menus

## 7. Dashboard

### General
- Welcome message
- Statistics cards
- Quick actions
- Recent activity
- Notifications
- Academic summary
- Important notices

### Student Dashboard
- Student name
- Student ID
- Department
- Semester
- Total courses
- Attendance percentage
- GPA
- Pending assignments
- Upcoming deadlines
- Notices
- Academic overview

### Future
- Interactive charts
- Attendance trends
- Assignment trends
- Fee status
- Notifications
- Personalized recommendations

## 8. Module 2 — Courses / Academic Subjects

### Course Information
- Course ID
- Course Code
- Course Name
- Instructor
- Credit Hours
- Department
- Semester
- Status

### Example Courses

```text
CS-301 — Database Systems
Instructor: Dr. Ahmad Khan
Credits: 3
Semester: 6th
Status: Active

CS-302 — Computer Architecture
Instructor: Dr. Ahmad Khan
Credits: 3
Semester: 6th
Status: Active

CS-303 — Web Engineering
Instructor: Ms. Sana Ali
Credits: 3
Semester: 6th
Status: Active

IT-201 — Information Security
Instructor: Ms. Sana Ali
Credits: 3
Semester: 6th
Status: Active
```

### Role Behavior
**Admin:** Add, edit, delete, and manage courses.

**Faculty:** View assigned courses and manage related academic activities.

**Student:** View enrolled courses and course information.

### Future
- Enrollment
- Course materials
- Announcements
- Schedule
- Resources
- Teacher/course relationships
- Student enrollment records

## 9. Module 3 — Attendance

### Core Requirements
- Overall attendance percentage
- Course-wise attendance
- Total classes
- Present classes
- Absent classes
- Attendance percentage
- Good/Warning status

### Example Data

```text
CS-301: Total 30, Present 27
CS-302: Total 28, Present 24
CS-303: Total 32, Present 29
IT-201: Total 25, Present 20
```

### Role Behavior
**Student:** View own attendance and status.

**Faculty:** View, mark, and update attendance.

**Admin:** View, manage, and report attendance.

### Future
- Daily records
- Attendance calendar
- Monthly reports
- Semester reports
- Analytics
- Shortage warnings
- Notifications
- Export

## 10. Module 4 — Assignments

### Core Requirements
- Assignment ID
- Course
- Title
- Description
- Issue date
- Due date
- Marks
- Submission status

### Statuses
```text
Submitted
Pending
Overdue
```

### Example Assignments

```text
CS-301 — ER Diagram
Due: 2026-10-05
Marks: 10
Status: Pending

CS-303 — Portfolio Website
Due: 2026-10-08
Marks: 20
Status: Submitted

CS-302 — CPU Report
Due: 2026-10-10
Marks: 15
Status: Pending

IT-201 — Cryptography Task
Due: 2026-10-02
Marks: 10
Status: Overdue
```

### Student Features
- View assignments
- Search
- Filter by status
- View details
- View deadlines
- View submission status

### Faculty/Admin
- Add
- Edit
- Delete
- Assign to courses
- Set due dates
- Set marks
- View submission status

### Future
- File upload
- Assignment submission
- Timestamps
- Resubmission
- Grading
- Feedback
- Notifications
- Calendar
- Secure file storage

## 11. Module 5 — Results

### Core Requirements
- Course
- Marks
- Grade
- GPA

### Example Results

```text
CS-301 — 86 — A — 4.0
CS-302 — 79 — B+ — 3.5
CS-303 — 91 — A+ — 4.0
IT-201 — 83 — A- — 3.7
```

### Student
- View marks
- View grades
- View GPA
- View semester summary

### Faculty — Future
- Enter marks
- Update marks
- Assign grades
- Submit results

### Admin — Future
- Manage results
- Verify results
- Approve results
- Generate reports

### Future Results
- Multiple semesters
- Semester GPA
- Overall CGPA
- Academic transcript
- Result history
- Semester comparison
- PDF transcript
- Result verification
- Faculty entry
- Admin approval
- Result publishing

## 12. Fees Management

### Basic
- Student fee information
- Fee status
- Amount
- Payment information

### Future
- Fee management
- Payment records
- Online payments
- Receipts
- Reminders
- Scholarships
- Installments
- Payment history
- Printable receipts

## 13. Student Profile

### Information
- Student ID
- Full name
- Father's name
- Email
- Phone
- Address
- Department
- Program
- Semester
- Admission date
- Profile photo

### Future
- Edit profile
- Change password
- Photo upload
- Academic information management
- Validation

## 14. Student Management

### Features
- Add student
- View students
- Edit student
- Delete student
- Search
- Filter
- View profile
- Assign department
- Assign semester
- Manage enrollment

### Future Advanced
- Academic history
- Attendance history
- Fee history
- Assignment history
- Result history
- Document management

## 15. Faculty Management

### Features
- Add faculty
- View faculty
- Edit faculty
- Delete faculty
- Search
- Department assignment
- Course assignment
- Faculty profile

### Future Faculty Dashboard
- Assigned courses
- Attendance
- Assignments
- Results
- Notices
- Timetable
- Academic statistics

## 16. Notices and Announcements

### Basic
- Notice list
- Title
- Description
- Date
- Category

### Future
- Admin publishing
- Faculty announcements
- Student notifications
- Important notices
- Search
- Categories
- Expiry dates
- Email notifications

## 17. Timetable

### Basic
- Day
- Time
- Course
- Instructor
- Room

### Future
- Student timetable
- Faculty timetable
- Department timetable
- Semester timetable
- Conflict detection
- Printable timetable
- Calendar view

## 18. Data Management

### Current
- JavaScript objects
- LocalStorage
- Seed/demo data
- Shared application data
- Reset demo data

Modules should share common data, for example:

```text
Courses
   ↓
Attendance
   ↓
Assignments
   ↓
Results
   ↓
Student Dashboard
```

### Future
- MySQL
- PHP backend
- REST APIs
- Server-side validation
- Database relationships
- Transactions
- Backup and recovery

## 19. Database Requirements

### Expected Tables

```text
users
students
faculty
departments
courses
enrollments
attendance
attendance_records
assignments
submissions
results
fees
payments
notices
timetable
notifications
```

### Requirements
- Primary keys
- Foreign keys
- Unique constraints
- Indexes
- Relationships
- Validation
- Normalization
- Referential integrity

## 20. Backend Requirements

Future backend should use PHP.

```text
api/
├── auth/
├── students/
├── faculty/
├── courses/
├── attendance/
├── assignments/
├── results/
├── fees/
├── notices/
└── timetable/
```

Responsibilities:
- Authentication
- Authorization
- CRUD
- Database communication
- Validation
- API responses
- File handling
- Security
- Error handling

## 21. REST API Requirements

### Authentication
```text
POST /api/login
POST /api/logout
```

### Students
```text
GET /api/students
GET /api/students/{id}
POST /api/students
PUT /api/students/{id}
DELETE /api/students/{id}
```

The current implementation routes these operations through
`api/index.php?resource=students`; update and delete requests pass the database
record ID as an `id` query parameter. All requests require a signed-in session.
Admin and Faculty accounts can create, edit, and delete records; Student
accounts can view them. The Students page uses the MySQL API when available and
shows browser demo data with a notification when the API cannot be reached.

To verify the integration, import `database/schema.sql`, sign in through the
portal using an Admin or Faculty demo account, and use **Students** to add,
edit, or delete a record. Reload the page to confirm the changes persist in
MySQL. The API validates required fields and CGPA, rejects duplicate student
IDs, and returns errors for failed requests.

### Courses
The Courses page uses `api/index.php?resource=courses` for MySQL-backed course
records. All signed-in roles can view courses; only Admin can create, edit, or
delete them. Course codes must be unique, credits must be between 1 and 30, and
the API validates all required fields. If the API is unavailable, the page
keeps its demo data and reports that it is using browser storage.

### Courses
```text
GET /api/courses
POST /api/courses
PUT /api/courses/{id}
DELETE /api/courses/{id}
```

Similar endpoints should be developed for attendance, assignments, results, fees, notices, faculty, and timetable.

## 22. Security Requirements

### Authentication
- Password hashing
- Secure sessions
- Session expiration
- Logout
- RBAC

### Input
- Server-side validation
- Client-side validation
- Sanitization
- Output escaping

### Database
- Prepared statements
- SQL injection prevention
- Database permissions

### Web
- XSS protection
- CSRF protection
- Secure file uploads
- Session security
- HTTPS
- Secure cookies

## 23. Search, Filtering, Sorting and Pagination

### Basic
- Student search
- Course search
- Assignment search
- Assignment status filtering

### Future
- Multiple filters
- Sorting
- Pagination
- Server-side search
- Advanced tables
- Department/semester/status filters

## 24. Reports

Planned reports:
- Student
- Faculty
- Course
- Attendance
- Assignment
- Result
- Fee
- Enrollment

Future exports:
- Print
- PDF
- Excel/CSV

## 25. Notifications

The system should eventually notify users about:
- New assignments
- Assignment deadlines
- Overdue assignments
- Low attendance
- Published results
- Fee due dates
- New notices
- Timetable updates

Future delivery:
- In-app
- Email
- SMS

## 26. File Management

Future support:
- Assignment files
- Submissions
- Course materials
- Student documents
- Faculty documents
- Profile photos
- Notice attachments

Security:
- File type validation
- File size limits
- Secure filenames
- Authorization
- Protected storage

## 27. UI/UX Requirements

- Clean layout
- Responsive design
- Modern dashboard
- Cards
- Tables
- Forms
- Buttons
- Badges
- Progress indicators
- Modals
- Alerts
- Notifications
- Consistent spacing and typography
- Light mode
- Dark mode

### Future
- Smooth animations
- Loading states
- Skeleton screens
- Accessibility
- Keyboard navigation
- Better mobile navigation
- Improved empty/error states

## 28. Responsive Design

The portal must support:
- Desktop
- Laptop
- Tablet
- Mobile

Navigation, tables, forms, cards, and dashboards should adapt to screen size.

## 29. Admin Dashboard

Future centralized management for:
- Students
- Faculty
- Courses
- Attendance
- Assignments
- Results
- Fees
- Notices
- Timetable
- Users

Dashboard statistics:
- Students
- Faculty
- Courses
- Departments
- Attendance
- Assignments
- Results
- Fees
- Notices
- Recent activity

## 30. Faculty Dashboard

Future features:
- Assigned courses
- Student lists
- Attendance
- Assignments
- Results
- Notices
- Timetable
- Academic statistics

## 31. Student Dashboard

Core:
- Personal information
- Courses
- Attendance
- Assignments
- Results
- Fees
- Notices
- Timetable
- Profile

Future:
- CGPA
- Analytics
- Attendance trends
- Assignment performance
- Recommendations
- Notifications

## 32. Validation

### Basic
- Required fields
- Email validation
- Phone validation
- Numeric values
- Date validation
- Empty-field checks

### Advanced
- Server-side validation
- Duplicate prevention
- Database constraints
- Secure validation rules
- File validation
- Role-based validation

## 33. Audit Logging

Future enterprise feature.

Track:
- Login/logout
- Student changes
- Course changes
- Attendance changes
- Result publishing
- Fee payments
- Notice publishing

Log information:
- User
- Action
- Date/time
- Related record
- Appropriate session/IP information

## 34. Backup and Recovery

Future:
- Database backups
- Automated backups
- Restoration
- Data recovery
- Backup retention
- Disaster recovery planning

## 35. Advanced Academic Analytics

Future:
- Attendance trends
- Performance analysis
- Semester comparison
- Course analysis
- Academic risk detection
- Attendance shortage prediction
- Performance prediction
- At-risk student identification
- Academic recommendations

## 36. Optional AI Features

After the core system is stable, optional AI features may include:
- AI academic assistant
- College portal Q&A
- Study recommendations
- Personalized learning suggestions
- Performance prediction
- Attendance risk prediction
- Deadline recommendations
- Academic performance analysis
- Course recommendations

## 37. Performance Optimization

Future:
- Efficient JavaScript
- Optimized queries
- Pagination
- Lazy loading
- Asset optimization
- CSS/JS minification
- API optimization
- Caching
- Reduced network requests
- Optimized images/uploads

## 38. Testing Requirements

### Functional Testing
Test:
- Login/logout
- Student management
- Faculty management
- Courses
- Attendance
- Assignments
- Results
- Fees
- Notices
- Timetable
- Profile

### Other Testing
- Unit testing
- Integration testing
- System testing
- Security testing
- Responsive testing
- Browser compatibility
- User acceptance testing

## 39. Deployment

### Development
```text
XAMPP
Apache
MySQL
Browser
```

### Future Production
- PHP hosting
- MySQL
- Domain
- HTTPS/SSL
- Production configuration
- Database migration
- Backups
- Error logging
- Security configuration

# 40. Project Roadmap

## Phase 1 — UI Foundation
**Status: Completed**

- Portal layout
- HTML/CSS structure
- Responsive UI
- Navigation
- Dashboard foundation

## Phase 2 — Interactive Functionality
**Status: Completed / Partially Completed**

- JavaScript interactions
- Navigation
- Forms
- Tables
- Modals
- Dynamic page loading
- User interactions

## Phase 3 — Data Management
**Status: Completed / Partially Completed**

- LocalStorage
- Shared application data
- Seed data
- Reset demo data
- CRUD-style behavior

## Phase 4 — Authentication and Roles
**Status: Frontend Demo Completed**

- Login
- Logout
- Current user
- Admin
- Faculty
- Student
- Role-based navigation

Future:
- PHP authentication
- MySQL users
- Secure sessions
- Password hashing
- RBAC

## Phase 5 — Admin Management
**Status: Started / Partially Completed**

- Student management
- Faculty management
- Course management
- Attendance management
- Assignment management
- Result management
- Fee management
- Notices
- Timetable

## Phase 6 — Student Academic Management
**Status: Current Development Area**

- Module 1: Student Dashboard — Completed
  - Role-aware dashboard statistics
  - Student identity and academic summary
  - Course attendance overview with good/warning indicators
  - Current-day class schedule, assignment deadlines, notices, and quick actions
- Module 2: Student Courses — Completed
  - Show active courses matching the student's department and semester
  - Course cards with code, name, instructor, credit hours, semester, and status
  - Course search and course detail dialog
  - Summary of visible courses and total credit hours
- Module 3: Student Attendance — Completed
  - Per-student, per-course present, absent, and total class summaries
  - Calculated course and overall percentages with Good/Warning status
  - Staff student selector, daily attendance marking and correction
  - Attendance report export to CSV
- Module 4: Student Assignments — Completed
  - Student assignment cards with search, status filtering, due dates, marks, and details
  - Submitted, pending, and date-derived overdue statuses
  - Admin/Faculty assignment creation, editing, deletion, and per-student submission status
  - LocalStorage assignment records and student submission status — Completed
  - Student assignment cards with search, status filtering, due dates, marks, and details
  - Submitted, pending, and date-derived overdue statuses
  - Admin/Faculty assignment creation, editing, and deletion
  - LocalStorage assignment records and student submission status
- Module 5: Student Results — Completed
  - Student grade summary with calculated GPA and overall CGPA
  - Course-wise marks, grade, and grade point table
  - Credits completed summary based on active semester courses
  - Auto-generated grade mapping for student academic performance
- Module 6: Student Fees — Completed
  - Student fee total, paid amount, remaining balance, and payment status
  - Payment history stored in LocalStorage
  - Admin student selector and payment recording with outstanding-balance validation
- Module 7: Student Profile — Completed
  - Student profile summary with ID, father name, email, phone, address, department, program, semester, and admission date
  - Role-aware reading of the current user and linked student record

## Phase 7 — Faculty Management
**Status: Started / Partially Completed**

- Faculty directory with search and department filtering
- Faculty cards with role, department, and assigned-course summary
- Faculty detail modal with contact and course assignments
- Faculty dashboard
- Attendance
- Assignments
- Results
- Timetable
- Student management

## Phase 8 — Database and Backend
**Status: Started / Partially Completed**

- PHP backend
- MySQL
- Database design
- Relationships
- Student CRUD API and session-backed demo authentication

## Phase 9 — API Integration
**Status: In Progress**

- REST APIs
- Frontend/API communication
- Authentication APIs
- Student APIs — list, create, update, and delete are connected to the Students page
- Course APIs — list, create, update, and delete are connected to the Courses page
- Attendance APIs
- Assignment APIs
- Result APIs
- Fee APIs
- Notice APIs

## Phase 10 — Security
**Status: Future**

- Password hashing
- Secure sessions
- RBAC
- Prepared statements
- SQL injection prevention
- XSS protection
- CSRF protection
- Secure uploads
- HTTPS

## Phase 11 — Advanced Features
**Status: Future**

- Analytics
- Reports
- Notifications
- File management
- Advanced search
- Pagination
- Audit logs
- Backup/recovery
- Performance optimization

## Phase 12 — AI Features
**Status: Optional Future**

- AI academic assistant
- Performance prediction
- Attendance risk prediction
- Personalized recommendations
- Intelligent academic analytics

## Phase 13 — Testing and Deployment
**Status: Future**

- Functional testing
- Integration testing
- Security testing
- Responsive testing
- Performance testing
- Production deployment
- Database migration
- Backups
- Monitoring

# 41. Final Target Architecture

```text
                COLLEGE PORTAL
                      │
       ┌──────────────┼──────────────┐
       │              │              │
     ADMIN         FACULTY        STUDENT
       │              │              │
       └──────────────┼──────────────┘
                      │
                  FRONTEND
             HTML / CSS / JS
                      │
                  REST API
                      │
                    PHP
                      │
                  MySQL DB
                      │
       ┌──────────────┼──────────────┐
       │              │              │
 Authentication   Academic      Administration
                    Modules
       │              │              │
       └──────────────┼──────────────┘
                      │
              Reports / Analytics
                      │
                 Optional AI
```

# 42. Final Feature Checklist

## Core
- [x] Responsive portal UI
- [x] Dashboard foundation
- [x] Navigation
- [x] Login demo
- [x] Logout
- [x] Role-based frontend behavior
- [x] LocalStorage
- [x] Shared demo data
- [x] Courses
- [x] Attendance
- [x] Assignments
- [x] Results

## In Development / Expansion
- [ ] Student dashboard expansion
- [x] Student fees
- [ ] Student profile
- [ ] Admin management
- [ ] Faculty dashboard
- [ ] Faculty management
- [ ] Notices
- [ ] Timetable
- [ ] Advanced search/filtering
- [ ] Reports

## Future Full-Stack
- [ ] PHP backend
- [ ] MySQL database
- [ ] REST APIs
- [ ] Secure authentication
- [ ] Password hashing
- [ ] RBAC
- [ ] Server-side validation
- [ ] File uploads
- [ ] Notifications
- [ ] Audit logging
- [ ] Backup/recovery
- [ ] Testing
- [ ] Production deployment

## Optional Advanced
- [ ] Academic analytics
- [ ] Predictive analytics
- [ ] AI academic assistant
- [ ] Attendance risk prediction
- [ ] Performance prediction
- [ ] Personalized recommendations

# 43. Project Development Principle

The project should be developed incrementally:

```text
UI
 ↓
Interactive Features
 ↓
Local Data
 ↓
Authentication
 ↓
Role Management
 ↓
Admin Features
 ↓
Student Features
 ↓
Faculty Features
 ↓
MySQL Database
 ↓
PHP Backend
 ↓
REST APIs
 ↓
Security
 ↓
Reports & Notifications
 ↓
Advanced Analytics
 ↓
Optional AI
 ↓
Testing
 ↓
Deployment
```

The main goal is to keep each phase functional before moving to the next phase. Existing functionality should be preserved while new modules are integrated.
