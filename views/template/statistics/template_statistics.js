/**
 * Created with WebStorm.
 * Date: 2/3/2014
 * Time: 11:52 AM
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
 Mustache template for LDRLY Home Page
 ============================================= */

//ui.template.ldrly.stats = {};
//ui.template.ldrly.stats.page = ui.template.ldrly.layout.onecolumn.page;

ui.template.ldrly.stats = {};
ui.template.ldrly.stats.leaderboard = {};

ui.template.ldrly.stats.leaderboard.create =
    '<table class="table table-striped well">' +
        '<thead>' +
            '<tr class="text-center">' +
                '<th>Username</th>' +
                '<th>Stat Name</th>' +
                '<th>Stat Value</th>' +
                '<th></th>' +
            '</tr>' +
        '</thead>' +
        '<tbody>' +
            '<tr>' +
                '<td>' +
                    '<input id="username" type="text" class="form-control" data-type="value: username" placeholder="e.g. player0" required>' +
                '</td>' +
                '<td>' +
                    '<input id="statname" type="text" class="form-control" data-type="value: statname" placeholder="e.g. coins_earned" required>' +
                '</td>' +
                '<td>' +
                    '<input id="statvalue" type="number" class="form-control" data-type="value: statvalue" placeholder="e.g. 456" required>' +
                '</td>' +
                '<td>' +
                    '<button type="button" data-bind="click: setUserStat" class="btn btn-default">' +
                        '<span class="glyphicon glyphicon-user">Set Stat</span>' +
                    '</button>' +
                '</td>' +
            '</tr>' +
        '</tbody>' +
    '</table>' +
    '<!-- ko if: state() === 1 -->' +
        '<div class="well">' +
            '<p data-bind="text: response"></p>' +
        '</div>' +
//        '<table class="table table-striped well">' +
//            '<thead>' +
//                '<tr>' +
//                    '<th>Stat Name</th>' +
//                    '<th>Stat Value</th>' +
//                '</tr>' +
//            '</thead>' +
//            '<tbody data-bind="foreach: userstats()">' +
//                '<tr>' +
//                    '<td>' +
//                        '<div data-bind="text: name"></div>' +
//                    '</td>' +
//                    '<td>' +
//                        '<div data-bind="text: value"></div>' +
//                    '</td>' +
//                '</tr>' +
//            '</tbody>' +
//        '</table>' +
    '<!-- /ko -->';;

ui.template.ldrly.stats.leaderboard.content =
    ui.template.ldrly.stats.leaderboard.create;


ui.template.ldrly.stats.column =
    "<div class='text-center'>" +
        "<div class='page-header'>" +
            "<h1>{{title}} <small>({{acronym}})</small></h1>" +
        "</div>" +
        "{{#description}}" +
        "<p>{{.}}</p>" +
        "{{/description}}" +
        ui.template.ldrly.stats.leaderboard.content +
    "</div>";

ui.template.ldrly.stats.content =
    "<script>" +
        "jQuery(document).ready(function(){" +
        '   var viewModel = new ldrly.viewmodel.Statistics(); ' +
        '   ko.applyBindings(viewModel); ' +
        '});' +
    "</script>" +
    "<div id='columns' class='container'>" +
        "<div class='row'>" +
            ui.template.ldrly.error +
        "</div>" +
        "<div class='row content home'>" +
            ui.template.ldrly.stats.column +
        "</div>" +
    "</div>";

ui.template.ldrly.stats.head = ui.template.global.page.head;

ui.template.ldrly.stats.body =
    "<body>" +
        "<!-- Global Libs-->" +
        "{{#global.libs}}" +
        "<script src='{{{src}}}'></script>" +
        "{{/global.libs}}" +
        "<!-- /Global Libs-->" +
        "<!-- Local Libs-->" +
        "{{#libs}}" +
        "<script src='{{{src}}}'></script>" +
        "{{/libs}}" +
        "<!-- /Local Libs-->" +
        ui.template.global.menuNoStatus +
        ui.template.ldrly.stats.content +
        ui.template.global.footer +
    "</body>";

ui.template.ldrly.stats.page =
    "<!DOCTYPE html>" +
        "<html>" +
            ui.template.ldrly.stats.head +
            ui.template.ldrly.stats.body +
        "</html>";

