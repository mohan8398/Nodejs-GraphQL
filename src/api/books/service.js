"use strict";

// In-memory book storage (replace with database in production)
const books = [];

function generateBookId() {
  return 'book_' + Math.random().toString(36).slice(2, 10);
}

function getCurrentTimestamp() {
  return new Date();
}

class BookService {
  // Get all books
  getAllBooks() {
    return books;
  }

  // Get book by ID
  findById(id) {
    return books.find(book => book.id === id);
  }

  // Get books by author
  findByAuthor(author) {
    return books.filter(book => 
      book.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  // Get books by genre
  findByGenre(genre) {
    return books.filter(book => 
      book.genre && book.genre.toLowerCase().includes(genre.toLowerCase())
    );
  }

  // Search books
  searchBooks(query) {
    const searchTerm = query.toLowerCase();
    return books.filter(book => 
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      (book.description && book.description.toLowerCase().includes(searchTerm))
    );
  }

  // Get books with filters
  getBooksWithFilters(filters = {}) {
    let filteredBooks = [...books];

    if (filters.author) {
      filteredBooks = filteredBooks.filter(book => 
        book.author.toLowerCase().includes(filters.author.toLowerCase())
      );
    }

    if (filters.genre) {
      filteredBooks = filteredBooks.filter(book => 
        book.genre && book.genre.toLowerCase().includes(filters.genre.toLowerCase())
      );
    }

    if (filters.publishedAfter) {
      const afterDate = new Date(filters.publishedAfter);
      filteredBooks = filteredBooks.filter(book => 
        book.publishedAt && new Date(book.publishedAt) >= afterDate
      );
    }

    if (filters.publishedBefore) {
      const beforeDate = new Date(filters.publishedBefore);
      filteredBooks = filteredBooks.filter(book => 
        book.publishedAt && new Date(book.publishedAt) <= beforeDate
      );
    }

    return filteredBooks;
  }

  // Create new book
  createBook(bookData, userId) {
    const {
      title,
      author,
      publishedAt,
      description,
      isbn,
      genre,
      pages
    } = bookData;

    const newBook = {
      id: generateBookId(),
      title,
      author,
      publishedAt: publishedAt ? new Date(publishedAt) : null,
      description: description || null,
      isbn: isbn || null,
      genre: genre || null,
      pages: pages || null,
      createdBy: userId,
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp()
    };

    books.push(newBook);
    return newBook;
  }

  // Update book
  updateBook(id, updateData, userId) {
    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex === -1) {
      throw new Error('Book not found');
    }

    const book = books[bookIndex];
    
    // Check if user has permission to update (created by user or admin)
    if (book.createdBy !== userId) {
      throw new Error('Unauthorized - You can only update books you created');
    }

    const updatedBook = {
      ...book,
      ...updateData,
      updatedAt: getCurrentTimestamp()
    };

    // Convert publishedAt to Date if provided
    if (updateData.publishedAt) {
      updatedBook.publishedAt = new Date(updateData.publishedAt);
    }

    books[bookIndex] = updatedBook;
    return updatedBook;
  }

  // Delete book
  deleteBook(id, userId) {
    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex === -1) {
      return false;
    }

    const book = books[bookIndex];
    
    // Check if user has permission to delete (created by user or admin)
    if (book.createdBy !== userId) {
      throw new Error('Unauthorized - You can only delete books you created');
    }

    books.splice(bookIndex, 1);
    return true;
  }

  // Get books by user
  getBooksByUser(userId) {
    return books.filter(book => book.createdBy === userId);
  }

  // Get book statistics
  getBookStats() {
    const totalBooks = books.length;
    const authors = [...new Set(books.map(book => book.author))];
    const genres = [...new Set(books.filter(book => book.genre).map(book => book.genre))];
    
    return {
      totalBooks,
      uniqueAuthors: authors.length,
      uniqueGenres: genres.length,
      averagePages: books.length > 0 
        ? Math.round(books.reduce((sum, book) => sum + (book.pages || 0), 0) / books.length)
        : 0
    };
  }
}

module.exports = new BookService();
