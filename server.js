var express = require('express');
var app = express();
var router = express.Router();
var port = process.env.PORT || 8080;


var handlebars = require('express-handlebars').create({
	defaultLayout: false,
	path: 'views'
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var logger = require('morgan');
app.use(logger('dev'));

var pdfFiller = require('pdffiller');

app.get('/', function(req, res){
	res.render('home');
});

app.get('/about', function(req, res){
	res.render('about');
});
app.get('/appear', function(req, res){
	res.render('appear');
});
app.get('/build', function(req, res){
	res.render('build');
});
app.get('/contact', function(req, res){
	res.render('contact');
});
app.get('/donate', function(req, res){
	res.render('donate');
});
app.get('/itips', function(req, res){
	res.render('itips');
});
app.get('/jobs', function(req, res){
	res.render('jobs');
});
app.get('/rtips', function(req, res){
	res.render('rtips');
});




var sourcePDF = "sourcesPDF.pdf";
var destinationPDF = "newResume.pdf";

app.post('/build', function(req, res){
	var data = {
		"name" : req.body.name,
		"email" : req.body.email,
		"phone" : req.body.phone,
		"company" : req.body.company,
		"location" : req.body.location,
		"title" : req.body.title,
		"time-period" : req.body.time,
		"description-work" : req.body.description,
		"school" : req.body.school,
		"city-state" : req.body.city,
		"dates" : req.body.dates,
		"award" : req.body.award,
		"description-award" : req.body.adescription,
		"skill" : req.body.skills
		};
	pdfFiller.fillForm(sourcePDF, destinationPDF, data, function(err){
		if(err) throw err;
		console.log("Finished filling form!");
	});
	res.redirect('/jobs');
	
});


// ALWAYS AT THE BOTTOM 
app.listen(port);
console.log('Go to port ' + port);






	