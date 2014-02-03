/**
 * Created with WebStorm.
 * Date: 2/3/2014
 * Time: 11:52 AM
 * @author Adam C. Nowak
 * @description
 */

ui.template.ldrly.stats = {};

ui.template.ldrly.stats.column =
//    "<div class='text-center span12 well'>" +
    "<div class='text-center col-md-12'>" +
        "<div class='page-header'>" +
        "<h1>{{title}} <small>({{acronym}})</small></h1>" +
        "</div>" +
        "{{#description}}" +
        "<p>{{.}}</p>" +
        "{{/description}}" +
        "</div>";

ui.template.ldrly.stats.content =
    "<div id='columns' class='container-fluid'>" +
        "<div class='row'>" +
        ui.template.ldrly.error +
        "</div>" +
        "<div class='row content home'>" +
        ui.template.ldrly.layout.onecolumn.column +
        "</div>" +
        "</div>";

ui.template.ldrly.stats.head = ui.template.global.page.head;

ui.template.ldrly.stats.body =
    "<body>" +
        ui.template.global.menuNoStatus +
        ui.template.ldrly.layout.onecolumn.content +
        ui.template.global.footer +
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
        "</body>";

ui.template.ldrly.stats.page =
    "<!DOCTYPE html>" +
        "<html>" +
        ui.template.ldrly.layout.onecolumn.head +
        ui.template.ldrly.layout.onecolumn.body +
        "</html>";

