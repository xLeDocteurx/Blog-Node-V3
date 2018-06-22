let bodyparser = require('body-parser');
let express = require('express');
//let socket = require('socket.io');
//let moment = require('moment');
let fs = require('fs');
let MongoClient = require('mongodb').MongoClient

const webport = 8080;

let app = express();
app.set('view engine', 'ejs');
app.use(express.static('public')); // fait appel au dossier Public, avec Css, Frameworks, Img et script.js
app.use(bodyparser.urlencoded({ extended: false}));

var db

MongoClient.connect('mongodb://vaness:azerty00@ds161520.mlab.com:61520/blog_v3', function (err, client)  {
  if (err) return console.log(err)
  db = client.db('blog_v3')

let server = app.listen(process.env.PORT || webport);
//let io = socket(server);

})




// index.ejs = Accueil
app.get('/', function (req, res) {
   // let url = 'mongodb://vaness:azerty00@ds161520.mlab.com:61520/blog_v3';
    res.render('index');
});

app.get('/create' , function(req,res)  {
	res.render('create');
})

app.post('/create/post' , function(req,res){
	db.collection('posts').save(req.body, function (err, result) {
    if (err) return console.log(err)
    console.log('saved to database')
    res.render('index')
  })
})




// io.on('connection', (socket) => {

//     // console.log(`//////////////////////////////////////////////////////////////////////////////////////////`);
//     // console.log(`Un utilisateur non enregistré s'est connecté au serveur : ${socket.id}`);
//     // console.log(`//////////////////////////////////////////////////////////////////////////////////////////`);

// });