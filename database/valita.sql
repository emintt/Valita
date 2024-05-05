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
  filename VARCHAR(255) DEFAULT NULL,
  filesize INT DEFAULT NULL,
  media_type VARCHAR(255) DEFAULT NULL,
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

-- INSERT INTO Users (email, password, user_level_id) 
-- VALUES ('denkani@example.com', '12345', 2),
--   ('mansumi@example.com', '12345', 2),
--   ('papu@example.com', '12345', 2),
--   ('minttu@example.com', '12345', 2);

INSERT INTO Companies (company_name) 
VALUES ('K-Kauppa Postitalo'), 
  ('Musiikkitalo'), 
  ('UMH Finland');

INSERT INTO companies (company_name) VALUES 
('S-market Kamppi'),
('S-market Hakaniemi'),
('S-market Töölöntori'),
('S-market Kannelmäki'),
('S-market Munkkivuori'),
('S-market Herttoniemi'),
('S-market Malmi'),
('S-market Kivikko'),
('S-market Vallila'),
('S-market Konala'),
('K-Supermarket Ruoholahti'),
('K-Supermarket Redi'),
('K-Supermarket Sörnäinen'),
('K-Supermarket Arabia'),
('K-Supermarket Postitalo'),
('K-Supermarket Pasila'),
('K-Supermarket Kaisaniemi'),
('K-Supermarket Erottaja'),
('K-Supermarket Kruununhaka'),
('K-Supermarket Töölö'),
('Metropolia Karamalmi');

-- INSERT INTO Posts (user_id, company_id, filename, filesize, media_type, title, content) 
-- VALUES (1, 1, 'sunset.jpg', 1024, 'image/jpeg', 'Testi title', 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'),
--   (2, 2, 'sunset.jpg', 1024, 'image/jpeg', 'Testi title', 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'),
--   (3, 3, 'sunset.jpg', 1024, 'image/jpeg', 'Jotain title', ' It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum');


-- UPDATE Users
-- SET user_level_id = 1
-- WHERE user_id = 3;