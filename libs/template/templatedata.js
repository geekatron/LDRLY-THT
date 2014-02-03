/**
 * Created with WebStorm.
 * Date: 2/3/2014
 * Time: 2:53 AM
 * @author Adam C. Nowak
 * @description
 */

/*jslint node: true */
/*jslint browser: true */
/*jslint devel: true */
/*jslint nomen: true */
/*global $, jQuery, _, ko, Mustache */
/*global sip */
"use strict";

//Required modules
var fs = require('fs'),
    _ = require('underscore');

function Template() {

};
//function Template() {
//    var self = this,
//        data_global_loc = "views/data/global.json",
//        data_page_loc = {
//            "auth" : "views/data/login.json",
//            "error" : "views/data/error.json",
//            //Customizable Template Sections
//            "admin" : "views/data/admin.json",
//            "config" : "views/data/config.json",
//            "home" : "views/data/home.json",
//            "ipp" : "views/data/interviewprepprofile.json",
//            "signup" : "views/data/signup.json",
//            "admin_cp" : "views/data/admin_cp.json",
//            "admin_config" : "views/data/admin_config.json",
//            "admin_ep" : "views/data/admin_ep.json",
//            "admin_pp" : "views/data/admin_pp.json",
//            "admin_mp" : "views/data/admin_mp.json",
//            "admin_uam" : "views/data/admin_uam.json"
//        };
//
//    self.data = {};
//
//    (function () {
//        function handleGlobalDataResponse(err, data) {
//            if (!_.isUndefined(err) && !_.isNull(err)) {
//                //Handle error
//                console.log("ERR: Couldn't find global data!");
//            } else {
//                self.data.global = JSON.parse(data);
//            }
//        }//END handleGlobalDataResponse
//
//        function handleAuthenticationDataResponse(err, data) {
//            if (!_.isUndefined(err) && !_.isNull(err)) {
//                //Handle error
//                console.log("ERR: Couldn't find authenticated data!");
//            } else {
//                self.data.auth = JSON.parse(data);
//            }
//        }//END handleReportAnalyticsDataResponse
//
//        function handleErrorDataResponse(err, data) {
//            if (!_.isUndefined(err) && !_.isNull(err)) {
//                //Handle error
//                console.log("ERR: Couldn't find error data!");
//            } else {
//                self.data.error = JSON.parse(data);
//            }
//        }//END handleReportAnalyticsDataResponse
//
//        function handleHomeDataResponse(err, data) {
//            if (!_.isUndefined(err) && !_.isNull(err)) {
//                //Handle error
//                console.log("ERR: Couldn't find home data!");
//            } else {
//                self.data.home = JSON.parse(data);
//            }
//        }//END handleGlobalDataResponse
//
//        function handleInterviewPrepProfileDataResponse(err, data) {
//            if (!_.isUndefined(err) && !_.isNull(err)) {
//                //Handle error
//                console.log("ERR: Couldn't find Interview Prep Profile data!");
//            } else {
//                self.data.ipp = JSON.parse(data);
//            }
//        }//END handleInterviewPrepProfileDataResponse
//
//        function handleAdminDataResponse(err, data) {
//            if (!_.isUndefined(err) && !_.isNull(err)) {
//                //Handle error
//                console.log("ERR: Couldn't find Admin data!");
//            } else {
//                self.data.admin = JSON.parse(data);
//            }
//        }//END handleAdminDataResponse
//
//        function handleSignUpDataResponse(err, data) {
//            if (!_.isUndefined(err) && !_.isNull(err)) {
//                //Handle error
//                console.log("ERR: Couldn't find Sign Up data!");
//            } else {
//                self.data.signup = JSON.parse(data);
//            }
//        }//END handleSignUpDataResponse
//
//        function handleConfigDataResponse(err, data) {
//            if (!_.isUndefined(err) && !_.isNull(err)) {
//                //Handle error
//                console.log("ERR: Couldn't find Configuration data!");
//            } else {
//                self.data.config = JSON.parse(data);
//            }
//        }//END handleConfigDataResponse
//
//        function handleAdminCPDataResponse(err, data) {
//            if (!_.isUndefined(err) && !_.isNull(err)) {
//                //Handle error
//                console.log("ERR: Couldn't find Admin data!");
//            } else {
//                self.data.admin_cp = JSON.parse(data);
//            }
//        }//END handleAdminCPDataResponse
//
//        function handleAdminEPDataResponse(err, data) {
//            if (!_.isUndefined(err) && !_.isNull(err)) {
//                //Handle error
//                console.log("ERR: Couldn't find Admin data!");
//            } else {
//                self.data.admin_ep = JSON.parse(data);
//            }
//        }//END handleAdminEPDataResponse
//
//        function handleAdminPPDataResponse(err, data) {
//            if (!_.isUndefined(err) && !_.isNull(err)) {
//                //Handle error
//                console.log("ERR: Couldn't find Admin data!");
//            } else {
//                self.data.admin_pp = JSON.parse(data);
//            }
//        }//END handleAdminPPDataResponse
//
//        function handleAdminMPDataResponse(err, data) {
//            if (!_.isUndefined(err) && !_.isNull(err)) {
//                //Handle error
//                console.log("ERR: Couldn't find Admin data!");
//            } else {
//                self.data.admin_mp = JSON.parse(data);
//            }
//        }//END handleAdminMPDataResponse
//
//        function handleAdminUAMDataResponse(err, data) {
//            if (!_.isUndefined(err) && !_.isNull(err)) {
//                //Handle error
//                console.log("ERR: Couldn't find Admin data!");
//            } else {
//                self.data.admin_uam = JSON.parse(data);
//            }
//        }//END handleAdminUAMDataResponse
//
//        function handleAdminConfigDataResponse(err, data) {
//            if (!_.isUndefined(err) && !_.isNull(err)) {
//                //Handle error
//                console.log("ERR: Couldn't find Admin Config data!");
//            } else {
//                self.data.admin_config = JSON.parse(data);
//            }
//        }//END handleAdmihandleAdminConfigDataResponsenUAMDataResponse
//
//        //Load the Global Data
//        fs.readFile(data_global_loc, "utf8", handleGlobalDataResponse);
//        //Load the Page specific Data
//        fs.readFile(data_page_loc.auth, "utf8", handleAuthenticationDataResponse);
//        fs.readFile(data_page_loc.error, "utf8", handleErrorDataResponse);
//        fs.readFile(data_page_loc.home, "utf8", handleHomeDataResponse);
//        fs.readFile(data_page_loc.ipp, "utf8", handleInterviewPrepProfileDataResponse);
//        fs.readFile(data_page_loc.admin, "utf8", handleAdminDataResponse);
//        fs.readFile(data_page_loc.signup, "utf8", handleSignUpDataResponse);
//        fs.readFile(data_page_loc.config, "utf8", handleConfigDataResponse);
//
//        fs.readFile(data_page_loc.admin_config, "utf8", handleAdminConfigDataResponse);
//        fs.readFile(data_page_loc.admin_cp, "utf8", handleAdminCPDataResponse);
//        fs.readFile(data_page_loc.admin_ep, "utf8", handleAdminEPDataResponse);
//        fs.readFile(data_page_loc.admin_pp, "utf8", handleAdminPPDataResponse);
//        fs.readFile(data_page_loc.admin_mp, "utf8", handleAdminMPDataResponse);
//        fs.readFile(data_page_loc.admin_uam, "utf8", handleAdminUAMDataResponse);
//    })()
//}
//
//var data = {},
//    templates = {};


module.exports = Template;