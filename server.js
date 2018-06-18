let bodyparser = require('body-parser');
let express = require('express');
let socket = require('socket.io');
let moment = require('moment');
let fs = require('fs');

const webport = 8080;

let app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: false}));

let server = app.listen(process.env.PORT || webport);
let io = socket(server);

app.get('/', (req, res) => {
    res.render('index');
});

io.on('connection', (socket) => {

    // console.log(`//////////////////////////////////////////////////////////////////////////////////////////`);
    // console.log(`Un utilisateur non enregistré s'est connecté au serveur : ${socket.id}`);
    // console.log(`//////////////////////////////////////////////////////////////////////////////////////////`);

});