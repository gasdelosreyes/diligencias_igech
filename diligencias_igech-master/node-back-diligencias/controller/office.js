//Importar Middlewares para manejar errores
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//Importar modelo asociado
const Office = require('../model/Office');
const Record = require('../model/Record');
const Destinatary = require('../model/Destinatary');

const controller = {
    //@author Gastón De los Reyes
    //@description Obtener todos los offices
    //@route GET /diligencias/office
    //@access privado (Todos los usuarios)
    getOffices: asyncHandler(async(req, res, next) => {
        let offices = await Office.find();
        res.status(200).json({
            success: true,
            count: offices.length,
            data: offices
        });
    }),
    getSingleOffice: asyncHandler(async(req, res, next) => {
        let office = await Office.findById(req.params.id);
        if (!office) {
            return (next(new ErrorResponse(`No se encontró office con ID ${req.params.id}`, 404)))
        }
        res.status(200).json({
            success: true,
            data: office
        });
    }),
    createOffice: asyncHandler(async(req, res, next) => {
        console.log("ESTOY EN EL CONTROLADOR");
        req.body.record = req.params.recordId;
        let record = await Record.findById(req.body.record);
        if (!record) {
            return (next(new ErrorResponse(`There's no record ${req.body.record}`, 404)));
        }
        let destinatary = await Destinatary.findOne({ "name": req.body.destinatary });
        if (!destinatary) {
            return (next(new ErrorResponse(`There's no destinatary ${req.body.destinatary}`, 404)));
        }
        let office = await Office.create(req.body);
        res.status(201).json({
            success: true,
            data: office
        });
    }),
    updateOffice: asyncHandler(async(req, res, next) => {
        const office = await Office.findById(req.params.id);
        if (!office) {
            return (next(new ErrorResponse(`No existe office con el ID ${req.params.id}`, 404)))
        }
        office = await Office.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            success: true,
            data: office
        });
    }),
    deleteOffice: asyncHandler(async(req, res, next) => {
        let office = await Office.findById(req.params.id);
        if (!office) {
            return (next(new ErrorResponse(`No existe office con el ID ${req.params.id}`, 404)));
        }
        office.remove();
        res.status(200).json({
            success: true,
            msg: 'Office eliminado'
        });
    })
}

module.exports = controller;