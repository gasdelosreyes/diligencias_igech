const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');


const Record = require('../model/Record');
const Secretary = require('../model/Secretary');

const controller = {
    getRecords: asyncHandler(async(req, res, next) => {
        let record = await Record.find().populate({ path: 'secretary', populate: { path: 'court' } });
        res.status(200).json({
            success: true,
            data: record
        });
    }),
    getSingleRecord: asyncHandler(async(req, res, next) => {
        let record = await Record.findById(req.params.id).populate({ path: 'secretary', populate: { path: 'court' } });
        if (!record) {
            return (next(new ErrorResponse(`There's no judicial record with the ID ${req.params.id}`, 404)));
        }
        res.status(200).json({
            success: true,
            data: record
        })
    }),
    createRecord: asyncHandler(async(req, res, next) => {
        let record = await Record.findOne({ 'number': req.params.number });
        if (!record) {
            record = await Record.create(req.body);
            res.status(200).json({
                success: true,
                data: record
            });
        } else {
            return (next(new ErrorResponse(`There's already a record with that number`, 404)));
        }
    }),
    updateRecord: asyncHandler(async(req, res, next) => {
        let record = await Record.findOne({ 'number': req.params.number });
        if (!record) {
            record = await Record.findById(req.params.id);
            if (!record) {
                return (next(new ErrorResponse(`There's no judicial record with the ID ${req.params.id}`, 404)));
            }
            record = await Record.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            })
        }
        res.status(200).json({
            success: true,
            data: record
        });
    }),
    deleteRecord: asyncHandler(async(req, res, next) => {
        let record = await Record.findById(req.params.id);
        if (!record) {
            return (next(new ErrorResponse(`There's no judicial record with the ID ${req.params.id}`, 404)));
        }
        record.remove();
        res.status(200).json({
            success: true,
            msg: 'Record deleted'
        });
    })
}

module.exports = controller;