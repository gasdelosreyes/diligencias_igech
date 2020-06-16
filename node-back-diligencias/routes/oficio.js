//Generar un enrutador
const express = require('express');
const router = express.Router();

//Importar controlador asociado
const OficioController = require('../controller/oficio');

router.route('/').get(OficioController.getOficios).post(OficioController.createOficio);
router.route('/id').get(OficioController.getSingleOficio).put(OficioController.updateOficio).delete(OficioController.deleteOficio);

module.exports = router;