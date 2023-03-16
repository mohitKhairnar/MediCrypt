const router = require('express').Router();
const patientController = require('../Controllers/patientController');
const requireUser = require('../Middlewares/requireUser')
router.get('/',patientController.getAllPatientController)

module.exports = router; 