const { Loan, Book, User } = require('../models');

const service = {
    LibraryService: {
        LibraryPort: {
            registerLoan: async function (args) {
                try {
                    console.log("Datos recibidos:", args);

                    const loan = await Loan.create({
                        userId: args.userId,
                        bookId: args.bookId,
                        loanDate: args.loanDate,
                        returnDate: args.returnDate,
                        libraryId: args.libraryId,
                        status: 'active',
                    });

                    return {
                        confirmation: `Loan created successfully with ID: ${loan.id}`,
                        status: "Success",
                    };
                } catch (error) {
                    console.error("Error al crear el préstamo:", error);
                    return {
                        confirmation: "Internal server error",
                        status: "Failed",
                    };
                }
            },
            returnLoan: async function (args) {
                try {
                    console.log("Datos recibidos para devolución:", args);

                    const loan = await Loan.findByPk(args.loanId);
                    if (!loan) {
                        return { confirmation: "Loan not found", status: "Failed" };
                    }

                    if (loan.status === 'returned') {
                        return { confirmation: "Loan already returned", status: "Failed" };
                    }

                    loan.status = 'returned';
                    await loan.save();

                    return {
                        confirmation: `Loan returned successfully`,
                        status: "Success",
                    };
                } catch (error) {
                    console.error("Error al registrar la devolución:", error);
                    return {
                        confirmation: "Internal server error",
                        status: "Failed",
                    };
                }
            },
            getAllLoans: async function () {
                try {
                    console.log("Recuperando todos los préstamos...");

                    const loans = await Loan.findAll({
                        include: [
                            {
                                model: Book,
                                as: 'book',
                                attributes: ['title', 'author', 'category'],
                            },
                            {
                                model: User,
                                as: 'user',
                                attributes: ['firstName', 'lastName', 'email'],
                            },
                        ],
                    });

                    const loanData = loans.map(loan => ({
                        id: loan.id,
                        userId: loan.userId,
                        bookId: loan.bookId,
                        libraryId: loan.libraryId,
                        loanDate: loan.loanDate ? loan.loanDate.toISOString() : null,
                        returnDate: loan.returnDate ? loan.returnDate.toISOString() : null,
                        status: loan.status,
                        bookTitle: loan.book?.title || null,
                        userName: `${loan.user?.firstName || ''} ${loan.user?.lastName || ''}`,
                    }));

                    return { loans: loanData, status: "Success" };
                } catch (error) {
                    console.error("Error al recuperar los préstamos:", error);
                    return {
                        loans: [],
                        status: "Failed",
                    };
                }
            },
            getLoansByUserId: async function (args) {
                try {
                    console.log("Recuperando préstamos para el usuario:", args.userId);

                    const loans = await Loan.findAll({
                        where: { userId: args.userId },
                        include: [
                            {
                                model: Book,
                                as: 'book',
                                attributes: ['title', 'author', 'category'],
                            },
                            {
                                model: User,
                                as: 'user',
                                attributes: ['firstName', 'lastName', 'email'],
                            },
                        ],
                    });

                    const loanData = loans.map(loan => ({
                        id: loan.id,
                        userId: loan.userId,
                        bookId: loan.bookId,
                        libraryId: loan.libraryId,
                        loanDate: loan.loanDate ? loan.loanDate.toISOString() : null,
                        returnDate: loan.returnDate ? loan.returnDate.toISOString() : null,
                        status: loan.status,
                        bookTitle: loan.book?.title || null,
                        userName: `${loan.user?.firstName || ''} ${loan.user?.lastName || ''}`,
                    }));

                    return { loans: loanData, status: "Success" };
                } catch (error) {
                    console.error("Error al recuperar préstamos por userId:", error);
                    return {
                        loans: [],
                        status: "Failed",
                    };
                }
            },
            getLoansByLibraryId: async function (args) {
                try {
                    console.log("Recuperando préstamos para la biblioteca:", args.libraryId);
            
                    // Buscar préstamos filtrados por libraryId
                    const loans = await Loan.findAll({
                        where: { libraryId: args.libraryId },
                        include: [
                            {
                                model: Book,
                                as: 'book',
                                attributes: ['title', 'author', 'category'], // Atributos del libro
                            },
                            {
                                model: User,
                                as: 'user',
                                attributes: ['firstName', 'lastName', 'email'], // Atributos del usuario
                            },
                        ],
                    });
            
                    // Mapear los datos para estructurar la respuesta SOAP
                    const loanData = loans.map((loan) => ({
                        id: loan.id,
                        userId: loan.userId,
                        bookId: loan.bookId,
                        libraryId: loan.libraryId,
                        loanDate: loan.loanDate ? loan.loanDate.toISOString() : null,
                        returnDate: loan.returnDate ? loan.returnDate.toISOString() : null,
                        status: loan.status,
                        bookTitle: loan.book?.title || null,
                        userName: `${loan.user?.firstName || ''} ${loan.user?.lastName || ''}`,
                    }));
            
                    return { loans: loanData, status: "Success" };
                } catch (error) {
                    console.error("Error al recuperar préstamos por libraryId:", error);
                    return {
                        loans: [],
                        status: "Failed",
                    };
                }
            }            
        },
    },
};

module.exports = (app) => {
    const soap = require('soap');
    const fs = require('fs');
    const wsdl = fs.readFileSync('./services/soap.wsdl', 'utf8'); 
    soap.listen(app, '/soap', service, wsdl);
    console.log("Servicio SOAP disponible en /soap");
};
