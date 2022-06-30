// Routes pour les utilisateurs

const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

const auth = require("../middleware/auth");

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/', auth, userCtrl.deleteUser);
router.get('/', auth, userCtrl.getProfil);

module.exports = router;