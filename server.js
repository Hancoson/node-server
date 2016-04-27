/**
 * Created by Guoxing.han on 2016-4-27.
 */

var path         = require('path');
var express = require('express');
var app = express();
app.use(express.static(path.join(__dirname, '/')));
//app.use(express.static(__dirname + '/'));
app.listen(9001);
console.log('Server running at http://localhost:9001/');