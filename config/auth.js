module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
     	return next();
    }
    console.log('Request denied, redirecting...');
    res.redirect('/login');
  }
};