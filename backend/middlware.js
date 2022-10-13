const authPage = (permissions) => {
  return (req, res, next) => {
    const employeesRole = req.body.role;
    if (permissions.includes(employeesRole)) {
      next();
    } else {
      return res.status(401).json("You don't have permission");
    }
  };
};

module.exports = { authPage };
