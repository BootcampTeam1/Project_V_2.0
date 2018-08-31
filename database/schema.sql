-- Basic schema for database
CREATE DATABASE budget_app;
USE budget_app;

-- Tables

-- USERS table acts as parent for all other data
CREATE TABLE IF NOT EXISTS Users (
  id INTEGER AUTO_INCREMENT NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  PRIMARY KEY('id')
);

-- BUDGETS table is a direct child of the parent
CREATE TABLE IF NOT EXISTS Budgets (
  id INTEGER AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) DEFAULT 'Name of Expense',
  month VARCHAR(255) DEFAULT 'Month/Year',
  monthly_goal DECIMAL(10,2) DEFAULT 0,
  amount_spent DECIMAL(10,2) DEFAULT 0,
  total_balance DECIMAL(10,2) DEFAULT 0,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  UserId INTEGER,
  PRIMARY KEY ('id'),
  FOREIGN KEY (UserId)
    REFERENCES Users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
