const express = require('express');
const router = express.Router();
const { authMiddleware, admin } = require('../middlewares/authMiddleware');
const {
  getTasks,
  getAllTasks,
  createTaskForm,
  createTask,
  deleteTask,
  adminDashboard
} = require('../controllers/taskController');

router.use(authMiddleware); // Protect all task routes

router.get('/', getTasks);
router.get('/new', createTaskForm);
router.post('/', createTask);
router.get('/delete/:id', deleteTask);
router.get('/admin', admin('admin'), adminDashboard); // Protect admin route

module.exports = router;