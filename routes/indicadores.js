var express = require('express');
var router = express.Router();

var indicadorDao = require('../dao/indicadorDao.js');

//estados
router.get('/', function(req, res, next) {
	indicadorDao.listIndicadores(function(result) {
		res.json(result.rows);
	});
});

module.exports = router;