-- DROP TABLE IF EXISTS ratings;
-- DROP TABLE IF EXISTS has_movies;
-- DROP TABLE IF EXISTS makes;
-- DROP TABLE IF EXISTS movies;
-- DROP TABLE IF EXISTS movielists;
-- DROP TABLE IF EXISTS users;

CREATE TABLE users (
    uid INT AUTO_INCREMENT PRIMARY KEY, 
    password VARCHAR(255) NOT NULL, 
    username VARCHAR(255) NOT NULL
);

CREATE TABLE movielists (
    list_id INT AUTO_INCREMENT PRIMARY KEY,
    uid INT NOT NULL,
    movielist_name VARCHAR(255) NOT NULL,
    movie_names JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE movies (
    movie_id INT AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(255) NOT NULL, 
    genre VARCHAR(100) NOT NULL, 
    duration INT NOT NULL, 
    series VARCHAR(255) 
);

CREATE TABLE IF NOT EXISTS ratings (
    rating_id INT AUTO_INCREMENT PRIMARY KEY,
    list_id INT,
    uid INT,
    rating TINYINT CHECK (rating >= 1 AND rating <= 5),
    FOREIGN KEY (list_id) REFERENCES movielists(list_id),
    FOREIGN KEY (uid) REFERENCES users(uid),
    UNIQUE KEY unique_rating (list_id, uid)
);

