module.exports = (req, res, next) => {
  // check user loggend session
  if (!req.session.isLoggedIn) {
    return res.redirect("/login"); // redirect to login form
  }
  next(); // if logged in, execute admin routes
};
