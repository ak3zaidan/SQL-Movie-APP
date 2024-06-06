-- Creating the users table 
CREATE TABLE users (
    uid INT AUTO_INCREMENT PRIMARY KEY, 
    password VARCHAR(255) NOT NULL, 
    username VARCHAR(255) NOT NULL
);

-- Creating the movielists table 
CREATE TABLE movielists ( 
    list_id INT AUTO_INCREMENT PRIMARY KEY, 
    uid INT NOT NULL, 
    movielist_name VARCHAR(255) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    description TEXT, 
    FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE ON UPDATE CASCADE 
);

-- Creating the movies table 
CREATE TABLE movies ( 
    movie_id INT AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(255) NOT NULL, 
    producer VARCHAR(255) NOT NULL, 
    genre VARCHAR(100) NOT NULL, 
    duration INT NOT NULL, 
    series VARCHAR(255) 
);

-- Creating the ratings table 
CREATE TABLE ratings ( 
    rating_id INT AUTO_INCREMENT PRIMARY KEY, 
    uid INT, 
    list_id INT, 
    rating INT CHECK (rating BETWEEN 1 AND 5), 
    review VARCHAR(100), 
    rated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE SET NULL ON UPDATE CASCADE, 
    FOREIGN KEY (list_id) REFERENCES movielists(list_id) ON DELETE CASCADE ON UPDATE CASCADE 
);

-- Creating the has_movies table 
CREATE TABLE has_movies ( 
    list_id INT, 
    movie_id INT, 
    PRIMARY KEY (list_id, movie_id),
    FOREIGN KEY (list_id) REFERENCES movielists(list_id) ON DELETE CASCADE ON UPDATE CASCADE, 
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE ON UPDATE CASCADE 
);

-- Creating the makes table 
CREATE TABLE makes ( 
    uid INT NOT NULL, 
    list_id INT NOT NULL, 
    PRIMARY KEY (uid, list_id), 
    FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE ON UPDATE CASCADE, 
    FOREIGN KEY (list_id) REFERENCES movielists(list_id) ON DELETE CASCADE ON UPDATE CASCADE 
);
