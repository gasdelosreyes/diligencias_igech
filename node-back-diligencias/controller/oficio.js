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
    getSingleOficio: asyncHandler(async(req, res, next) => {
        let oficio = await Oficio.findById(req.params.id);
        if (!oficio) {
            return (next(new ErrorResponse(`No se encontró oficio con ID ${req.params.id}`, 404)))
        }
        res.status(200).json({
            success: true,
            data: oficio
        });
    }),
    createOficio: asyncHandler(async(req, res, next) => {
        const oficio = await Oficio.create(req.body);
        res.status(201).json({
            success: true,
            data: oficio
        });
    }),
    updateOficio: asyncHandler(async(req, res, next) => {
        const oficio = await Oficio.findById(req.params.id);
        if (!oficio) {
            return (next(new ErrorResponse(`No existe oficio con el ID ${req.params.id}`, 404)))
        }
        oficio = await Oficio.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            success: true,
            data: oficio
        });
    }),
    deleteOficio: asyncHandler(async(req, res, next) => {
        let oficio = await Oficio.findById(req.params.id);
        if (!oficio) {
            return (next(new ErrorResponse(`No existe oficio con el ID ${req.params.id}`, 404)));
        }
        oficio.remove();
        res.status(200).json({
            success: true,
            msg: 'Oficio eliminado'
        });
    })
}

module.exports = controller;