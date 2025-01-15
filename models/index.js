const User = require('./user.model');
const Book = require('./book');
const Loan = require('./loan');
const Library = require('./library');

// Relacionar modelos
User.hasMany(Loan, { foreignKey: 'userId' });
Book.hasMany(Loan, { foreignKey: 'bookId' });
Library.hasMany(Book, { foreignKey: 'bookId'})

Loan.belongsTo(User, { foreignKey: 'userId' });
Loan.belongsTo(Book, { foreignKey: 'bookId' });
Book.belongsTo(Library, { foreignKey: 'libraryId'})

module.exports = { User, Book, Loan, Library };
