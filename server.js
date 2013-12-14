'use strict';

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

// Express configure
app.set('port', process.env.PORT || 3000);

// Set logging
app.use(function(req, res, next){
    console.log('%s %s', req.method, req.url);
    next();
});

// Mount static
app.use(express.static( path.join( __dirname, 'dist') ));

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
