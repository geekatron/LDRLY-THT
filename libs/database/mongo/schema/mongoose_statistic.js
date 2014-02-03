/**
 * Created with WebStorm.
 * Date: 2/3/2014
 * Time: 1:28 AM
 * @author Adam C. Nowak
 * @description
 */

/*jslint node: true */

"use strict";

//Required Modules
var env = require('../../../config/endpoint.js');
//Required Modules
var _ = require("underscore"),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var statisticSchema = new Schema({
        type : String,
        name : String,
        value : String,
        created : String,
        lastmodified : String
    },
    {
        collection : 'ldrly'
    });


//Export the Content Object
module.exports = statisticSchema;