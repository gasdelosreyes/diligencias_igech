//Generar un enrutador
const express = require('express');
const router = express.Router();

//Importar controlador asociado
const OfficeController = require('../controller/office');

router.route('/').get(OfficeController.getOffices).post(OfficeController.createOffice);
router.route('/:id').get(OfficeController.getSingleOffice).put(OfficeController.updateOffice).delete(OfficeController.deleteOffice);

module.exports = router;