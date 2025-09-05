"use strict";
const { GraphQLError } = require("graphql");
const userService = require("./service");

const userResolvers = {
  Query: {
    // Get current user profile
    me: (_, __, ctx) => {
      if (!ctx.user) {
        throw new GraphQLError('Unauthorized - Please login first');
      }
      return userService.getPublicUser(ctx.user);
    },

    // Get user by ID (admin only)
    user: (_, { id }, ctx) => {
      if (!ctx.user) {
        throw new GraphQLError('Unauthorized');
      }
      
      const user = userService.findById(id);
      if (!user) {
        throw new GraphQLError('User not found');
      }
      
      return userService.getPublicUser(user);
    },

    userByEmail: (_, { email }, ctx) => {
      if (!ctx.user) {
        throw new GraphQLError('Unauthorized');
      }
      const user = userService.findByEmail(email);
      if (!user) {
        throw new GraphQLError('User not found');
      }
      return userService.getPublicUser(user);
    },

    // Get all users (admin only)
    users: (_, { first, after }, ctx) => {
      if (!ctx.user) {
        throw new GraphQLError('Unauthorized');
      }
      
      return userService.getAllUsers({ first, after });
    }

    
  },

  Mutation: {
    // User login
    login: async (_, { input }) => {
      try {
        const { username, password } = input;
        const user = userService.authenticate(username, password);
        const token = userService.generateToken(user);
        
        return {
          token,
          user: userService.getPublicUser(user)
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },

    // User registration
    register: async (_, { input }) => {
      try {
        const { username, password, email } = input;
        const newUser = userService.createUser({ username, password, email });
        const token = userService.generateToken(newUser);
        
        return {
          token,
          user: userService.getPublicUser(newUser)
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },

    // Update user profile
    updateProfile: async (_, { input }, ctx) => {
      if (!ctx.user) {
        throw new GraphQLError('Unauthorized');
      }

      try {
        const updatedUser = userService.updateUser(ctx.user.id, input);
        return userService.getPublicUser(updatedUser);
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },

    // Delete user account
    deleteAccount: async (_, __, ctx) => {
      if (!ctx.user) {
        throw new GraphQLError('Unauthorized');
      }

      try {
        const deleted = userService.deleteUser(ctx.user.id);
        return deleted;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    }
  }
};

module.exports = { userResolvers };
