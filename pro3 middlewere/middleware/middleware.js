let isAuthenticated = false; 

const condition = (req, res, next) => {
  if (isAuthenticated) {
    next();
    return;
  }
  return res.send("Not authorized");
};

module.exports = { condition, setAuth: (value) => (isAuthenticated = value) };
