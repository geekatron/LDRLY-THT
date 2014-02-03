/**
 * Created with WebStorm.
 * Date: 2/3/2014
 * Time: 11:00 AM
 * @author Adam C. Nowak
 * @description
 */

/*jslint browser: true */
/*jslint devel: true */
/*jslint nomen: true */
/*global $, jQuery, _, ko, Mustache */
/*global ldrly */
'use strict';

//Setup the Namespace for the SIP Client Library
if (ldrly) {
    console.log('LDRLY namespace exists!');
} else {
    var ldrly = {};
}

//Indicate whether to use sample data or not
ldrly.SIMULATE =  false;

//Infer the Environment based on the URL
ldrly.ENVIRONMENT = (function () {
    var url = window.location,
        hostname,
        env;

    //Retrieve the hostname
    hostname = url.hostname;
    //Local environment
    if ((hostname === '127.0.0.1') || (hostname === 'localhost') || hostname.match('192.168')) {
        env = 'LOCAL';
    } else if (hostname.indexOf('.dev.') > -1) {
        //Daily environment
        env = 'DEV';
    } else if (hostname.indexOf('.daily.') > -1) {
        //Latest environment
        env = 'DAILY';
    } else if (hostname.indexOf('.latest.') > -1) {
        //Latest environment
        env = 'LATEST';
    } else if (hostname.indexOf('.a1.') > -1) {
        //A1 environment
        env = 'A1';
    } else {
        //Production environment
        env = 'PRODUCTION';
    }

    return env;
})();

ldrly.Configuration = function (args) {
    //Data Endpoints
    var agurl = '',
        ldrlyurl = '',
        repository = 'dev';

    //LOCAL Development Configuration
    if (_.isEqual(ldrly.ENVIRONMENT, 'LOCAL')) {
        agurl = 'http://agraph.pushupsforyourbrain.com';
        ldrlyurl = 'http://' + window.location.host;
    } else if (_.isEqual(ldrly.ENVIRONMENT, 'DEV')) {
        //DEVELOPMENT ENVIRONMENT
        agurl = 'http://agraph.pushupsforyourbrain.com';
        ldrlyurl = 'http://' + window.location.host;
    } else if (_.isEqual(ldrly.ENVIRONMENT, 'DAILY')) {
        //DAILY ENVIRONMENT
        agurl = 'http://agraph.pushupsforyourbrain.com';
        ldrlyurl = 'http://' + window.location.host;
    } else if (_.isEqual(ldrly.ENVIRONMENT, 'LATEST')) {
        //LATEST ENVIRONMENT
        agurl = 'http://agraph.pushupsforyourbrain.com';
        ldrlyurl = 'http://' + window.location.host;
    } else if (_.isEqual(ldrly.ENVIRONMENT, 'A1')) {
        //A1 ENVIRONMENT
        agurl = 'http://agraph.pushupsforyourbrain.com';
        ldrlyurl = 'http://' + window.location.host;
    } else if (_.isEqual(ldrly.ENVIRONMENT, 'PRODUCTION')) {
        agurl = 'http://agraph.pushupsforyourbrain.com';
        ldrlyurl = 'http://' + window.location.host;
    }


    this.getEndPoints = function () {
        var endpoints = {
            ldrly : {
                ag: agurl,
                url : ldrlyurl
            }
        };

        return endpoints;
    };

    this.getRepository = function () {
        return repository;
    };

    this.setRepository = function (repo) {
        repository = repo;
    };

};
//Create a new instance/class of the SIP Configuration
ldrly.config = new ldrly.Configuration(null);