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
    type = "data#statistic",

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

    // Test method for routing
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
    /**
     * getStats accepts username as the input. After username is validated a list
     *          of all the stats stored agains the username are retrieved.
     */
    app.get('/leaderboard/user/:uname/stats', function (req, res) {
        var username = req.param('uname'),
            fields = null,
            options = null,
            query = null;

        function handleFindStatisticsResponse (err, data) {
            if (err) {
                //Error - print & return
                console.error(err);
                res.send(500, err);
            } else {
                //If data length > 0,
                if (data.length > 0) {
                    //Return 200 with the created statistic
                    res.send(200, data);
                } else {
                    //No data returned, the specified username does not exist
                    res.send(404, {message : "The specified username does not exist! Please try a different username!"});
                }

            }
        }//END handleFindStatisticsResponse

        //Check to make sure the username is specified
        if (!_.isUndefined(username) && !_.isNull(username)) {
            query = {
                type : type,
                username : username
            };

            options = {
                sort : {
                    //name : -1 //Sort by Name DESC
                    name : 1 //Sort by Name ASC
                }
            };
            //Find all the statistics for the specified username
            Statistic.find(query, fields, options, handleFindStatisticsResponse);

        } else {
            //Missing Username - bad request
            res.send(400, { message : 'Missing Username!'});
        }

    });

    //  leaderboard/user/name/stat/name -> PUT
    /**
     * sendStat accepts username, statistic name and statistic value. Each input is validated and
     *          stored against the specified username.
     */
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
                //Error - print & return
                console.error(err);
                res.send(500, err);
            } else {
                //Return 200 with the created statistic
                res.send(200, data);
            }
        }//END handleCreateStatisticResponse

        function handleStatisticUpdateResponse (err, data) {
            if (err) {
                //Error - print & return
                console.error(err);
                res.send(500, err);
            } else {
                //If the statistic exists, return a 200 with the updated object
                if (data) {
                    res.send(200, data);
                } else {
                    //If the statistic doesnt exist, create the new statistic
                    create = {
                        type : type,
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
                query = {
                    type : type,
                    username : username,
                    name : statname
                };



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
    app.get('/leaderboard/stat/:sname', function (req, res) {
        var statname = req.param('sname'),
            fields = null,
            options = null,
            query = null,
            leaderboard = [];

        function handleFindStatisticsResponse (err, data) {
            function forEachDocument (element, index, list) {
                var userstat = element.toObject();
                //Add the user's ranking
                userstat.ranking = index + 1;
                leaderboard.push(userstat);

                console.log("Adding ranking #" + userstat.ranking);

            } //forEachDocument

            if (err) {
                //Error - print & return
                console.error(err);
                res.send(500, err);
            } else {
                //If data length > 0,
                if (data.length > 0) {
                    console.log("Adding ranking");

                    //TODO Leverage DBMS or Mongoose if possible
                    //Add ranking -> Can DBMS or Mongoose insert #?
                    _.each(data, forEachDocument);

                    //Return 200 with the created statistic
                    res.send(200, leaderboard);
                } else {
                    //No data returned, the specified username does not exist
                    res.send(404, {message : "The specified statistic does not exist! Please try a different stat!"});
                }

            }
        }//END handleFindStatisticsResponse

        //Check to make sure the statistic is specified
        if (!_.isUndefined(statname) && !_.isNull(statname)) {
            query = {
                type : type,
                name : statname
            };

            options = {
                sort : {
                    value: -1 //Sort by Value DESC
                    //value : 1 //Sort by Value ASC
                }
            };

            console.log("Finding statistics for " + statname);
            //Find all the statistics for the specified username
            Statistic.find(query, fields, options, handleFindStatisticsResponse);

        } else {
            //Missing Username - bad request
            res.send(400, { message : 'Missing statistic!'});
        }

    }); //END GET

};