/**
 * Created with WebStorm.
 * Date: 2/3/2014
 * Time: 11:05 AM
 * @author Adam C. Nowak
 * @description
 */

/*jslint browser: true */
/*jslint devel: true */
/*jslint nomen: true */
/*global $, jQuery, _, ko, Mustache */
/*global ldrly, ui */
"use strict";

ldrly.integration.rest.stats = {};

ldrly.integration.rest.stats.set = function (username, statname, data, callback) {
    var self = this,
        endpoints = ldrly.config.getEndPoints(),
        url_base = endpoints.ldrly.url,
        url_resource = '/leaderboard/user/' + username + '/stat/' + statname,
        url = url_base + url_resource;

    var request = $.ajax(
        {
            url : url,
            type : 'PUT',
            data : JSON.stringify(data),
            contentType : 'application/json; charset=utf-8',
            dataType : 'json',
            headers : {
                'Accept' : 'application/json'
            }
        }
    );

    request.done(function (result) {
        callback(undefined, result);
    });
    request.always(function (result) {

    });
    request.fail(function (XHR, textStatus, errorThrown) {
        console.log("Error! " + textStatus + ':' + errorThrown);
        //Create an Error Object
        var error = { responseText : XHR.responseText, status : XHR.statsus, statusText : XHR.statsusText };
        //Pass back the Error
        callback(error);
    });
};

ldrly.integration.rest.stats.retrieve = function (username, callback) {
    var self = this,
        endpoints = ldrly.config.getEndPoints(),
        url_base = endpoints.ldrly.url,
        url_resource = '/leaderboard/user/' + username + '/stats',
        url = url_base + url_resource;

    var request = $.ajax(
        {
            url : url,
            type : 'GET',
            contentType : 'application/json; charset=utf-8',
            dataType : 'json',
            headers : {
                'Accept' : 'application/json'
            }
        }
    );

    request.done(function (result) {
        callback(undefined, result);
    });
    request.always(function (result) {

    });
    request.fail(function (XHR, textStatus, errorThrown) {
        console.log("Error! " + textStatus + ':' + errorThrown);
        //Create an Error Object
        var error = { responseText : XHR.responseText, status : XHR.statsus, statusText : XHR.statsusText };
        //Pass back the Error
        callback(error);
    });
};


ldrly.integration.rest.stats.leaderboard = function (statname, callback) {
    var self = this,
        endpoints = ldrly.config.getEndPoints(),
        url_base = endpoints.ldrly.url,
        url_resource = '/leaderboard/stat/' + statname,
        url = url_base + url_resource;

    var request = $.ajax(
        {
            url : url,
            type : 'GET',
            contentType : 'application/json; charset=utf-8',
            dataType : 'json',
            headers : {
                'Accept' : 'application/json'
            }
        }
    );

    request.done(function (result) {
        callback(undefined, result);
    });
    request.always(function (result) {

    });
    request.fail(function (XHR, textStatus, errorThrown) {
        console.log("Error! " + textStatus + ':' + errorThrown);
        //Create an Error Object
        var error = { responseText : XHR.responseText, status : XHR.statsus, statusText : XHR.statsusText };
        //Pass back the Error
        callback(error);
    });
};

