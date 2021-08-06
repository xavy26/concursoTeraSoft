'use strict'

const Schedule = require('../models/schedule.model');

exports.test = (req, res) => {
  res.end('Testing schedule controller');
};

exports.register = async (req, res) => {
  let dias_mal = false;
  if (!req.body.lunes && !req.body.martes && !req.body.miercoles && !req.body.jueves && !req.body.viernes && !req.body.sabado && !req.body.domingo) {
    dias_mal = true;
  }
  if (!dias_mal && req.body.start1 && req.body.end1) {
    // 0: 'domingo',
    // 1: 'lunes',
    // 2: 'martes',
    // 3: 'miércoles',
    // 4: 'jueves',
    // 5: 'viernes',
    // 6: 'sábado',
    let array_dias = [];
    if (req.body.lunes) {
      array_dias.push("Lunes");
    }
    if (req.body.martes) {
      array_dias.push("Martes");
    }
    if (req.body.miercoles) {
      array_dias.push("Miércoles");
    }
    if (req.body.jueves) {
      array_dias.push("Jueves");
    }
    if (req.body.viernes) {
      array_dias.push("Viernes");
    }
    if (req.body.sabado) {
      array_dias.push("Sábado");
    }
    if (req.body.domingo) {
      array_dias.push("Domingo");
    }
    new Schedule({
      days: array_dias,
      work_day_one: {
        start: req.body.start1,
        end: req.body.end1,
      },
      work_day_two: {
        start: req.body.start2,
        end: req.body.end2,
      }
    }).save((error) => {
      if (error) {
        console.error(error);
        req.flash('message', { msg: 'Error al registrar horario de atención', status: 'error' });
      } else {
        req.flash('message', { msg: 'Horario de atención creado con exito', status: 'succes' });
      }
      res.redirect('/schedule');
    });
  }else{
    req.flash('message', { msg: 'Debe enviar el nombre del horario de atención', status: 'warning' });
    res.redirect('/schedule');
  }
}

exports.get = (req, res) => {
  req.flash;
  let filter = {state: true}
  Schedule.findOne(filter, (error, schedule) => {
    if (error) {
      console.error(error);
      req.flash('message', { msg: 'Error al encontrar el horario de atención', status: 'error' });
      res.redirect('/');
    } else {
      let arrayAux = [];
      arrayAux.push(schedule)
      res.render('shcedule/list', { shcedules: arrayAux });
    }
  });
};

exports.update = async (req, res) => {
  let dias_mal = false;
  if (!req.body.lunes && !req.body.martes && !req.body.miercoles && !req.body.jueves && !req.body.viernes && !req.body.sabado && !req.body.domingo) {
    dias_mal = true;
  }
  if (!dias_mal && req.body.start1 && req.body.end1) {
    let array_dias = [];
    if (req.body.lunes) {
      array_dias.push("Lunes");
    }
    if (req.body.martes) {
      array_dias.push("Martes");
    }
    if (req.body.miercoles) {
      array_dias.push("Miércoles");
    }
    if (req.body.jueves) {
      array_dias.push("Jueves");
    }
    if (req.body.viernes) {
      array_dias.push("Viernes");
    }
    if (req.body.sabado) {
      array_dias.push("Sábado");
    }
    if (req.body.domingo) {
      array_dias.push("Domingo");
    }
    Schedule.updateOne({ _id: req.params.id }, {
      days: array_dias,
      work_day_one: {
        start: req.body.start1,
        end: req.body.end1,
      },
      work_day_two: {
        start: req.body.start2,
        end: req.body.end2,
      }
    }, (error) => {
      if (error) {
        console.error(error);
        req.flash('message', { msg: 'Error al actualizar horario de atención', status: 'error' });
      } else {
        req.flash('message', { msg: 'Horario de atención actualizado con exito', status: 'succes' });
      }
      res.redirect('/schedule');
    });
  }else{
    req.flash('message', { msg: 'Debe enviar el nombre del horario de atención', status: 'warning' });
    res.redirect('/schedule');
  }
}

exports.down = (req, res) => {
  Schedule.findOne({ _id: req.params.id }, (error, schedule) => {
    if (error) {
      console.error(error);
      req.flash('message', { msg: 'Error al encontrar el horario de atención', status: 'error' });
      res.redirect('/schedule');
    } else {
      if (schedule) {
        schedule.update({
          state: !schedule.state,
        }, (err) => {
          if (err) {
            console.error(err);
            req.flash('message', { msg: 'Error al actualizar el horario de atención', status: 'error' });
            res.redirect('/schedule');
          } else {
            req.flash('message', { msg: 'Actualizado correctamente', status: 'succes' });
            res.redirect('/schedule');
          }
        });
      } else {
        req.flash('message', { msg: 'El horario de atención no existe', status: 'warning' });
        res.redirect('/schedule');
      }
    }
  })
}
