var express = require('express');
var app = express();
var sessions = require('express-session');
var session;
var bodyParser = require('body-parser');
var router = express.Router();

app.use('/', express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



var mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/mDB');


const dataSchema = mongoose.Schema({
	name: String,
	date: Date,
	content: String
});

const data = mongoose.model('data', dataSchema);


app.get('/getdata', function(req, res){
	data.find(function(err, item){
		res.send(item);
	});
});

app.post('/post', function(req, res){
	const newData = new data({
		name: req.body.name,
		date: req.body.date,
		content: req.body.content
	});
	newData.save().then(res.redirect('/post'));
});


app.use(sessions({
	secret: 'aslkfj123kjslkdfa123dlakfj',
	resave: false,
	saveUninitialized: false
}));

app.get('/', function(req, resp){
	resp.sendFile('login.html', {root: __dirname});
});

app.post('/', function(req, resp){
	session = req.session;
	session.uniqueId = req.body.username;
	resp.redirect('/redirects');
});




app.get('/redirects', function(req, resp){
	session = req.session;
	if(session.uniqueId=='admin'){
		resp.redirect('/post');
	}else{
		//resp.sendFile('redirects.html', {root: __dirname});
		resp.send(req.session.uniqueId + ' cannot be found.');
	}
});

app.get('/post', function(req, resp){
	resp.sendFile('post.html', {root: __dirname});
});

app.get('/logout', function(req, resp){
	req.session.destroy();
	resp.redirect('/');
});

/*app.post('/home', function(req, resp){
	req.session = session;
	session.myData = req.body.blog;
	resp.redirect('/data');
});*/




app.listen(3000,function(){
	console.log('Listening at port 3000');
});

