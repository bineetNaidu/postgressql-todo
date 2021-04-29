CREATE DATABASE todo_db

CREATE TABLE todo (
  id        INT   PRIMARY KEY      NOT NULL,
  task      CHAR(50) NOT NULL,
  completed BOOLEAN
);