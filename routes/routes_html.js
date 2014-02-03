/**
 * Created with WebStorm.
 * Date: 2/3/2014
 * Time: 10:53 AM
 * @author Adam C. Nowak
 * @description
 */

/*jslint node: true */

"use strict";

//SIP required artifacts
var routing_error = require('../libs/utils/routing/routing_error'),
    env = require('../libs/config/endpoint.js'),
    TemplateData = require('../libs/template/templatedata'),
    template = require('../views/template'),
    MongoClient = require('mongodb').MongoClient,
    format = require('util').format;
//template = require('../views/template/template'),

//Include npm modules
var _ = require("underscore"),
    fs = require('fs'),
    Mustache = require('mustache'),
    S = require('string');

module.exports = function (app) {
    var error = Object.create(routing_error),
        templatedata = new TemplateData();

    /************************************************************
     *              HELPER FUNCTIONALITY
     *************************************************************/

    function logReqInfo(slug, resource, path, file) {
//        console.log("Requested element: " + slug);
//        console.log("Requested resource: " + resource);
//        console.log("Requested path: " + path);
//        console.log("Requested file: " + file);
    }

    function logReqHeader(req) {
        console.log("Request User Agent:" + JSON.stringify(req.headers['user-agent']));
        console.log("Request User:" + JSON.stringify(req.headers['user']));
        console.log("Request Cookie:" + JSON.stringify(req.headers['cookie']));
        console.log("Request Authorization:" + JSON.stringify(req.headers['authorization']));

        console.log("Request Header: " + JSON.stringify(req.headers));
        console.log("Request Body: " + JSON.stringify(req.body));

        console.log("Request Prarams:" + JSON.stringify(req.params));
        console.log("Request Cookies:" + JSON.stringify(req.headers['cookies']));
    }

    /************************************************************
     *  FUNCTIONALITY RELATED TO routing HTML content
     *************************************************************/
    app.get("*", function (req, res, next) {
        logReqHeader(req);

        next();
    });

    /* Root route before being sent to the next route */
    app.get('/', function (req, res) {
        //Setup the Data for the Mustache Template
        var data = templatedata.data.home,
            html,
            debug = req.query.debug;

        data.global = templatedata.data.global;
        //data.user = req.user;

        if (debug === "true") {
            res.cookie('userprofile', sampleSessionData, { maxAge: 900000, httpOnly: false});
        } else {
            res.cookie('userprofile', req.user, { maxAge: 900000, httpOnly: false});
        }

        html = Mustache.render(template.ldrly.home.page, data);
        res.send(html);
    });

    /************************************************
     *  Route definitions:                          *
     *      /index.html                             *
     *      /statistics/ - Statistics               *
     *      /users/ - Users                         *
     **************************************************/

    /************************************************************
     *  Routes that do not require authentication!              *
     *************************************************************/

    /* Test Route - Returns the configuration information for the Platform*/
    app.get('/configuration/', function (req, res) {
        var val = {'configuration': env.endpoint};
        res.send(val);
    });




    /************************************************************
     *  Routes that require authentication!                     *
     *************************************************************/

    /**
     * Route to display the index.html (Home Page)
     */
    app.get('/:slug', function (req, res, next) {
        var slug = [req.params.slug][0], // grab the page slug
            resource = req.params[0],
            path = 'app/',
            file = path + slug,
            html,
            params = req.params[0],
            data,
            debug = req.query.debug;

        logReqInfo(slug, resource, path, file);

        //Setup the Data for the Mustache Template
        data = templatedata.data.home;
        data.global = templatedata.data.global;
        //data.user = req.user;

        if (slug === 'index.html') {
            //Load up the Homepage template
            html = Mustache.render(template.ldrly.home.page, data);
            res.send(html);
        } else {
            next();
        }

    });

    /**
     * Route to display the statistics  (/statistics/index.html)
     */
    app.get('/statistics/:slug', function (req, res, next) {
        var slug = [req.params.slug][0], // grab the page slug
            resource = req.params[0],
            path = 'app/',
            file = path + slug,
            html,
            params = req.params[0],
            data,
            debug = req.query.debug;

        logReqInfo(slug, resource, path, file);

        //Setup the Data for the Mustache Template
        data = templatedata.data.ipp;
        data.global = templatedata.data.global;
        //data.user = req.user;

        if (slug === 'index.html') {
            //Render the GitHub Template Page
            html = Mustache.render(template.ldrly.stats.page, data);
            res.send(html);
        } else {
            next();
        }

    });

//    /**
//     * Route to display the Leaderboard Statistics (/statistics/index.html)
//     */
//    app.get('/statistics/:slug', function (req, res, next) {
//        var slug = [req.params.slug][0], // grab the page slug
//            resource = req.params[0],
//            path = 'app/',
//            file = path + slug,
//            html,
//            params = req.params[0],
//            data,
//            debug = req.query.debug;
//
//        logReqInfo(slug, resource, path, file);
//
//        //Setup the Data for the Mustache Template
//        data = templatedata.data.ipp;
//        data.global = templatedata.data.global;
//        //data.user = req.user;
//
//        if (slug === 'index.html') {
//            //Render the IPP Template Page
//            html = Mustache.render(template.ldrly.ipp.page, data);
//            res.send(html);
//        } else {
//            next();
//        }
//
//    });
//
//    /**
//     * Route to display the Users (/users/index.html)
//     */
//    app.get('/users/:slug', function (req, res, next) {
//        var slug = [req.params.slug][0], // grab the page slug
//            resource = req.params[0],
//            path = 'app/',
//            file = path + slug,
//            html,
//            params = req.params[0],
//            data,
//            debug = req.query.debug;
//
//        logReqInfo(slug, resource, path, file);
//
//        //Setup the Data for the Mustache Template
//        data = templatedata.data.config;
//        data.global = templatedata.data.global;
//        //data.user = req.user;
//
//        if (slug === 'index.html') {
//            //Render the IPP Template Page
//            html = Mustache.render(template.ldrly.uam.page, data);
//            res.send(html);
//        } else {
//            next();
//        }
//
//    });
};
