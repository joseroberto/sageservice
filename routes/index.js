const   express = require('express'),       
        response = require('../helpers/response');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    response.exec(null,
      function(err, result){
          if(err){
              res.status(500).json({message: err});
              return;
          }
          res.render('index', result);
      });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/teste', (req,res,next) =>{
    res.render('teste');
});

router.get('/teste2', (req,res,next) =>{
    res.render('teste2',{ qtdMetas:20, qtdIndicadores: 7,  percMetas:15, percIndicadores: 10});
});

module.exports = router;
