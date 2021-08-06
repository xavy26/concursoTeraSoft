var express = require('express');
const passport = require('passport');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'GAD Tulcan' });
});
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

router.post('/save', passport.authenticate('local-singup', {session:false, succesRedirect: '/',failureRedirect: '/'}));
router.post('/auth', passport.authenticate('local-singin', {succesRedirect: '/',failureRedirect: ''}));

module.exports = router;
