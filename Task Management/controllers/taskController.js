const Task = require('../models/Task');
const Category = require('../models/Category');
const User = require('../models/User');

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id }).populate('category');
  res.render('taskList', { tasks, user: req.user });
};

exports.getAllTasks = async (req, res) => {
  const tasks = await Task.find().populate('user').populate('category');
  res.render('taskList', { tasks, user: req.user });
};

exports.createTaskForm = async (req, res) => {
  const categories = await Category.find();
  res.render('taskForm', { categories, user: req.user });
};

exports.createTask = async (req, res) => {
  const { title, description, category } = req.body;
  await Task.create({ title, description, category, user: req.user.id });
  res.redirect('/tasks');
};

exports.deleteTask = async (req, res) => {
  await Task.deleteOne({ _id: req.params.id, user: req.user.id });
  res.redirect('/tasks');
};



exports.adminDashboard = async (req, res) => {
    try {
      const tasks = await Task.find().populate('user').populate('category');
      const users = await User.find();
      res.render('adminDashboard', { tasks, users, user: req.user });
    } catch (err) {
      res.status(500).send('Error loading admin dashboard');
    }
  };