'use strict'

const Service = require('../models/services.model');

exports.test = (req, res) => {
  res.end('Testing service controller');
};

exports.register = async (req, res) => {
  if (req.body.name && req.body.time) {
    let servFind = await Service.findOne({ name: req.body.name });
    if (servFind) {
      req.flash('message', { msg: 'El servicio ' + req.body.name + ' ya esta registrado', status: 'warning' });
      res.redirect('/service');
    } else {
      new Service(req.body).save((error) => {
        if (error) {
          console.error(error);
          req.flash('message', { msg: 'Error al registrar servicio', status: 'error' });
        } else {
          req.flash('message', { msg: 'Servicio creado con exito', status: 'succes' });
        }
        res.redirect('/service');
      });
    }
  }
}

exports.get = (req, res) => {
  Service.findOne({ _id: req.params.id }, (error, serv) => {
    if (error) {
      console.error(error);
      req.flash('message', { msg: 'Error al encontrar el servicio', status: 'error' });
      res.redirect('/');
    } else {
      let arrayAux = [];
      arrayAux.push(serv)
      res.render('service/list', { services: arrayAux });
    }
  });
};

exports.all = (req, res) => {
  Service.find({}, (error, servs) => {
    if (error) {
      console.error(error);
      req.flash('message', { msg: 'Error al encontrar el servicio', status: 'error' });
      res.redirect('/');
    } else {
      res.render('service/list', { services: servs });
    }
  });
};

exports.update = async (req, res) => {
  if (req.body.name && req.body.time) {
    let servFind = await Service.findOne({ name: req.body.name, _id: { $ne: req.params.id } });
    if (servFind) {
      req.flash('message', { msg: 'El servicio ' + req.body.name + ' ya esta registrado', status: 'warning' });
      res.redirect('/service');
    } else {
      Service.updateOne({ _id: req.params.id }, req.body, (error) => {
        if (error) {
          console.error(error);
          req.flash('message', { msg: 'Error al actualizar servicio', status: 'error' });
        } else {
          req.flash('message', { msg: 'Servicio actualizado con exito', status: 'succes' });
        }
        res.redirect('/service');
      });
    }
  }
}

exports.down = (req, res) => {
  Service.findOne({ _id: req.params.id }, (error, serv) => {
    if (error) {
      console.error(error);
      req.flash('message', { msg: 'Error al encontrar el servicio', status: 'error' });
      res.redirect('/service');
    } else {
      if (serv) {
        serv.update({
          state: !serv.state,
        }, (err) => {
          if (err) {
            console.error(err);
            req.flash('message', { msg: 'Error al actualizar el servicio', status: 'error' });
            res.redirect('/service');
          } else {
            req.flash('message', { msg: 'Actualizado correctamente', status: 'succes' });
            res.redirect('/service');
          }
        });
      } else {
        req.flash('message', { msg: 'El servicio no existe', status: 'warning' });
        res.redirect('/service');
      }
    }
  })
}