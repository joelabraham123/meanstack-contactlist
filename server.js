var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist',['contactlist']);	//(database,collection)
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));		//looks for static files
app.use(bodyParser.json());

app.get('/contactList',function(req, res){		//tells server to listen for get request for created contactlist
	console.log("i received a get request");		//restart browser after this
	db.contactlist.find(function(err, docs){		//responds with documents from database
		console.log(docs);		//test to make sure u received data from database
		res.json(docs);			//sends data back to controller
	
		/*	ACCEPTING FROM SERVER
	person1 = {
		name: 'joe',
		email: 'abc@gmail.com',
		number: '123456'
	};
	
	person2 = {
		name: 'asdfg',
		email: 'asdfg@gmail.com',
		number: '23473456'
	};
	
	person3 = {
		name: 'qwert',
		email: 'abcqwert@gmail.com',
		number: '3456723'
	};
	var contactList = [person1,person2,person3];
	res.json(contactList);		//responds to get request by sending back contactList data in JSON format
	*/	
	});	
});	

//by using bodyparser,server can post the body of new input received 	
app.post('/contactList',function(req, res){			//post request for controller
	console.log(req.body);						//prints to cmd
	db.contactlist.insert(req.body, function(err,doc){
		res.json(doc);		//res=respond
	});		//this code sends new data to both db and controller
});	//install body-parser after this


/*
app.get('/',function(req, res){
	res.send('Hello World from server.js')
});
*/
app.delete('/contactList/:id',function(req, res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});

app.get('/contactList/:id',function(req, res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)},function(err, doc){
		res.json(doc);
	});
});

app.put('/contactList/:id',function(req,res){
	var id = req.params.id;
	console.log(req.body.name);
	db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},		//selects contact to be modified
		update: {$set: {name: req.body.name,email: req.body.email, number: req.body.number}},
		new: true},function(err,doc){	//doc that is updated
		res.json(doc);					//json of updated doc
	});
});

app.listen(3000);
console.log('Server running at port 3000');