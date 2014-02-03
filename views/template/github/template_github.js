/**
 * Created with WebStorm.
 * Date: 2/3/2014
 * Time: 1:55 PM
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
 Mustache template for GitHub Page
 ============================================= */

ui.template.ldrly.github = {};


ui.template.ldrly.github.column =
    "<div class='text-center'>" +
        "<div class='page-header'>" +
        "<h1>{{title}} <small>({{acronym}})</small></h1>" +
        "</div>" +
        "{{#description}}" +
        "<p>{{.}}</p>" +
        "{{/description}}" +
        //GitHub Iframe
        '<iframe src="http://github.com/geekatron/LDRLY-THT"></iframe>' +
        "</div>";

ui.template.ldrly.github.content =
        "<div id='columns' class='container'>" +
        "<div class='row'>" +
        ui.template.ldrly.error +
        "</div>" +
        "<div class='row content home'>" +
        ui.template.ldrly.github.column +
        "</div>" +
        "</div>";

ui.template.ldrly.github.head = ui.template.global.page.head;

ui.template.ldrly.github.body =
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
        ui.template.ldrly.github.content +
        ui.template.global.footer +
        "</body>";

ui.template.ldrly.github.page =
    "<!DOCTYPE html>" +
        "<html>" +
        ui.template.ldrly.github.head +
        ui.template.ldrly.github.body +
        "</html>";
