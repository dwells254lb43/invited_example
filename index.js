const express = require('express');
const path = require('path');
const db = require('./server/db');
const app = express();
var bodyParser = require('body-parser')

const userRoutes = require("./server/routes/user");

app.use(bodyParser.json());
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(userRoutes);

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5001;
app.listen(port);

console.log('App is listening on port ' + port);