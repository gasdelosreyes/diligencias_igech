const express = require('express');
const router = express.Router();

const destinataryController = require('../controller/destinatary');

router.route('/').get(destinataryController.getDestinatarys).post(destinataryController.createDestinatary);
router.route('/:id').get(destinataryController.getSingleDestinatary).put(destinataryController.updateDestinatary).delete(destinataryController.deleteDestinatary);

module.exports = router;