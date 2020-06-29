const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = {...err }
    error.message = err.message;

    //Muestra el error
    console.log(err);

    //Errores de base de datos
    //ID erroneo
    if (err.name === 'CastError') {
        let msg = `No se encontró lo solicitado con el id ${err.value}.`;
        error = new ErrorResponse(msg, 404);
    }
    //Valores duplicados
    if (err.code === 11000) {
        let msg = `Valor ingresado ya existe. No se admiten valores duplicados`;
        error = new ErrorResponse(msg, 400);
    }
    //Error de validacion
    if (err.name === 'ValidationError') {
        let msg = Object.values(err.errors).map(value => value.message);
        error = new ErrorResponse(msg, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        err: error.message || 'Error del servidor'
    });
}
module.exports = errorHandler;