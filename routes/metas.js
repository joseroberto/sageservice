var express = require('express');
var router = express.Router();

var metaDao = require('../dao/metaDao.js');

//estados
router.get('/', function(req, res, next) {
	metaDao.listMetas(function(result) {
		res.json(result.rows);
	});
});

module.exports = router;