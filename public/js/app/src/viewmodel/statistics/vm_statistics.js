/**
 * Created with WebStorm.
 * Date: 2/3/2014
 * Time: 2:39 PM
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
ldrly.viewmodel.Statistics = {};

/**
 * View models for the Interview Prep Profile.
 * @params args - Arguments expected by the constructor.
 *
 * @constructor
 */
ldrly.viewmodel.Statistics = function (args) {
    var self = this,
        err_msg = "";

    /* View related observables */
    self.state = ko.observable(0);
    self.simulate = ko.observable();

    self.username = ko.observable(); //Store the Username
    self.statname = ko.observable(); //Store the Statistic Name
    self.statvalue = ko.observable(); //Store the Statistic Value

    self.response = ko.observable(); //Store the response to the update

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

    self.setUserStat = function (data) {
        var username = $('#username').val(),
            statname = $('#statname').val(),
            statvalue = $('#statvalue').val();

        //Clear the error message
        //$('#err-msg').text('');
        //Show the status
        ldrly.viewmodel.helper.showStatus();

        function handleSetStatResponse(err, data) {
            if (err) {
                console.error(err);
                //Show error message
                ldrly.viewmodel.helper.errorStatus('Error setting statistic!!');
            } else {
                //Show success message
                ldrly.viewmodel.helper.successStatus('Statistic set!!');
                //Set the data
                self.response(JSON.stringify(data));
                //Set the state to show the appropriate table
                self.state(1);
            }
        }//END handleSetStatResponse

        //Check to make sure the username, statname and password are specified
        if (!_.isUndefined(username) && !_.isNull(username) && username.length > 0) {
            if (!_.isUndefined(statname) && !_.isNull(statname) && statname.length > 0) {
                if (!_.isUndefined(statvalue) && !_.isNull(statvalue) && statvalue.length > 0) {
                    //Retrieve the stats for the specified username
                    ldrly.integration.rest.stats.retrieve(username, handleSetStatResponse);
                } else {
                    ldrly.viewmodel.helper.errorStatus('Missing Stat Value!!');
                }
            } else {
                ldrly.viewmodel.helper.errorStatus('Missing Stat Name!!');
            }
        } else {
            ldrly.viewmodel.helper.errorStatus('Missing Username!!');
        }
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