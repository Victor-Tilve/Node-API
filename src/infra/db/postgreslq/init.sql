CREATE TABLE users (
	user_id serial PRIMARY KEY,
	username VARCHAR ( 100 ) UNIQUE NOT NULL,
	password VARCHAR ( 255 ) NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL
);