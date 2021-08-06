'use strict'

const Type_Functionary = require('../models/type_functionary.model');

exports.test = (req, res) => {
  res.end('Testing type functionary controller');
};

exports.edit = (req, res) => {
  Type_Functionary.findOne({ _id: req.params.id }, (error, serv) => {
    if (error) {
      console.error(error);
      req.flash('message', { msg: 'Error al encontrar el tipo de funcionario', status: 'error' });
      res.redirect('/');
    } else {
      res.render('typeFuntionary/new', { type_func: serv, title: 'GAD Tulcan', isAuth: req.isAuthenticated(), message: req.flash("message") });
    }
  });
};

exports.new = (req, res) => {
  res.render('typeFuntionary/new', { type_func: null, title: 'GAD Tulcan', isAuth: req.isAuthenticated(), message: req.flash("message") });
};

exports.register = async (req, res) => {
  if (req.body.type_name) {
    let type_func_Find = await Type_Functionary.findOne({ name: req.body.type_name });
    if (type_func_Find) {
      req.flash('message', { msg: 'El tipo de funcionario ' + req.body.type_name + ' ya esta registrado', status: 'warning' });
      res.redirect('/type/functionary');
    } else {
      new Type_Functionary(req.body).save((error) => {
        if (error) {
          console.error(error);
          req.flash('message', { msg: 'Error al registrar tipo de funcionario', status: 'error' });
        } else {
          req.flash('message', { msg: 'Tipo de Funcionario creado con exito', status: 'succes' });
        }
        res.redirect('/type/functionary');
      });
    }
  }else{
    req.flash('message', { msg: 'Debe enviar el nombre del tipo de funcionario', status: 'warning' });
    res.redirect('/type/functionary');
  }
}

exports.get = (req, res) => {
  v
  let filter = {}
  if (req.params.type == "name") {
    filter = {type_name: req.params.search, state: true};
  }else if(req.params.type == "id"){
    filter = { _id: req.params.search, state: true };
  }
  Type_Functionary.findOne(filter, (error, type_func) => {
    if (error) {
      console.error(error);
      req.flash('message', { msg: 'Error al encontrar el tipo de funcionario', status: 'error' });
      res.redirect('/');
    } else {
      let arrayAux = [];
      arrayAux.push(type_func)
      res.render('typeFuntionary/list', { types: arrayAux, title: 'GAD Tulcan', isAuth: req.isAuthenticated(), message: req.flash("message") });
    }
  });
};

exports.update = async (req, res) => {
  if (req.body.type_name) {
    let type_func_Find = await Type_Functionary.findOne({ type_name: req.body.type_name, _id: { $ne: req.params.id } });
    if (type_func_Find) {
      req.flash('message', { msg: 'El tipo de funcionario ' + req.body.type_name + ' ya esta registrado', status: 'warning' });
      res.redirect('/type/functionary');
    } else {
      Type_Functionary.updateOne({ _id: req.params.id }, req.body, (error) => {
        if (error) {
          console.error(error);
          req.flash('message', { msg: 'Error al actualizar tipo de funcionario', status: 'error' });
        } else {
          req.flash('message', { msg: 'Tipo de Funcionario actualizado con exito', status: 'succes' });
        }
        res.redirect('/type/functionary');
      });
    }
  }else{
    req.flash('message', { msg: 'Debe enviar el nombre del tipo de funcionario', status: 'warning' });
    res.redirect('/type/functionary');
  }
}

exports.down = (req, res) => {
  Type_Functionary.findOne({ _id: req.params.id }, (error, type_func) => {
    if (error) {
      console.error(error);
      req.flash('message', { msg: 'Error al encontrar el tipo de funcionario', status: 'error' });
      res.redirect('/type/functionary');
    } else {
      if (type_func) {
        type_func.update({
          state: !type_func.state,
        }, (err) => {
          if (err) {
            console.error(err);
            req.flash('message', { msg: 'Error al actualizar el tipo de funcionario', status: 'error' });
            res.redirect('/type/functionary');
          } else {
            req.flash('message', { msg: 'Actualizado correctamente', status: 'succes' });
            res.redirect('/type/functionary');
          }
        });
      } else {
        req.flash('message', { msg: 'El tipo de funcionario no existe', status: 'warning' });
        res.redirect('/type/functionary');
      }
    }
  })
}
