var express = require('express');
var mysql = require('./dbcon.js');
var path = require('path');
var fs = require('fs');
var app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/get-user-data', function(req, res) {
  //to-do
});

app.post('/update-movie-list', function(req, res) {
  //to-do
});

app.post('/delete-movie-list', function(req, res) {
  //to-do
});

app.post('/get-all-lists', function(req, res) {
  //to-do
});

app.post('/search', function(req, res) {
  //to-do
});

app.post('/rate', function(req, res) {
  //to-do
});

app.post('/get-ratings', function(req, res) {
  //to-do
});

app.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  if (!username || !password) {
    return res.status(400).send({ success: false, message: 'Username and password are required' });
  }

  mysql.pool.query('SELECT password FROM users WHERE username = ?', [username], function(err, results) {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).send({ success: false, message: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).send({ success: false, message: 'User not found' });
    }

    var storedPassword = results[0].password;

    if (storedPassword === password) {
      return res.send({ success: true });
    } else {
      return res.send({ success: false, message: 'Incorrect password' });
    }
  });
});

app.post('/create-account', function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const uid = Math.floor(Math.random() * 1000000);

  mysql.pool.query('INSERT INTO users (uid, username, password) VALUES (?, ?, ?)', [uid, username, password], function(err, result) {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        res.json({ success: false, message: 'Username already exists' });
      } else {
        console.error("Error creating user:", err);
        res.json({ success: false, message: "Server error" });
      }
    } else {
      res.json({ success: true, uid: uid });
    }
  });
});

app.set('port', process.argv[2]);

function createTables() {
  const sqlPath = path.join(__dirname, 'makeTables.sql');
  fs.readFile(sqlPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading SQL file:', err);
      return;
    }

    const queries = data.split(';');

    queries.forEach(query => {
      if (query.trim()) { // Avoid empty queries
        mysql.pool.query(query, (err) => {
          if (err) {
            console.error('Error executing query:', err);
          }
        });
      }
    });
  });
}

app.listen(app.get('port'), function(){
  createTables();
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
