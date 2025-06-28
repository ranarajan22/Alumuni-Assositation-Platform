const express = require('express');
const router = express.Router();
const { getAlumniList } = require('../Controllers/AlumniController');
const protectRoute = require('../Middlewares/ProtectRoute');

router.get('/', protectRoute, getAlumniList);

module.exports = router;
