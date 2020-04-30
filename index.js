var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var low =require('lowdb'); 
var FileSync =  require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');

db =low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults( { toDoList: []} )
  .write();

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
	res.end('hello world');
})


app.get("/todos", (req, res) => {
	res.render('index',{
		toDoList: db.get('toDoList').value()
	});
});

app.get("/create",function(req, res){
	res.render('create');
})

app.post("/views/create",function(req, res){
	db.get('toDoList').value().push(req.body.name);
	res.redirect('/todos');
})



app.listen(port, function(){
	console.log('server listening on port' + 3000);
});
