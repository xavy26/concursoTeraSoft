const bcrypt = require('bcrypt-nodejs');
const Functionry = require('../models/functionary.model');

module.exports = (passport) => {

  var localStrategy = require('passport-local').Strategy;
  passport.serializeUser((func, done) => {
    done(null, func);
  });

  passport.deserializeUser((func, done) => {
    if (func) {
      done(null, func);
    } else {
      done(func.errors, null);
    }
  });

  passport.use('local-singup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
    (req, email, password, done) => {
      console.log('registro')
      if (req.body.email && req.body.password && req.body.name && req.body.dni && req.body.service && req.body.schelude && req.body.type_functionary) {
        var generateHash = function (password) {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };
        Functionry.find({$or:[{dni: req.body.dni},{email: req.body.email}]}, (errorFind, funcFind) => {
          if (errorFind) {
            console.error(errorFind);
            req.flash('message', {msg: 'Error al validar funcionario', status: 'error'});
            return done(null, false);
          } else {
            if (funcFind && funcFind.length > 0) {
              req.flash('message', {msg: 'El correo o cédula ya estan registrados', status: 'warning'});
              return done(null, false);
            } else {
              req.body.password = generateHash(req.body.password);
              new Functionry(req.body).save((error, saveFunc) => {
                if (error) {
                  req.flash('message', {msg: 'Error al crear el funcionario', status: 'error'});
                  return done(null,false);
                } else {
                  req.flash('message', {msg: 'Funcionario creado correctamente', status: 'succes'});
                  return done(null, saveFunc);
                }
              })
            }
          }
        });
      } else {
        req.flash('message',{ msg: "Campos vacios", status: 'warning' });
        return done(null, false);
      }
    }));

    passport.use('local-singin', new localStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    }, (req, email, password, done) => {
      console.log('login');
      if (email, password) {
        Functionry.findOne({email: email}, (errorFind, funcFind) => {
          if (errorFind) {
            req.flash('message', {msg: 'Error al validar sus credenciales', status: 'error'});
            return done(null,false);
          } else {
            if(funcFind) {
              var isValidPass = (passFind, passForm) => {
                return bcrypt.compareSync(passForm, passFind);
              }
              if (isValidPass(funcFind.password, password)) {
                req.flash('message', {msg: 'Bienvenido '+funcFind.name, status: 'succes'});
                return done(null, funcFind);
              } else {
                req.flash('message', {msg: 'Credenciales no validas', status: 'warning'});
                return done(null,false);
              }
            } else {
              req.flash('message', {msg: 'Credenciales no validas', status: 'warning'});
              return done(null,false);
            }
          }
        })
      } else {
        req.flash('message',{ msg: "Campos vacios", status: 'warning' });
        return done(null, false);
      }
    }));
};