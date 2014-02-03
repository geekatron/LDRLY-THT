/**
 * Created with WebStorm.
 * Date: 2/3/2014
 * Time: 12:49 AM
 * @author Adam C. Nowak
 * @description
 */

"use strict";


/**
 *  Module Dependencies
 */
var express = require('express'),
    env = require('./libs/config/endpoint'),
    http = require('http'),
    path = require('path'),
    app = express();

/*
 ===============================================================
 Express Session Setup
 ===============================================================
 */

var app = module.exports = express(),
    processport = process.env.PORT || 5050;

global.debug = (process.env.DEBUG_MODE === 'true') || false;

//Include the Environment Module
require('./libs/config/environment.js')(app, express);

/** Routes for the CORS Fix */
//Route to support CORS
require('./routes/routes_cors')(app);
//Route for HTML content
//require('./routes/routes_html')(app);
//Route for the service
//require('./routes/routes_leaderboard')(app);

// start server
app.listen(processport);

//Print out the port on startup
console.log("Port (process.env.PORT): " + processport);
console.log("Port for node.js process: " + app.get('port'));
console.log('APP Address: ' + app.get('address'));