//Create the router
const express = require('express');
const router = express.Router({ mergeParams: true });

//Import the controller
const secretaryController = require('../controller/secretary');

router.route('/').get(secretaryController.getCourtSecretarys).post(secretaryController.createSecretary);
router.route('/:id').get(secretaryController.getSingleSecretary).put(secretaryController.updateSecretary).delete(secretaryController.deleteSecretary);

module.exports = router;