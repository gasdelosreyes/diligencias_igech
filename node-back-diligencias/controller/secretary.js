const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

const Secretary = require('../model/Secretary');
const Court = require('../model/Court');

const controller = {
    getSecretarys: asyncHandler(async(req, res, next) => {
        let secretary = await Secretary.find();
        res.status(200).json({
            success: true,
            count: secretary.length,
            data: secretary
        });
    }),
    getSingleSecretary: asyncHandler(async(req, res, next) => {
        let secretary = await Secretary.findById(req.params.id);
        if (!secretary) {
            return (next(new ErrorResponse(`There's no secretary with the ID ${req.params.id}`, 404)));
        }
        res.status(200).json({
            success: true,
            data: secretary
        })
    }),
    createSecretary: asyncHandler(async(req, res, next) => {
        req.body.court = req.params.courtId;
        let court = await Court.findById(req.body.court);
        if (!court) {
            return (next(new ErrorResponse(`There's no Court associated`, 404)));
        }
        if (!secretary) {
            let secretary = await Secretary.create(req.body);
            res.status(200).json({
                success: true,
                data: secretary
            });
        } else {
            return (next(new ErrorResponse(`There's a Secretary with that number in this court`, 404)));
        }
    }),
    updateSecretary: asyncHandler(async(req, res, next) => {
        let secretary = await Secretary.findById(req.params.id);
        if (!secretary) {
            return (next(new ErrorResponse(`There's no secretary with the ID ${req.params.id}`, 404)));
        }
        secretary = await Secretary.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            success: true,
            data: secretary
        });
    }),
    deleteSecretary: asyncHandler(async(req, res, next) => {
        let secretary = await Secretary.findById(req.params.id);
        if (!secretary) {
            return (next(new ErrorResponse(`There's no secretary with the ID ${req.params.id}`, 404)));
        }
        secretary.remove();
        res.status(200).json({
            success: true,
            data: secretary
        });
    })
};

module.exports = controller;