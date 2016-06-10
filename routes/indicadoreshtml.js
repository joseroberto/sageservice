const express = require('express'),
      router = express.Router(),
      indicadorDao = require('../dao/indicadorDao.js'),
      numeral = require('numeral');


router.get('/', function (req, res, next) {
    indicadorDao.listIndicadores(function(err, result) {
        if(err){
            res.status(500).json({message: err});
            return;
        }
        res.render('indicadores', {indicadores:result.rows});
	});
});

module.exports = router;