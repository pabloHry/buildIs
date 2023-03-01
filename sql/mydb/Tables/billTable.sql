CREATE TABLE bill(idbill INT NOT NULL AUTO_INCREMENT, creation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, price INT NOT NULL, time_spent INT NOT NULL, rental INT NOT NULL, PRIMARY KEY (idbill), iduser INT NOT NULL, INDEX (iduser), FOREIGN KEY (iduser) REFERENCES user(iduser))