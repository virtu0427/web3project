-- Users table
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email)
);

-- Company table
CREATE TABLE Company (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  industry VARCHAR(100),
  location VARCHAR(255),
  website VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_name (name),
  INDEX idx_industry (industry)
);

-- JobPost table
CREATE TABLE JobPost (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  posted_date DATE NOT NULL,
  closing_date DATE,
  company_id INTEGER NOT NULL,
  tech_stack TEXT,
  experience VARCHAR(100),
  education VARCHAR(100),
  employment_type VARCHAR(50),
  salary VARCHAR(100),
  address_main VARCHAR(255),
  address_total TEXT,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES Company(id),
  INDEX idx_posted_date (posted_date),
  INDEX idx_closing_date (closing_date),
  INDEX idx_company_id (company_id)
);

-- Application table
CREATE TABLE Application (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  user_id INTEGER NOT NULL,
  job_post_id INTEGER NOT NULL,
  applied_date DATE NOT NULL,
  status ENUM('PENDING', 'ACCEPTED', 'REJECTED') DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (job_post_id) REFERENCES JobPost(id),
  UNIQUE KEY unique_application (user_id, job_post_id),
  INDEX idx_user_id (user_id),
  INDEX idx_job_post_id (job_post_id),
  INDEX idx_status (status)
);

-- Bookmark table
CREATE TABLE Bookmark (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  user_id INTEGER NOT NULL,
  job_post_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (job_post_id) REFERENCES JobPost(id),
  UNIQUE KEY unique_bookmark (user_id, job_post_id),
  INDEX idx_user_id (user_id),
  INDEX idx_job_post_id (job_post_id)
);

-- UserReview table
CREATE TABLE UserReview (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  user_id INTEGER NOT NULL,
  company_id INTEGER NOT NULL,
  rating TINYINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (company_id) REFERENCES Company(id),
  UNIQUE KEY unique_review (user_id, company_id),
  INDEX idx_user_id (user_id),
  INDEX idx_company_id (company_id),
  INDEX idx_rating (rating)
);

-- UserActivity table
CREATE TABLE UserActivity (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  user_id INTEGER NOT NULL,
  activity_type VARCHAR(50) NOT NULL,
  details JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_user_id (user_id),
  INDEX idx_activity_type (activity_type),
  INDEX idx_created_at (created_at)
);

-- JobViewed table
CREATE TABLE JobViewed (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  user_id INTEGER NOT NULL,
  job_posting_id INTEGER NOT NULL,
  viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (job_posting_id) REFERENCES JobPost(id),
  UNIQUE KEY unique_view (user_id, job_posting_id),
  INDEX idx_user_id (user_id),
  INDEX idx_job_posting_id (job_posting_id),
  INDEX idx_viewed_at (viewed_at)
);