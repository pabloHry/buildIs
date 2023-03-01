CREATE TABLE user(iduser INT NOT NULL AUTO_INCREMENT, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, phone_number VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL, location VARCHAR(255) NOT NULL, subscription VARCHAR(255) NOT NULL, age INT NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, idrole INT NOT NULL, PRIMARY KEY (iduser), INDEX (idrole), FOREIGN KEY (idrole) REFERENCES role(idrole))