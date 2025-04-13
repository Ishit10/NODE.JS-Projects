const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userCount = await User.countDocuments();

    // Assign 'admin' if this is the first user
    const role = userCount === 0 ? 'admin' : 'user';

    const user = new User({ username, password, role }); // use correct role

    await user.save();

    console.log(`✅ Registered: ${username} as ${role}`);

    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.send('User already exists or registration error');
  }
};
  

  exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
  
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send('Invalid credentials');
    }
  
    console.log("Logged in:", user.username, "| Role:", user.role); // 👈 Log role
  
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });
  
    if (user.role === 'admin') {
      console.log("Redirecting to /tasks/admin"); // 👈 Confirm redirect
      return res.redirect('/tasks/admin');
    } else {
      return res.redirect('/tasks');
    }
  };

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
};