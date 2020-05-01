var express = require("express");
var app = express();
var shortid = require('shortid');
var bodyParser = require("body-parser");
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');


var adapter = new FileSync('db.json')
var db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ toDoList: [] })
  .write()

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.end("hello world");
});

app.get("/todos", (req, res) => {
  res.render("index", {
    toDoList: db.get('toDoList').value()
  });
});

app.get("/create", function(req, res) {
  res.render("create");
});

app.get('/toDoList/:id', function(req, res) {
	var id =req.params.id;

	var toDo = db.get('toDoList').find({id: id}).value();

	res.render('view', {
		toDo: toDo
	});
});



app.post("/views/create", function(req, res) {
	req.body.id = shortid.generate();
 	db.get('toDoList').push(req.body).write();
 	res.redirect("/todos");
});

app.listen(3000, function(){
	console.log('server listening on port' + 3000);
});
