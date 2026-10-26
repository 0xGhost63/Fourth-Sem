-- parent tables first
CREATE TABLE departments (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50) NOT NULL,
    budget DECIMAL(12,2)
);

CREATE TABLE students (
    student_id INT PRIMARY KEY,
    student_name VARCHAR(50) NOT NULL,
    dept_id INT,
    gpa DECIMAL(3,2),
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

CREATE TABLE teachers (
    teacher_id INT PRIMARY KEY,
    teacher_name VARCHAR(50) NOT NULL,
    manager_id INT,
    salary DECIMAL(10,2),
    FOREIGN KEY (manager_id) REFERENCES teachers(teacher_id)
);

CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    course_title VARCHAR(60) NOT NULL,
    teacher_id INT,
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id)
);

CREATE TABLE enrollments (
    enroll_id INT IDENTITY(1,1) PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
GO

INSERT INTO departments VALUES (1,'Computer Science',5000000),(2,'Mathematics',2500000),(3,'Biology',2000000);

INSERT INTO students VALUES (1,'Ahmed',1,3.80),(2,'Bilal',1,3.20),(3,'Hina',NULL,3.90),(4,'Sana',2,3.60),(5,'Usman',2,2.70);

INSERT INTO teachers VALUES (1,'Dr. Ali',NULL,250000),(2,'Dr. Sara',1,180000),(3,'Dr. Hamid',NULL,240000),(4,'Dr. Noor',3,170000);

INSERT INTO courses VALUES (101,'Database Systems',1),(102,'Calculus',3),(103,'Genetics',NULL);

INSERT INTO enrollments (student_id, course_id) VALUES (1,101),(2,101),(5,101),(4,102);
GO
