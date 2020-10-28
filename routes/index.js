var express = require('express');
const bodyParser = require("body-parser");
var router = express.Router();
var sql = require('../database');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {
  	var mysql = "SELECT * FROM todo;";
	sql.query(mysql,function(err,result){
		if (err) throw err;
        res.render("index", { todos: result.rows });
		console.log(result.rows);
	})
});

router.post('/', (req, res) => {
const { textTodo } = req.body;
  	var mysql = "INSERT INTO todo(task) VALUES( '" + textTodo + "');";
	sql.query(mysql,function(err,result){
		if (err) throw err;
        res.redirect('/');
	})
});


router.put('/', (req, res) => {
const { name, id } = req.body;
if (name === "todo") {
  	var mysql = "UPDATE todo SET status = 1 WHERE id = " + id + ";";
	sql.query(mysql,function(err,result){
		if (err) throw err;
    	res.setHeader('Content-Type', 'application/json');
    	res.json({status:200});
    	res.end();

	})
}
 else {
  	var mysql = "UPDATE todo SET status = 0 WHERE id = " + id + ";";
	sql.query(mysql,function(err,result){
		if (err) throw err;
    	res.setHeader('Content-Type', 'application/json');
    	res.json({status:200});
    	res.end();
	})
}
      
});

router.delete('/',(req,res) => {
const { name, id } = req.body;
  	var mysql = "DELETE FROM todo WHERE id = " + id + ";";
	sql.query(mysql,function(err,result){
		if (err) throw err;
    	res.setHeader('Content-Type', 'application/json');
    	res.json({status:200});
    	res.end();
})
});


module.exports = router;
