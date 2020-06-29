const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

const Destinatary = require('../model/Destinatary');

var controller = {
    getDestinatarys: asyncHandler(async(req, res, next) => {
        let destinatary = await Destinatary.find();
        res.status(200).json({
            success: true,
            data: destinatary
        });
    }),
    getSingleDestinatary: asyncHandler(async(req, res, next) => {
        let destinatary = await Destinatary.findById(req.params.id);
        if (!destinatary) {
            return (next(new ErrorResponse(`There's no destinatary with the ID ${req.params.id}`, 404)));
        }
        res.status(200).json({
            success: true,
            data: destinatary
        });
    }),
    createDestinatary: asyncHandler(async(req, res, next) => {
        let destinatary = await Destinatary.create(req.body);
        res.status(200).json({
            success: true,
            data: destinatary
        });
    }),
    updateDestinatary: asyncHandler(async(req, res, next) => {
        let destinatary = await Destinatary.findById(req.params.id);
        if (!destinatary) {
            return (next(new ErrorResponse(`There's no destinatary with the ID ${req.params.id}`, 404)));
        }
        destinatary = await Destinatary.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            success: true,
            data: destinatary
        });
    }),
    deleteDestinatary: asyncHandler(async(req, res, next) => {
        let destinatary = await Destinatary.findById(req.params.id);
        if (!destinatary) {
            return (next(new ErrorResponse(`There's no destinatary with the ID ${req.params.id}`, 404)));
        }
        destinatary.remove();
        res.status(200).json({
            success: true,
            msg: 'Destinatary deleted'
        });
    })
};

module.exports = controller;