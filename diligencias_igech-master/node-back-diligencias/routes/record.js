//Construir el enrutador
const express = require('express');

const router = express.Router();

//Importar el controlador asociado
const recordController = require('../controller/record');

//Importar subrouters
const officeRouter = require('./office');

//Delegar enrutador
router.use('/:recordId/office', officeRouter);

router.route('/').get(recordController.getRecords).post(recordController.createRecord);
router.route('/:id').get(recordController.getSingleRecord).put(recordController.updateRecord).delete(recordController.deleteRecord);

module.exports = router;