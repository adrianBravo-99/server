const { Loan } = require('../models'); // Importar modelo Loan

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
