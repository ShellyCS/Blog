-- Drop the database if it exists
DROP DATABASE IF EXISTS blog;

-- Create the database
CREATE DATABASE IF NOT EXISTS blog;

-- Use the database
USE blog;

-- Creating user table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(45) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    img VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INSERT VALUES INTO USERS TABLE
ALTER TABLE users AUTO_INCREMENT = 1;

INSERT INTO users (username, email, password, img) VALUES
('jane_doe', 
 'jane.doe@example.com', 
 'pwd123',  -- Remember to hash the password in a real-world scenario
 NULL),

('alice_smith', 
 'alice.smith@example.com', 
 'pwd894',
 NULL),

('bob_jones', 
 'bob.jones@example.com', 
 'pwd532',
 NULL),

('charlie_brown', 
 'charlie.brown@example.com', 
 'pwd443',
 NULL),

('emily_clark', 
 'emily.clark@example.com', 
 'pwd332',
 NULL);



-- CREATING POSTS TABLE
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,       -- Unique post identifier (Primary Key)
    title VARCHAR(255) NOT NULL,                      -- Post title
    `desc` TEXT NOT NULL,                             -- Post description (use TEXT to allow for longer content)
    img VARCHAR(255),                                 -- URL to post image (can be null if no image)
    cat VARCHAR(255),                                 -- Post category (can be null or empty string if not applicable)
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,         -- Timestamp for when the post was created
    uid INT NOT NULL,                                 -- User ID (Foreign Key to the users table)
    FOREIGN KEY (uid) REFERENCES users(id) ON DELETE CASCADE  -- Foreign Key referencing the users table, on delete CASCADE
);



-- INSERT VALUES IN POSTS
ALTER TABLE posts AUTO_INCREMENT = 1;

-- INSERT VALUES IN POSTS WITH NEW CATEGORIES
ALTER TABLE posts AUTO_INCREMENT = 1;

INSERT INTO posts (title, `desc`, img, cat, uid)
VALUES
    ("Exploring the Renaissance Art Movement", "An in-depth look at the Renaissance period, exploring its art, history, and impact on the world.", "https://images.pexels.com/photos/6501177/pexels-photo-6501177.jpeg", "Art", 2),
    
    ("The Role of Science in Modern Medicine", "This post discusses how scientific advancements have revolutionized the field of medicine and improved lives.", "https://images.pexels.com/photos/256379/pexels-photo-256379.jpeg", "Science", 3),
    
    ("The Future of Artificial Intelligence", "AI is transforming various industries. This post discusses the future potential and challenges faced by AI technologies.", "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg", "Technology", 3),
    
    ("Healthy Eating Tips for Busy Professionals", "A quick guide to maintaining a healthy diet while juggling a busy work schedule.", "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg", "Food", 4),
    
    ("Top 5 Films to Watch in 2024", "A list of must-watch films releasing in 2024, ranging from blockbusters to indie gems.", "https://images.pexels.com/photos/6501135/pexels-photo-6501135.jpeg", "Cinema", 5),
    
    ("Design Thinking: An Introduction", "An exploration of the design thinking methodology and its application in creative problem-solving.", "https://images.pexels.com/photos/1591067/pexels-photo-1591067.jpeg", "Design", 2);
