CREATE DATABASE IF NOT EXISTS candidate_dashboard;
USE candidate_dashboard;

CREATE TABLE recruiters (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE candidates (
  id INT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20),
  experience DECIMAL(4,1) DEFAULT 0,
  current_company VARCHAR(100),
  expected_salary DECIMAL(12,2),
  notice_period VARCHAR(50),
  interview_status VARCHAR(50) DEFAULT 'Applied',
  resume_link TEXT,
  notes TEXT,
  created_by INT,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES recruiters(id)
);

CREATE TABLE candidate_skills (
  id INT PRIMARY KEY AUTO_INCREMENT,
  candidate_id INT NOT NULL,
  skill_name VARCHAR(100) NOT NULL,
  FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

-- Default recruiter login
-- Password: password123
INSERT INTO recruiters (name, email, password)
VALUES (
  'Admin',
  'admin@example.com',
  '$2b$10$1oD0y5JzT0WQ8l0v4lQKQOGQhQ4zM/1vM6xQ1Q1vM8o0q0HnG6J9S'
);