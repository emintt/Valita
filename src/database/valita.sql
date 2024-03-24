DROP DATABASE IF EXISTS Valita;
CREATE DATABASE Valita;
Use Valita;

CREATE TABLE UserLevels
(
  level_id INT AUTO_INCREMENT PRIMARY KEY,
  level_name VARCHAR(50) NOT NULL
);

CREATE TABLE Companies
(
  company_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Users
(
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  user_level_id INT NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_level_id) REFERENCES UserLevels(level_id)
);

CREATE TABLE Posts
(
  post_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  company_id INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  filesize INT NOT NULL,
  media_type VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (company_id) REFERENCES Companies(company_id)
);

CREATE TABLE Comments
(
  comment_id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  comment_text TEXT NOT NULL,
  user_label INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES Posts(post_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Likes
(
  like_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  post_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (post_id) REFERENCES Posts(post_id)
);

-- Insert the sample data 
INSERT INTO UserLevels (level_name) VALUES ('Admin'), ('User');

INSERT INTO Users (email, password, user_level_id) 
VALUES ('denkani@example.com', '12345', 2),
  ('mansumi@example.com', '12345', 2),
  ('papu@example.com', '12345', 2),
  ('minttu@example.com', '12345', 2);

INSERT INTO Companies (company_name) 
VALUES ('K-Kauppa Postitalo'), 
  ('Musiikkitalo'), 
  ('UMH Finland');

INSERT INTO Posts (user_id, company_id, filename, filesize, media_type, title, content) 
VALUES (1, 1, 'sunset.jpg', 1024, 'image/jpeg', 'K-kaupan asiakkaat ärsyttää mua', 'Kaikki vaan huutaa'),
  (2, 2, 'sunset.jpg', 1024, 'image/jpeg', 'Työolot ovat heikot', 'Toimiston äijät eivät välitä meistä'),
  (3, 3, 'sunset.jpg', 1024, 'image/jpeg', 'Päiväni Paketinjakajana', 'Liian paljon kuljetuspaikkaa päivässä. Tuntuu että olen kilpailussa.');
