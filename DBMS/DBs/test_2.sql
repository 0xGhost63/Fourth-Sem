/* ============================================================
   FILE: school_detailed.sql
   PURPOSE: A detailed, well-commented reference script covering
            common T-SQL (SQL Server) concepts useful for coursework:
            - Database and table creation
            - Constraints (PK, FK, UNIQUE, CHECK, DEFAULT)
            - Relationships between tables
            - INSERT / UPDATE / DELETE
            - SELECT queries (filtering, sorting, joins, aggregates)
            - Views and a simple stored procedure

   HOW TO RUN:
   - In VS Code (MSSQL extension), select a block and press
     Ctrl+Shift+E to run just that block, or run the whole file.
   - GO separates batches. Some statements (like CREATE DATABASE)
     must be in their own batch, which is why GO appears after them.
   ============================================================ */


/* ------------------------------------------------------------
   1. CREATE DATABASE (only if it doesn't already exist)
   ------------------------------------------------------------ */
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'school')
BEGIN
    CREATE DATABASE school;
END
GO

USE school;
GO


/* ------------------------------------------------------------
   2. DROP TABLES IF THEY EXIST (clean slate for re-running)
      Order matters: drop child tables (with foreign keys) first,
      then parent tables, otherwise SQL Server will block the drop.
   ------------------------------------------------------------ */
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'enrollments')
    DROP TABLE enrollments;
GO

IF EXISTS (SELECT * FROM sys.tables WHERE name = 'courses')
    DROP TABLE courses;
GO

IF EXISTS (SELECT * FROM sys.tables WHERE name = 'students')
    DROP TABLE students;
GO


/* ------------------------------------------------------------
   3. CREATE TABLES WITH CONSTRAINTS
   ------------------------------------------------------------ */

-- Parent table: students
CREATE TABLE students (
    id          INT IDENTITY(1,1) PRIMARY KEY,   -- auto-incrementing ID
    name        VARCHAR(50) NOT NULL,
    email       VARCHAR(100) UNIQUE NOT NULL,
    age         INT CHECK (age >= 16 AND age <= 60),  -- basic sanity check
    enrolled_on DATE DEFAULT GETDATE()            -- defaults to today
);
GO

-- Parent table: courses
CREATE TABLE courses (
    course_id   INT IDENTITY(1,1) PRIMARY KEY,
    title       VARCHAR(100) NOT NULL,
    credit_hrs  INT NOT NULL CHECK (credit_hrs BETWEEN 1 AND 6)
);
GO

-- Child table: enrollments (links students <-> courses, many-to-many)
CREATE TABLE enrollments (
    enrollment_id INT IDENTITY(1,1) PRIMARY KEY,
    student_id    INT NOT NULL,
    course_id     INT NOT NULL,
    grade         CHAR(2) NULL,                  -- e.g. 'A', 'B+', NULL if not graded yet
    CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES students(id),
    CONSTRAINT fk_course  FOREIGN KEY (course_id)  REFERENCES courses(course_id),
    CONSTRAINT uq_enrollment UNIQUE (student_id, course_id) -- prevent duplicate enrollment
);
GO


/* ------------------------------------------------------------
   4. INSERT SAMPLE DATA
   ------------------------------------------------------------ */

INSERT INTO students (name, email, age) VALUES
('Ali Khan',     'ali.khan@example.com',     20),
('Sara Ahmed',   'sara.ahmed@example.com',   19),
('Ahmad',        'ahmad@example.com',        21),
('Sannan Ahmad', 'sannanahmad123@gmail.com', 20);
GO

INSERT INTO courses (title, credit_hrs) VALUES
('Database Systems',       3),
('Operating Systems',      4),
('Data Structures',        3),
('Web Development',        2);
GO

-- Enroll students in courses (student_id / course_id refer to IDENTITY values above)
INSERT INTO enrollments (student_id, course_id, grade) VALUES
(1, 1, 'A'),
(1, 2, 'B+'),
(2, 1, 'A-'),
(3, 3, NULL),   -- not graded yet
(4, 4, 'B');
GO


/* ------------------------------------------------------------
   5. BASIC SELECT QUERIES
   ------------------------------------------------------------ */

-- All students
SELECT * FROM students;
GO

-- Only name and email, students older than 19
SELECT name, email
FROM students
WHERE age > 19;
GO

-- Sort students by age, descending
SELECT name, age
FROM students
ORDER BY age DESC;
GO


/* ------------------------------------------------------------
   6. JOINS (combining data across related tables)
   ------------------------------------------------------------ */

-- Show each enrollment with the student's name and course title
SELECT
    s.name        AS student_name,
    c.title       AS course_title,
    e.grade
FROM enrollments e
JOIN students s ON e.student_id = s.id
JOIN courses  c ON e.course_id  = c.course_id;
GO

-- Show students who are NOT enrolled in anything (LEFT JOIN + NULL check)
SELECT s.name
FROM students s
LEFT JOIN enrollments e ON s.id = e.student_id
WHERE e.enrollment_id IS NULL;
GO


/* ------------------------------------------------------------
   7. AGGREGATE FUNCTIONS + GROUP BY
   ------------------------------------------------------------ */

-- Count how many students are enrolled in each course
SELECT
    c.title,
    COUNT(e.student_id) AS total_enrolled
FROM courses c
LEFT JOIN enrollments e ON c.course_id = e.course_id
GROUP BY c.title;
GO

-- Average age of all students
SELECT AVG(age) AS average_age FROM students;
GO


/* ------------------------------------------------------------
   8. UPDATE and DELETE
   ------------------------------------------------------------ */

-- Update a grade
UPDATE enrollments
SET grade = 'A'
WHERE student_id = 3 AND course_id = 3;
GO

-- Delete a specific enrollment (be careful with WHERE clause!)
-- DELETE FROM enrollments WHERE enrollment_id = 5;
-- GO


/* ------------------------------------------------------------
   9. A SIMPLE VIEW (a saved, reusable query)
   ------------------------------------------------------------ */

IF EXISTS (SELECT * FROM sys.views WHERE name = 'student_grades')
    DROP VIEW student_grades;
GO

CREATE VIEW student_grades AS
SELECT
    s.name  AS student_name,
    c.title AS course_title,
    e.grade
FROM enrollments e
JOIN students s ON e.student_id = s.id
JOIN courses  c ON e.course_id  = c.course_id;
GO

-- Now you can just query the view like a table:
SELECT * FROM student_grades;
GO


/* ------------------------------------------------------------
   10. A SIMPLE STORED PROCEDURE (reusable parameterized query)
   ------------------------------------------------------------ */

IF EXISTS (SELECT * FROM sys.procedures WHERE name = 'GetStudentCourses')
    DROP PROCEDURE GetStudentCourses;
GO

CREATE PROCEDURE GetStudentCourses
    @StudentId INT
AS
BEGIN
    SELECT c.title, e.grade
    FROM enrollments e
    JOIN courses c ON e.course_id = c.course_id
    WHERE e.student_id = @StudentId;
END
GO

-- Run the stored procedure for student with id = 1
EXEC GetStudentCourses @StudentId = 1;
GO