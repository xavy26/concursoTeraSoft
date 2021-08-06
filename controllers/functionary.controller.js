'use strict'

const Functionary = require('../models/functionary.model');

exports.test = (req, res) => {
  res.end('Testing functionary controller');
};

exports.get = (req, res) => {
  req.flash;
  let filter = {}
  if (req.params.type == "name") {
    filter = {name: req.params.search, state: true};
  }else if(req.params.type == "dni"){
    filter = { dni: req.params.search, state: true };
  }else if(req.params.type == "email"){
    filter = { email: req.params.search, state: true };
  }else if(req.params.type == "id"){
    filter = { _id: req.params.search, state: true };
  }
  Functionary.findOne(filter).populate(["service", "schedule", "type_functinary"]).exec((error, func) => {
    if (error) {
      console.error(error);
      req.flash('message', { msg: 'Error al encontrar el funcionario', status: 'error' });
      res.redirect('/');
    } else {
      let arrayAux = [];
      arrayAux.push(func)
      res.render('functionary/list', { functionaries: arrayAux });
    }
  });
};

exports.update = async (req, res) => {
  if (req.body.name) {
    let func_Find = await Functionary.findOne({ name: req.body.name, _id: { $ne: req.params.id } });
    if (func_Find) {
      req.flash('message', { msg: 'El funcionario ' + req.body.name + ' ya esta registrado', status: 'warning' });
      res.redirect('/type/functionary');
    } else {
      Functionary.updateOne({ _id: req.params.id }, req.body, (error) => {
        if (error) {
          console.error(error);
          req.flash('message', { msg: 'Error al actualizar funcionario', status: 'error' });
        } else {
          req.flash('message', { msg: 'Funcionario actualizado con exito', status: 'succes' });
        }
        res.redirect('/type/functionary');
      });
    }
  }else{
    req.flash('message', { msg: 'Debe enviar el nombre del funcionario', status: 'warning' });
    res.redirect('/type/functionary');
  }
}

exports.down = (req, res) => {
  Functionary.findOne({ _id: req.params.id }, (error, func) => {
    if (error) {
      console.error(error);
      req.flash('message', { msg: 'Error al encontrar el funcionario', status: 'error' });
      res.redirect('/type/functionary');
    } else {
      if (func) {
        func.update({
          state: !func.state,
        }, (err) => {
          if (err) {
            console.error(err);
            req.flash('message', { msg: 'Error al actualizar el funcionario', status: 'error' });
            res.redirect('/type/functionary');
          } else {
            req.flash('message', { msg: 'Actualizado correctamente', status: 'succes' });
            res.redirect('/type/functionary');
          }
        });
      } else {
        req.flash('message', { msg: 'El funcionario no existe', status: 'warning' });
        res.redirect('/type/functionary');
      }
    }
  })
}
