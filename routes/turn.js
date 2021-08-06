var express = require('express');

const controller = require('../controllers/turn.controller');

var router = express.Router();

/* GET home page. */
router.get('/test', controller.test);
router.get('/new', controller.register);
// router.get('/edit/:id', controller.register);
// router.get('/down/:id', controller.down);
router.get('/get/:type/:search', controller.get);

router.post('/update/:id', controller.update);
router.post('/save', controller.register);

module.exports = router;
