const express = require('express');
const router = express.Router();

const {registerGuardian, getGuardianById, updateGuardian} = require("../controllers/guardianController");
const { Router } = require('express');


router.post('/', registerGuardian);
router.get('/:guardianId', getGuardianById);
router.patch('/:guardianId', updateGuardian);

module.exports = router;