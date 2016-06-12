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


module.exports = router;
