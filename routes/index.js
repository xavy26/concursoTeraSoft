var express = require('express');
const passport = require('passport');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.flash;
  res.render('index', { title: 'GAD Tulcan', isAuth: req.isAuthenticated(), message: req.flash("message")});
});

router.get('/register', (req, res) => {
  req.flash;
  res.render('register', { title: 'GAD Tulcan', isAuth: req.isAuthenticated(), message: req.flash("message")});
})

router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy((error) => {
    if (error) {
      console.error(error);
    } else {
      res.redirect('/');
    }
  });
});

router.post('/save', passport.authenticate('local-singup', {session:false, succesRedirect: '/',failureRedirect: '/register'}));
router.post('/auth', passport.authenticate('local-singin', {succesRedirect: '/',failureRedirect: '/'}));

module.exports = router;
