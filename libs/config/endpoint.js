/**
 * Created with WebStorm.
 * Date: 2/3/2014
 * Time: 12:52 AM
 * @author Adam C. Nowak
 * @description
 */

/*jslint node: true */

"use strict";

var endpoints = {
    ldrly : process.env.LEADERBOARD_URL
};

//Export the endpoints
exports.endpoint = endpoints;