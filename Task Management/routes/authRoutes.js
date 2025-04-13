const express = require('express');
const { register, login, logout } = require('../controllers/authController');

const router = express.Router();

router.get('/register', (req, res) => {
    if (req.cookies.token) return res.redirect('/tasks');
    res.render('register');
  });
router.get('/login', (req, res) => {
    if (req.cookies.token) return res.redirect('/tasks');
    res.render('login');
  });
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;