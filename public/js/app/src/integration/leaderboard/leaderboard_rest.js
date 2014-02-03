/**
 * Created with WebStorm.
 * Date: 2/3/2014
 * Time: 12:24 PM
 * @author Adam C. Nowak
 * @description
 */

/*jslint browser: true */
/*jslint devel: true */
/*jslint nomen: true */
/*global $, jQuery, _, ko, Mustache */
/*global ldrly, ui */
"use strict";

ldrly.integration.rest.leaderboard = {};
ldrly.integration.rest.leaderboard.assign = {};
ldrly.integration.rest.leaderboard.unassign = {};

ldrly.integration.rest.leaderboard.create = function (data, callback) {
    var self = this,
        endpoints = ldrly.config.getEndPoints(),
        url_base = endpoints.ldrly.url,
        url_resource = '/profile/user/',
        url = url_base + url_resource;
//        username = data.username,
//        password = data.password;

//    function basicAuth(xhr) {
//        var auth = 'Basic ' + window.btoa(username + ":" + password);
//        xhr.setRequestHeader('Authorization', auth);
//    }

    var request = $.ajax(
        {
            url : url,
            type : 'POST',
//            beforeSend: basicAuth,
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
        var error = { responseText : XHR.responseText, status : XHR.leaderboardus, statusText : XHR.leaderboardusText };
        //Pass back the Error
        callback(error);
    });
};

ldrly.integration.rest.leaderboard.retrieve = function (id, callback) {
    var self = this,
        endpoints = ldrly.config.getEndPoints(),
        url_base = endpoints.ldrly.url,
        url_resource = '/profile/user/' + id,
        url = url_base + url_resource;
//        username = data.username,
//        password = data.password;

//    function basicAuth(xhr) {
//        var auth = 'Basic ' + window.btoa(username + ":" + password);
//        xhr.setRequestHeader('Authorization', auth);
//    }

    var request = $.ajax(
        {
            url : url,
            type : 'GET',
//            beforeSend: basicAuth,
//            data : JSON.stringify(data),
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
        var error = { responseText : XHR.responseText, status : XHR.leaderboardus, statusText : XHR.leaderboardusText };
        //Pass back the Error
        callback(error);
    });
};

ldrly.integration.rest.leaderboard.list = function (callback) {
    var self = this,
        endpoints = ldrly.config.getEndPoints(),
        url_base = endpoints.ldrly.url,
        url_resource = '/profile/user/',
        url = url_base + url_resource;
//        username = data.username,
//        password = data.password;

//    function basicAuth(xhr) {
//        var auth = 'Basic ' + window.btoa(username + ":" + password);
//        xhr.setRequestHeader('Authorization', auth);
//    }

    var request = $.ajax(
        {
            url : url,
            type : 'GET',
//            beforeSend: basicAuth,
//            data : JSON.stringify(data),
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
        var error = { responseText : XHR.responseText, status : XHR.leaderboardus, statusText : XHR.leaderboardusText };
        //Pass back the Error
        callback(error);
    });
};

ldrly.integration.rest.leaderboard.update = function (id, data, callback) {
    var self = this,
        endpoints = ldrly.config.getEndPoints(),
        url_base = endpoints.ldrly.url,
        url_resource = '/profile/user/' + id,
        url = url_base + url_resource;
//        username = data.username,
//        password = data.password;

//    function basicAuth(xhr) {
//        var auth = 'Basic ' + window.btoa(username + ":" + password);
//        xhr.setRequestHeader('Authorization', auth);
//    }

    var request = $.ajax(
        {
            url : url,
            type : 'PUT',
//            beforeSend: basicAuth,
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
        var error = { responseText : XHR.responseText, status : XHR.leaderboardus, statusText : XHR.leaderboardusText };
        //Pass back the Error
        callback(error);
    });
};

ldrly.integration.rest.leaderboard.password = function (id, data, callback) {
    var self = this,
        endpoints = ldrly.config.getEndPoints(),
        url_base = endpoints.ldrly.url,
        url_resource = '/profile/user/' + id + '/password/',
        url = url_base + url_resource;
//        username = data.username,
//        password = data.password;

//    function basicAuth(xhr) {
//        var auth = 'Basic ' + window.btoa(username + ":" + password);
//        xhr.setRequestHeader('Authorization', auth);
//    }

    var request = $.ajax(
        {
            url : url,
            type : 'PUT',
//            beforeSend: basicAuth,
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
        var error = { responseText : XHR.responseText, status : XHR.leaderboardus, statusText : XHR.leaderboardusText };
        //Pass back the Error
        callback(error);
    });
};

ldrly.integration.rest.leaderboard.destroy = function (id, callback) {
    var self = this,
        endpoints = ldrly.config.getEndPoints(),
        url_base = endpoints.ldrly.url,
        url_resource = '/profile/user/' + id,
        url = url_base + url_resource;
//        username = data.username,
//        password = data.password;

//    function basicAuth(xhr) {
//        var auth = 'Basic ' + window.btoa(username + ":" + password);
//        xhr.setRequestHeader('Authorization', auth);
//    }

    var request = $.ajax(
        {
            url : url,
            type : 'DELETE',
//            beforeSend: basicAuth,
//            data : JSON.stringify(data),
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
        var error = { responseText : XHR.responseText, status : XHR.leaderboardus, statusText : XHR.leaderboardusText };
        //Pass back the Error
        callback(error);
    });
};

ldrly.integration.rest.leaderboard.assign.position = function (id, ppid, callback) {
    var self = this,
        endpoints = ldrly.config.getEndPoints(),
        url_base = endpoints.ldrly.url,
        url_resource = '/profile/user/' + id + '/assign/profile/position/' + ppid,
        url = url_base + url_resource;
//        username = data.username,
//        password = data.password;

//    function basicAuth(xhr) {
//        var auth = 'Basic ' + window.btoa(username + ":" + password);
//        xhr.setRequestHeader('Authorization', auth);
//    }

    var request = $.ajax(
        {
            url : url,
            type : 'POST',
//            beforeSend: basicAuth,
//            data : JSON.stringify(data),
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
        var error = { responseText : XHR.responseText, status : XHR.leaderboardus, statusText : XHR.leaderboardusText };
        //Pass back the Error
        callback(error);
    });
};

ldrly.integration.rest.leaderboard.unassign.position = function (id, ppid, callback) {
    var self = this,
        endpoints = ldrly.config.getEndPoints(),
        url_base = endpoints.ldrly.url,
        url_resource = '/profile/user/' + id + '/assign/profile/position/' + ppid,
        url = url_base + url_resource;
//        username = data.username,
//        password = data.password;

//    function basicAuth(xhr) {
//        var auth = 'Basic ' + window.btoa(username + ":" + password);
//        xhr.setRequestHeader('Authorization', auth);
//    }

    var request = $.ajax(
        {
            url : url,
            type : 'DELETE',
//            beforeSend: basicAuth,
//            data : JSON.stringify(data),
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
        var error = { responseText : XHR.responseText, status : XHR.leaderboardus, statusText : XHR.leaderboardusText };
        //Pass back the Error
        callback(error);
    });
};