'use strict'

const Turn = require('../models/turn.model');
const Functionary = require('../models/functionary.model');

exports.test = (req, res) => {
  res.end('Testing turn controller');
};

exports.register = async (req, res) => {
  let dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  req.body.functinary = req.user._id;
  if (req.body.date && req.body.hour) {
    let fecha = new Date(req.body.date);
    let func = await Functionary.findOne({_id: req.user._id}).populate(["service", "schedule", "type_functionary"]).exec();
    if (func && func.schedule && func.schedule.days && func.schedule.days.includes(dias[fecha.getDay()])) {
      if (Number(req.body.hour) >= func.schedule.work_day_one.start && Number(req.body.hour) <= func.schedule.work_day_one.end) {
        new Turn(req.body).save((error) => {
          if (error) {
            console.error(error);
            req.flash('message', { msg: 'Error al registrar el turno', status: 'error' });
          } else {
            req.flash('message', { msg: 'Turno creado con exito', status: 'succes' });
          }
          res.redirect('/turn');
        });
      }else if (func.schedule.work_day_two && func.schedule.work_day_two.start && func.schedule.work_day_two.end && Number(req.body.hour) >= func.schedule.work_day_two.start && Number(req.body.hour) <= func.schedule.work_day_two.end) {
        new Turn(req.body).save((error) => {
          if (error) {
            console.error(error);
            req.flash('message', { msg: 'Error al registrar el turno', status: 'error' });
          } else {
            req.flash('message', { msg: 'Turno creado con exito', status: 'succes' });
          }
          res.redirect('/turn');
        });
      }else{
        req.flash('message', { msg: 'El turno esta fuera del horario de atención', status: 'error' });
        res.redirect('/turn');
      }
    }else{
      req.flash('message', { msg: 'El turno esta fuera del horario de atención', status: 'error' });
      res.redirect('/turn');
    }
  }else{
    req.flash('message', { msg: 'Debe enviar la hora y la fecha del turno', status: 'error' });
    res.redirect('/turn');
  }
};

exports.get = (req, res) => {
  req.flash;
  let filter = {status: true}
  Turn.findOne(filter).populate({path: "functinary", pupulate: ["service", "schedule", "type_functinary"]}).exec((error, turn) => {
    if (error) {
      console.error(error);
      req.flash('message', { msg: 'Error al encontrar el turno', status: 'error' });
      res.redirect('/');
    } else {
      let arrayAux = [];
      arrayAux.push(turn)
      res.render('turn/list', { turns: arrayAux, title: 'GAD Tulcan', isAuth: req.isAuthenticated(), message: req.flash("message") });
    }
  });
};

exports.update = async (req, res) => {
  let dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  req.body.functinary = req.user._id;
  if (req.body.date && req.body.hour) {
    let fecha = new Date(req.body.date);
    let func = await Functionary.findOne({_id: req.user._id}).populate(["service", "schedule", "type_functinary"]).exec();
    if (func && func.schedule && func.schedule.days && func.schedule.days.includes(dias[fecha.getDay()])) {
      if (Number(req.body.hour) >= func.schedule.work_day_one.start && Number(req.body.hour) <= func.schedule.work_day_one.end) {
        Turn.updateOne({_id: req.params.id}, req.body, (error) => {
         if (error) {
           console.error(error);
           req.flash('message', { msg: 'Error al registrar el turno', status: 'error' });
         } else {
           req.flash('message', { msg: 'Turno creado con exito', status: 'succes' });
         }
         res.redirect('/turn');
       });
      }else if (func.schedule.work_day_two && func.schedule.work_day_two.start && func.schedule.work_day_two.end && Number(req.body.hour) >= func.schedule.work_day_two.start && Number(req.body.hour) <= func.schedule.work_day_two.end) {
         Turn.updateOne({_id: req.params.id}, req.body, (error) => {
          if (error) {
            console.error(error);
            req.flash('message', { msg: 'Error al registrar el turno', status: 'error' });
          } else {
            req.flash('message', { msg: 'Turno creado con exito', status: 'succes' });
          }
          res.redirect('/turn');
        });
      }else{
        req.flash('message', { msg: 'El turno esta fuera del horario de atención', status: 'error' });
        res.redirect('/turn');
      }
    }else{
      req.flash('message', { msg: 'El turno esta fuera del horario de atención', status: 'error' });
      res.redirect('/turn');
    }
  }else{
    req.flash('message', { msg: 'Debe enviar la hora y la fecha del turno', status: 'error' });
    res.redirect('/turn');
  }
};

exports.down = (req, res) => {
  Turn.findOne({ _id: req.params.id }, (error, turn) => {
    if (error) {
      console.error(error);
      req.flash('message', { msg: 'Error al encontrar el turno', status: 'error' });
      res.redirect('/turn');
    } else {
      if (turn) {
        turn.update({
          state: !turn.state,
        }, (err) => {
          if (err) {
            console.error(err);
            req.flash('message', { msg: 'Error al actualizar el turno', status: 'error' });
            res.redirect('/turn');
          } else {
            req.flash('message', { msg: 'Actualizado correctamente', status: 'succes' });
            res.redirect('/turn');
          }
        });
      } else {
        req.flash('message', { msg: 'El turno no existe', status: 'warning' });
        res.redirect('/turn');
      }
    }
  })
};
