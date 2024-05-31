const express = require('express');
const userController = require('../controller/userController');
const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.delete('/deleteUser', userController.deleteUser);
router.get('/displayProfile', userController.displayProfile);

module.exports = router;