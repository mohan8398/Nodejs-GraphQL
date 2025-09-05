"use strict";
const { GraphQLError } = require("graphql");
const bookService = require("./service");

const bookResolvers = {
  Query: {
    // Get all books
    books: (_, { filters }) => {
      if (filters) {
        return bookService.getBooksWithFilters(filters);
      }
      return bookService.getAllBooks();
    },

    // Get book by ID
    book: (_, { id }) => {
      const book = bookService.findById(id);
      if (!book) {
        throw new GraphQLError('Book not found');
      }
      return book;
    },

    // Search books
    searchBooks: (_, { query }) => {
      if (!query || query.trim().length < 2) {
        throw new GraphQLError('Search query must be at least 2 characters long');
      }
      return bookService.searchBooks(query);
    },

    // Get books by author
    booksByAuthor: (_, { author }) => {
      if (!author || author.trim().length < 2) {
        throw new GraphQLError('Author name must be at least 2 characters long');
      }
      return bookService.findByAuthor(author);
    },

    // Get books by genre
    booksByGenre: (_, { genre }) => {
      if (!genre || genre.trim().length < 2) {
        throw new GraphQLError('Genre must be at least 2 characters long');
      }
      return bookService.findByGenre(genre);
    },

    // Get user's books
    myBooks: (_, __, ctx) => {
      if (!ctx.user) {
        throw new GraphQLError('Unauthorized - Please login first');
      }
      return bookService.getBooksByUser(ctx.user.id);
    },

    // Get book statistics
    bookStats: () => {
      return bookService.getBookStats();
    }
  },

  Mutation: {
    // Create new book
    createBook: (_, { input }, ctx) => {
      if (!ctx.user) {
        throw new GraphQLError('Unauthorized - Please login first');
      }

      try {
        return bookService.createBook(input, ctx.user.id);
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },

    // Update book
    updateBook: (_, { id, input }, ctx) => {
      if (!ctx.user) {
        throw new GraphQLError('Unauthorized - Please login first');
      }

      try {
        return bookService.updateBook(id, input, ctx.user.id);
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },

    // Delete book
    deleteBook: (_, { id }, ctx) => {
      if (!ctx.user) {
        throw new GraphQLError('Unauthorized - Please login first');
      }

      try {
        return bookService.deleteBook(id, ctx.user.id);
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    }
  }
};

module.exports = { bookResolvers };
