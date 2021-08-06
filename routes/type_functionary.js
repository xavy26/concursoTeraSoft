var express = require('express');

const controller = require('../controllers/type_functionary.controller');

var router = express.Router();

/* GET home page. */
router.get('/test', controller.test);
router.get('/new', controller.new);
router.get('/edit/:id', controller.edit);
router.get('/down/:id', controller.down);
router.get('/get/:type/:search', controller.get);

router.post('/update/:id', controller.update);
router.post('/save', controller.register);

module.exports = router;
