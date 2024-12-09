const { Loan, Book, User } = require('../models'); // Importar modelos necesarios

const service = {
    LibraryService: {
        LibraryPort: {
            registerLoan: async function (args) {
                try {
                    console.log("Datos recibidos:", args);

                    // Crear el préstamo en la base de datos con todos los campos necesarios
                    const loan = await Loan.create({
                        userId: args.userId,
                        bookId: args.bookId,
                        loanDate: args.loanDate,
                        returnDate: args.returnDate,
                        status: 'active', // Estatus por defecto
                    });

                    // Retornar el ID generado como confirmación simple
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

                    // Buscar el préstamo por ID
                    const loan = await Loan.findByPk(args.loanId);
                    if (!loan) {
                        return { confirmation: "Loan not found", status: "Failed" };
                    }

                    // Validar si el préstamo ya fue devuelto
                    if (loan.status === 'returned') {
                        return { confirmation: "Loan already returned", status: "Failed" };
                    }

                    // Actualizar el préstamo como "returned"
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

                    // Recuperar todos los préstamos con asociaciones (opcional)
                    const loans = await Loan.findAll({
                        include: [
                            {
                                model: Book,
                                as: 'book', // Alias definido en la asociación con Book
                                attributes: ['title', 'author', 'category'], // Incluye solo los campos necesarios del libro
                            },
                            {
                                model: User,
                                as: 'user', // Alias definido en la asociación con User
                                attributes: ['firstName', 'lastName', 'email'], // Incluye solo los campos necesarios del usuario
                            },
                        ],
                    });
                    

                    // Mapear resultados para devolver los datos en un formato legible
const loanData = loans.map(loan => ({
    id: loan.id,
    userId: loan.userId,
    bookId: loan.bookId,
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
        },
    },
};

module.exports = (app) => {
    const soap = require('soap');
    const fs = require('fs');
    const wsdl = fs.readFileSync('./services/soap.wsdl', 'utf8'); // Asegúrate de que el archivo WSDL esté en la ruta correcta
    soap.listen(app, '/soap', service, wsdl);
    console.log("Servicio SOAP disponible en /soap");
};
