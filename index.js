var express = require('express');
var app = express();
var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', function (req, res) {
	res.end('hello world');
})

app.get("/todos", (req, res) => {
	res.render('index',{
		toDoList: ['Đi chợ','Nấu cơm','Rửa bát','Học code tại CodersX']
	});
});



app.listen(port, function(){
	console.log('server listening on port' + 3000);
});