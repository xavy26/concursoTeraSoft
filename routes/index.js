var express = require('express');
const passport = require('passport');

const Schedule = require('../models/schedule.model');
const Service = require('../models/services.model');
const Type_Functionary = require('../models/type_functionary.model');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.flash;
  res.render('index', { title: 'GAD Tulcan', isAuth: req.isAuthenticated(), message: req.flash("message")});
});

router.get('/register', async (req, res) => {
  req.flash;
  let msg = req.flash("message");
  console.log(msg);
  res.render('register', { services: await Service.find({}), schedules: await Schedule.find({}), types: await Type_Functionary.find({}), title: 'GAD Tulcan', isAuth: req.isAuthenticated(), message: msg});
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
