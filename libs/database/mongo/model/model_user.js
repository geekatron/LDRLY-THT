/**
 * Created with WebStorm.
 * Date: 2/3/2014
 * Time: 1:22 AM
 * @author Adam C. Nowak
 * @description
 */

/*jslint node: true */

"use strict";

//Required Modules
var env = require('../../../config/endpoint.js'),
    userSchema = require('../schema/mongoose_user'),

//Required Modules
    _ = require("underscore"),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var User = db.model('User', userSchema);

//Export the Content Object
module.exports = User;