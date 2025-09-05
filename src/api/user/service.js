"use strict";
const jwt = require("jsonwebtoken");
const { loadEnv } = require("../../config/env");

// In-memory user store (replace with database in production)
const users = [
  { id: 'u1', username: 'admin', password: 'password', email: 'admin@example.com' },
  { id: 'u2', username: 'user1', password: 'password123', email: 'user1@example.com' }
];

function generateUserId() {
  return 'u' + Math.random().toString(36).slice(2, 10);
}

class UserService {
  // Find user by username
  findByUsername(username) {
    return users.find(user => user.username === username);
  }

  // Find user by ID
  findById(id) {
    return users.find(user => user.id === id);
  }
  
  findByEmail(email) {
    return users.find(user => user.email === email);
  }
  // Create new user
  createUser(userData) {
    const { username, password, email } = userData;
    
    // Check if user already exists
    if (this.findByUsername(username)) {
      throw new Error('Username already exists');
    }

    const newUser = {
      id: generateUserId(),
      username,
      password,
      email: email || null
    };

    users.push(newUser);
    return newUser;
  }

  // Update user
  updateUser(id, updateData) {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    users[userIndex] = { ...users[userIndex], ...updateData };
    return users[userIndex];
  }

  // Delete user
  deleteUser(id) {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return false;
    }

    users.splice(userIndex, 1);
    return true;
  }

  // Authenticate user
  authenticate(username, password) {
    const user = this.findByUsername(username);
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }
    return user;
  }

  // Generate JWT token
  generateToken(user) {
    const { config } = require("../../config/env");
    return jwt.sign(
      { id: user.id, username: user.username }, 
      config.JWT_SECRET, 
      { 
        expiresIn: config.JWT_EXPIRES_IN,
      }
    );
  }

  // Get all users (for admin purposes)
  getAllUsers({ first, after }) {
    return users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      
    })).slice(0, first);
  }

  // Get user without sensitive data
  getPublicUser(user) {
    return {
      id: user.id,
      username: user.username,
      email: user.email
    };
  }
}

module.exports = new UserService();
