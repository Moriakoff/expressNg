var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var router = express.Router();
const http = require('http');

console.log('——————————- Run on port ' + port);

/****************************** Router ***************************/
router.get('*', function (req, res) {
    res.sendFile('./public/index.html');
   /* res.sendFile('index.html',
      {
        root: __dirname + '/'
      });*/
  }
);

app.get('/api/person', function (request, response) {
  let persons = '';
  console.log("before request to");

  http.get("http://localhost:8080/api/getAll", (res => {
    res.on('data', data => {
      console.log("request to spring");
      persons += data;
    });
    res.on('end', function () {
      console.log(persons);
      response.send(persons);
    })
  }));
});

/****************************** /Router ***************************/
 app.use(morgan('dev')); // log every request to the console
app.use(express.static(__dirname + '/dist/expressNg')); // Static (public) folder

app.use(bodyParser.urlencoded({extended: true}));// get information from html forms
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use('/', router);

app.listen(port);
