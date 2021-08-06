var express = require('express');

const controller = require('../controllers/functionary.controller');

var router = express.Router();

/* GET home page. */
router.get('/test', controller.test);
// router.get('/new', controller.register);
// router.get('/edit/:id', controller.register);
router.get('/down/:id', controller.down);
router.get('/get/:type/:search', controller.get);

router.post('/update/:id', controller.update);

module.exports = router;
