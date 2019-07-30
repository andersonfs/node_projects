var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tabuada/:valor', function(req, res, next) {
  var valor = req.params.valor;
  var resulado = (valor % 2) == 0 ? valor : false;
  res.render('tabuada', {numero: resulado});
});

module.exports = router;
