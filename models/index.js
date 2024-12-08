const User = require('./user.model');
const Book = require('./book');
const Loan = require('./loan');

// Relacionar modelos
User.hasMany(Loan, { foreignKey: 'userId' });
Book.hasMany(Loan, { foreignKey: 'bookId' });
Loan.belongsTo(User, { foreignKey: 'userId' });
Loan.belongsTo(Book, { foreignKey: 'bookId' });

module.exports = { User, Book, Loan };
