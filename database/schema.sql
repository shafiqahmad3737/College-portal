CREATE DATABASE IF NOT EXISTS college_portal CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE college_portal;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(80) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(120) NOT NULL,
    role ENUM('Admin', 'Faculty', 'Student') NOT NULL,
    student_id VARCHAR(50) NULL,
    email VARCHAR(150) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(120) NOT NULL,
    father_name VARCHAR(120) NULL,
    email VARCHAR(150) NULL,
    phone VARCHAR(30) NULL,
    address VARCHAR(255) NULL,
    department VARCHAR(100) NOT NULL,
    program VARCHAR(120) NULL,
    semester VARCHAR(30) NOT NULL,
    admission_date DATE NULL,
    cgpa DECIMAL(3,2) DEFAULT 0.00,
    status VARCHAR(20) DEFAULT 'Active'
);

CREATE TABLE IF NOT EXISTS faculty (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(150) NULL,
    phone VARCHAR(30) NULL,
    department VARCHAR(100) NOT NULL,
    role VARCHAR(80) NOT NULL
);

CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(160) NOT NULL,
    teacher VARCHAR(120) NOT NULL,
    credits INT NOT NULL,
    department VARCHAR(100) NOT NULL,
    semester VARCHAR(30) NOT NULL,
    status VARCHAR(20) DEFAULT 'Active'
);

CREATE TABLE IF NOT EXISTS attendance_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    course_id VARCHAR(50) NOT NULL,
    total_classes INT NOT NULL DEFAULT 0,
    present_classes INT NOT NULL DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS assignments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id VARCHAR(50) NOT NULL,
    title VARCHAR(160) NOT NULL,
    description TEXT,
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    marks INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    assignment_id INT NOT NULL,
    student_id VARCHAR(50) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'Pending',
    submitted_at DATETIME NULL,
    FOREIGN KEY (assignment_id) REFERENCES assignments(id)
);

CREATE TABLE IF NOT EXISTS results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    course_name VARCHAR(160) NOT NULL,
    credits INT NOT NULL,
    marks INT NOT NULL,
    grade VARCHAR(10) NOT NULL,
    grade_point DECIMAL(3,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS fees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    paid_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00
);

CREATE TABLE IF NOT EXISTS payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    payment_date DATE NOT NULL,
    description VARCHAR(160) NOT NULL,
    amount DECIMAL(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS notices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(160) NOT NULL,
    description TEXT NOT NULL,
    created_at DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS timetable (
    id INT AUTO_INCREMENT PRIMARY KEY,
    day_name VARCHAR(20) NOT NULL,
    time_slot VARCHAR(50) NOT NULL,
    course_name VARCHAR(160) NOT NULL,
    instructor VARCHAR(120) NOT NULL,
    room VARCHAR(60) NULL
);

INSERT INTO users (username, password_hash, name, role, student_id, email)
VALUES
    ('admin', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', 'Administrator', 'Admin', NULL, 'admin@college.edu'),
    ('faculty', '27041f5856c7387a997252694afb048d1aa939228ffcdbd6285b979b8da20e7a', 'Faculty User', 'Faculty', NULL, 'faculty@college.edu'),
    ('student', '703b0a3d6ad75b649a28adde7d83c6251da457549263bc7ff45ec709b0a8448b', 'Shafiq Ahmad', 'Student', 'CS-2023-001', 'student@college.edu')
ON DUPLICATE KEY UPDATE
    password_hash = VALUES(password_hash),
    name = VALUES(name),
    role = VALUES(role),
    student_id = VALUES(student_id),
    email = VALUES(email);

INSERT INTO students (student_id, name, father_name, email, phone, address, department, program, semester, admission_date, cgpa, status)
VALUES
    ('CS-2023-001', 'Shafiq Ahmad', 'Ahmad Ali', 'student@college.edu', '+92 300 1234567', 'Lahore, Pakistan', 'Computer Science', 'BS Computer Science', '6th', '2023-09-01', 3.62, 'Active'),
    ('CS-2023-002', 'Ali Khan', 'Zahid Khan', 'ali.khan@college.edu', '+92 300 2233445', 'Islamabad, Pakistan', 'Computer Science', 'BS Computer Science', '6th', '2023-09-01', 3.45, 'Active'),
    ('SE-2023-003', 'Sara Ahmed', 'Ahmed Raza', 'sara.ahmed@college.edu', '+92 300 7788991', 'Karachi, Pakistan', 'Software Engineering', 'BS Software Engineering', '5th', '2023-09-01', 3.78, 'Active')
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    department = VALUES(department),
    semester = VALUES(semester),
    cgpa = VALUES(cgpa),
    status = VALUES(status);

INSERT INTO faculty (name, email, phone, department, role)
VALUES
    ('Dr. Ahmed Khan', 'ahmed.khan@college.edu', '+92 300 1112233', 'Computer Science', 'Professor'),
    ('Prof. Sara Ali', 'sara.ali@college.edu', '+92 300 4455667', 'Software Engineering', 'Associate Professor'),
    ('Dr. Hamza Shah', 'hamza.shah@college.edu', '+92 300 7788990', 'Information Technology', 'Assistant Professor')
ON DUPLICATE KEY UPDATE
    email = VALUES(email),
    department = VALUES(department),
    role = VALUES(role);

INSERT INTO courses (code, name, teacher, credits, department, semester, status)
VALUES
    ('CS-601', 'Artificial Intelligence', 'Dr. Ahmed Khan', 3, 'Computer Science', '6th', 'Active'),
    ('CS-602', 'Web Engineering', 'Prof. Sara Ali', 3, 'Computer Science', '6th', 'Active'),
    ('CS-603', 'Information Security', 'Dr. Hamza Shah', 3, 'Computer Science', '6th', 'Active')
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    teacher = VALUES(teacher),
    credits = VALUES(credits),
    department = VALUES(department),
    semester = VALUES(semester),
    status = VALUES(status);

INSERT INTO notices (title, description, created_at)
VALUES
    ('Mid-Term Examination Schedule', 'The mid-term examination schedule has been published.', '2026-09-18'),
    ('Semester Fee Deadline', 'Students are requested to submit their semester fee before the deadline.', '2026-09-15')
ON DUPLICATE KEY UPDATE
    description = VALUES(description),
    created_at = VALUES(created_at);

INSERT INTO fees (student_id, total_amount, paid_amount)
VALUES
    ('CS-2023-001', 45000, 35000),
    ('CS-2023-002', 45000, 20000),
    ('SE-2023-003', 45000, 0)
ON DUPLICATE KEY UPDATE
    total_amount = VALUES(total_amount),
    paid_amount = VALUES(paid_amount);

INSERT INTO payments (student_id, payment_date, description, amount)
VALUES
    ('CS-2023-001', '2026-08-05', 'Semester fee installment', 20000),
    ('CS-2023-001', '2026-09-05', 'Semester fee installment', 15000),
    ('CS-2023-002', '2026-09-01', 'Semester fee installment', 20000)
ON DUPLICATE KEY UPDATE
    description = VALUES(description),
    amount = VALUES(amount);

INSERT INTO results (student_id, course_name, credits, marks, grade, grade_point)
VALUES
    ('CS-2023-001', 'Artificial Intelligence', 3, 88, 'A', 4.00),
    ('CS-2023-001', 'Web Engineering', 3, 84, 'A-', 3.70),
    ('CS-2023-001', 'Information Security', 3, 81, 'A-', 3.70)
ON DUPLICATE KEY UPDATE
    marks = VALUES(marks),
    grade = VALUES(grade),
    grade_point = VALUES(grade_point);
