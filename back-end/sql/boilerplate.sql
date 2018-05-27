CREATE DATABASE Boilerplate;
USE Boilerplate;

CREATE TABLE Users
(
	UserId INT NOT NULL AUTO_INCREMENT,
	UserName VARCHAR( 32 ) NOT NULL,
	Password VARCHAR( 255 ),
	Email VARCHAR( 128 ),
	Verified BOOLEAN,
	VerifyCode VARCHAR( 64 ),
	RecoveryCode VARCHAR( 64 ),
	AccessCode VARCHAR( 64 ),
	PRIMARY KEY( UserId ),
	INDEX( UserName ASC )
);

INSERT INTO Users ( UserName, Email, Password, Verified ) VALUES ( 'root', 'root@boiler.plate', 'password', '0' );
