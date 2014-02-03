/**
 * Created with WebStorm.
 * Date: 2/3/2014
 * Time: 1:29 AM
 * @author Adam C. Nowak
 * @description
 */

/*jslint node: true */

"use strict";

//Required Modules
var statisticSchema = require('../schema/mongoose_statistic'),

//Required Modules
    _ = require("underscore"),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Statistic = db.model('Statistic', statisticSchema);

//Export the Content Object
module.exports = Statistic;