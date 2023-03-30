CREATE DATABASE DevOps;

USE DevOps;

CREATE TABLE User(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255),
	location varchar(9999),
	PRIMARY KEY (id)
);

INSERT INTO `DevOps`.`User` (`name`, `location `) 
	VALUES ('Nguyen Van Son', 'Bac Ninh);

INSERT INTO `DevOps`.`User` (`name`, `location `) 
	VALUES ('Nguyen Van A', 'Bac Ninh);
