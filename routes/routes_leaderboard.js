/**
 * Created with WebStorm.
 * Date: 2/3/2014
 * Time: 2:09 AM
 * @author Adam C. Nowak
 * @description
 */

/*jslint node: true */

"use strict";

var errors = require('../libs/error/abstracterror'),
    routing_error = require('../libs/utils/routing/routing_error'),
    env = require('../libs/config/endpoint.js'),
    format = require('util').format,
    mongoose = require('mongoose'),
    User = require('../libs/database/mongo/model/model_user'),
    Statistic = require('../libs/database/mongo/model/model_statistic'),

//Include npm modules
    _ = require("underscore"),
    S = require('string'),
    transport = null;

module.exports = function (app) {
    var error = Object.create(routing_error);
    /************************************************************
     *  FUNCTIONALITY RELATED TO Statistics
     *************************************************************/

    /************************************************************
     *  Routes currently do not require authentication!          *
     *************************************************************/

        // Retrieve Company Profile
    app.get('/leaderboard/', function (req, res) {
            res.send(200, { message : 'Tada!'});
    });

    //  leaderboard/user
    //  leaderboard/user/name -> GET/PUT
    app.get('/leaderboard/user/:uname', function (req, res) {
        var username = req.param('uname');

        res.send(200, {message : username});
    });

    //  leaderboard/user/name/stats/ -> GET
    app.get('/leaderboard/user/:uname/stats', function (req, res) {
        var username = req.param('uname');

        res.send(200, {message : "Stats for: " + username});
    });

    //  leaderboard/user/name/stat/name -> PUT
    app.put('/leaderboard/user/:uname/stat/:sname', function (req, res) {
        var username = req.param('uname'),
            statname = req.param('sname'),
            statvalue = req.body.value,
            //options = { upsert : true },
            options = null,
            query = null,
            create = null,
            update = null;

        function handleCreateStatisticResponse (err, data) {
            if (err) {
                console.error(err);
                res.send(500, err);
            } else {
                //Return 200 with the created statistic
                res.send(200, data);
            }
        }//END handleCreateStatisticResponse

        function handleStatisticUpdateResponse (err, data) {
            if (err) {
                console.error(err);
                res.send(500, err);
            } else {
                //If the statistic exists, return a 200 with the updated object
                if (data) {
                    res.send(200, data);
                } else {
                    //If the statistic doesnt exist, create the new statistic
                    create = {
                        username : username,
                        name : statname,
                        value : statvalue,
                        created: new Date().toISOString()
                    };
                    Statistic.create(create, handleCreateStatisticResponse);
                }
            }
        }//END handleStatisticUpdateResponse

        //Check to make sure the username, statistic name and value are specified
        if (!_.isUndefined(username) && !_.isNull(username)) {
            if (!_.isUndefined(statname) && !_.isNull(statname)) {
                if (!_.isUndefined(statvalue) && !_.isNull(statvalue)) {

                update = {
                    name : statname,
                    value : req.body.value,
                    lastmodified : new Date().toISOString()
                };

                //The query to find a result for the specified username & stat name
                query = { username : username, name : statname };



                //If the statistic already exists, update the value and the lastmodified
                Statistic.findOneAndUpdate(query, update, options, handleStatisticUpdateResponse);

                //User.where('username', username);

                } else {
                    res.send(400, { message : 'Missing statistic value. Please specific a numeric value for the statistic!'});
                }
            } else {
                res.send(400, { message : 'Missing statistic name. Please specific the name of a statistic to set!'});
            }
        } else {
            //Missing Username - bad request
            res.send(400, { message : 'Missing Username!'});
        }
    }); //END

    //  leaderboard/stat/name -> GET

};