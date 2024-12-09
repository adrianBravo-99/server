const { Loan, Book } = require('../models'); // Importar modelos necesarios
const moment = require('moment'); // Para calcular fechas y multas (asegúrate de instalarlo con `npm install moment`)

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

                    // Actualizar el estado del libro a "disponible"
                    const book = await Book.findByPk(loan.bookId);
                    if (!book) {
                        return { confirmation: "Book not found", status: "Failed" };
                    }

                    book.isLoaned = false;
                    await book.save();

                    // Calcular multas en caso de retraso
                    const today = moment();
                    const returnDate = moment(loan.returnDate);
                    let fine = 0;

                    if (today.isAfter(returnDate)) {
                        const daysLate = today.diff(returnDate, 'days');
                        fine = daysLate * 5; // Por ejemplo, $5 por día de retraso
                    }

                    // Actualizar el préstamo como "returned"
                    loan.status = 'returned';
                    loan.fine = fine; // Suponiendo que agregaste un campo `fine` en tu modelo Loan
                    await loan.save();

                    return {
                        confirmation: `Loan returned successfully with fine: $${fine}`,
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
