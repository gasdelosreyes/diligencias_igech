//Importar Middlewares para manejar errores
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//Importar modelo asociado
const Oficio = require('../model/Oficio');

const controller = {
    //@author Gastón De los Reyes
    //@description Obtener todos los oficios
    //@route GET /diligencias/oficio
    //@access privado (Todos los usuarios)
    getOficios: asyncHandler(async(req, res, next) => {
        let oficios = await Oficio.find();
        res.status(200).json({
            success: true,
            count: oficios.length,
            data: oficios
        });
    }),
    getOficio: asyncHandler(async(req, res, next) => {
        let oficio = await Oficio.findById(req.params.id);
        if (!oficio) {
            return (next(new ErrorResponse(`No se encontró oficio con ID ${req.params.id}`, 400)))
        }
    }),
}

module.exports = controller;