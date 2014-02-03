/**
 * Created with WebStorm.
 * Date: 2/3/2014
 * Time: 11:46 AM
 * @author Adam C. Nowak
 * @description
 */

/*jslint browser: true */
/*jslint devel: true */
/*jslint nomen: true */
/*global $, jQuery, _, ko, Mustache */
/*global ldrly */
"use strict";

/*  =============================================
 View Model for Leaderboard
 ============================================= */
ldrly.viewmodel.Leaderboard = {};

/**
 * View models for the Interview Prep Profile.
 * @params args - Arguments expected by the constructor.
 *
 * @constructor
 */
ldrly.viewmodel.Leaderboard = function (args) {
    var self = this,
        err_msg = "";

    /* View related observables */
    self.state = ko.observable(0);
    self.simulate = ko.observable();

    self.stat = ko.observable(); //Store the Statistic Name
    self.username = ko.observable(); //Store the Username
    self.leaderboard = ko.observableArray(); //Store all the retrieved Company Profile Data
    self.userstats = ko.observableArray(); //Store the stats for the User

    /** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
     **            Private functionality/behaviours              **
     ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */


    /** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
     **             Helper functionality/behaviours              **
     ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

    /** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
     **         Operations/behaviour to assist Views             **
     ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */


    /** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
     **         Operations/behaviour related to Leaderboard       **
     ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */
    self.retrieveLeaderboard = function (data) {
        var statname = $('#statname').val();

        //Clear the error message
        $('#err-msg').text('');

        function handleLeaderboard(err, data) {
            ldrly.viewmodel.helper.showStatus();

            if (err) {
                console.error(err);
                //Show error message
                ldrly.viewmodel.helper.errorStatus('Error retrieving Leaderboard!');
            } else {
                //Show success message
                ldrly.viewmodel.helper.successStatus('Leaderboard Retrieved!!');
                //Set the leaderboard
                self.leaderboard = ko.observableArray(data);
                //Set the state to show the appropriate table
                self.state(1);
            }
        }//END handleLeaderboard

        //Retrieve the leaderboard for the specified stat
        ldrly.integration.rest.stats.leaderboard(statname, handleLeaderboard);
    };

    self.retrieveUserStats = function (data) {
        var username = $('#username').val();

        //Clear the error message
        $('#err-msg').text('');

        function handleLeaderboard(err, data) {
            ldrly.viewmodel.helper.showStatus();

            if (err) {
                console.error(err);
                //Show error message
                ldrly.viewmodel.helper.errorStatus('Error retrieving Leaderboard!');
            } else {
                //Show success message
                ldrly.viewmodel.helper.successStatus('Leaderboard Retrieved!!');
                //Set the data
                self.userstats = ko.observableArray(data);
                //Set the state to show the appropriate table
                self.state(2);
            }
        }//END handleLeaderboard

        //Retrieve the stats for the specified username
        ldrly.integration.rest.stats.retrieve(username, handleLeaderboard);
    };


    /** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
     **                 Initialize the View Model                **
     ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */
    (function () {
        /* set the state of the view model */
        self.state(0);

        function initVM() {


        }//END document ready

        initVM();
    }());

};