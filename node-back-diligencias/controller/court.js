const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

const Court = require('../model/Court');

const controller = {
    getCourts: asyncHandler(async(req, res, next) => {
        let court = await Court.find();
        res.status(200).json({
            success: true,
            count: court.length,
            data: court
        });
    }),
    getSingleCourt: asyncHandler(async(req, res, next) => {
        let court = await Court.findById(req.params.id)
        if (!court) {
            return (next(new ErrorResponse(`There's no court with the ID: ${req.params.id}`, 404)));
        }
        res.status(200).json({
            success: true,
            data: court
        });
    }),
    createCourt: asyncHandler(async(req, res, next) => {
        let court = await Court.create(req.body);
        res.status(200).json({
            success: true,
            data: court
        });
    }),
    updateCourt: asyncHandler(async(req, res, next) => {
        let court = await Court.findById(req.params.id);
        if (!court) {
            return (next(new ErrorResponse(`There's no court with the ID: ${req.params.id}`, 404)));
        }
        court = await Court.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            success: true,
            data: court
        });
    }),
    deleteCourt: asyncHandler(async(req, res, next) => {
        let court = await Court.findById(req.params.id);
        if (!court) {
            return (next(new ErrorResponse(`There's no court with the ID: ${req.params.id}`, 404)));
        }
        court.remove();
        res.status(200).json({
            successs: true,
            data: court
        });
    })
};

module.exports = controller;