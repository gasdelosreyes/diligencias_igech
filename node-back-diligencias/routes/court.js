//Create the router
const express = require('express');
const router = express.Router();

//Import controller
const courtController = require('../controller/court');

//Link the http requests
router.route('/').get(courtController.getCourts).post(courtController.createCourt);
router.route('/:id').get(courtController.getSingleCourt).put(courtController.updateCourt).delete(courtController.deleteCourt);

module.exports = router;