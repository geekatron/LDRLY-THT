/*! LDRLY-Leaderboard - v0.0.1 - 2014-02-03
* Copyright (c) 2014 ; Licensed  */
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
/*jslint browser: true */
/*jslint devel: true */
/*jslint nomen: true */
/*global $, jQuery, _, ko, Mustache */
/*global ldrly */
'use strict';

ldrly.util = {};

ldrly.util.getURL = function () {
    this.URL = window.location;
    console.log("URL: " + this.URL);
};

/**
 *
 * @param id
 * @param scale - Currently accepts %
 */
ldrly.util.setSize = function(id, scale) {
    var myWidth;
    var myHeight;

    if( _.isUndefined(scale) ) {
        var scale =
        {
            height : 1 ,
            width : 1
        };
    }

    if( typeof( window.innerWidth ) == 'number' ) {

        //Non-IE

        myWidth = window.innerWidth;
        myHeight = window.innerHeight;

    } else if( document.documentElement &&

        ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {

        //IE 6+ in 'standards compliant mode'

        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;

    } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {

        //IE 4 compatible

        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
    }

    myHeight = (myHeight - 5) * scale.height;
    myWidth = (myWidth - 5) * scale.width;
    document.getElementById(id).style.height = myHeight+'px';
    document.getElementById(id).style.width = myWidth+'px';
};

ldrly.util.setVideoSize = function(id, ele, scale) {
    var myWidth,
        myHeight,
        element;

    if( _.isUndefined(scale) ) {
        var scale =
        {
            height : 1 ,
            width : 1
        };
    }

    if( typeof( window.innerWidth ) == 'number' ) {

        //Non-IE

        myWidth = window.innerWidth;
        myHeight = window.innerHeight;

    } else if( document.documentElement &&

        ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {

        //IE 6+ in 'standards compliant mode'

        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;

    } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {

        //IE 4 compatible

        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
    }

    myHeight = (myHeight - 5) * scale.height;
    myWidth = (myWidth - 5) * scale.width;

    if( !_.isUndefined(id) ) {
        element = document.getElementById(id);
    } else {
        element = ele;
    }

//    element.height = myHeight+'px';
//    element.width = myWidth+'px';

//    element.videoHeight = myHeight+'px';
//    element.videoWidth = myWidth+'px';

    element.height = myHeight;
    element.width = myWidth;

    element.videoHeight = myHeight;
    element.videoWidth = myWidth;

};

ldrly.util.connected = false;

ldrly.util.isOnline = function() {
    setTimeout(ldrly.util.isOnline, 5000);

    if (navigator.onLine){
        console.log('Internet connected!');

        //Check to see if it was disconnected
        if(ldrly.util.connected == false) {
            //Restart the application
            ldrly.util.restart();
        }

        ldrly.util.connected = true;

    } else {
        console.log('Internet disconnected!');
        ldrly.util.connected = false;
    }
};

ldrly.util.restart = function() {

    //Restart the promotion application
    if( scd.profile.application == ice.p.profile.application.marketing.campaign_management.promotion ) {
        ldrly.promotion.generatePlaylist();
    }

    if( scd.profile.application == "report" ) {
        //Restart the report application
        loadUserApplicationProfile();
    }
};

ldrly.util.uuid = {};
ldrly.util.uuid.v4 = {};

/**
 * Create and return a "version 4" RFC-4122 UUID string.
 */
ldrly.util.uuid.v4.random = function randomUUID() {
    var s = [], itoh = '0123456789ABCDEF';

    // Make array of random hex digits. The UUID only has 32 digits in it, but we
    // allocate an extra items to make room for the '-'s we'll be inserting.
    for (var i = 0; i <36; i++) s[i] = Math.floor(Math.random()*0x10);

    // Conform to RFC-4122, section 4.4
    s[14] = 4;  // Set 4 high bits of time_high field to version
    s[19] = (s[19] & 0x3) | 0x8;  // Specify 2 high bits of clock sequence

    // Convert to hex chars
    for (var i = 0; i <36; i++) s[i] = itoh[s[i]];

    // Insert '-'s
    s[8] = s[13] = s[18] = s[23] = '-';

    return s.join('');
};

/**
 * Encoding & Decoding of UTF-8 strings
 */
ldrly.util.encode = function (data, callback) {
    var encoded = null;

    console.log('@encode');
    console.log(data);

    //Check to see if data has been provided
    if ( !_.isNull(data) && !_.isUndefined(data) ) {
        encoded = encodeURIComponent(data);
    } else {
        encoded = data;
    }

    //Check to see if synchronous or asynchronous operations
    if (_.isNull(callback) || _.isUndefined(callback) ) {
        return encoded;
    } else {
        callback(undefined, encoded);
    }

};

ldrly.util.decode = function (data, callback) {
    var decoded = data;

    console.log('@decode');
    console.log(data);

    //Check to see if data has been provided
    if ( !_.isNull(data) && !_.isUndefined(data) ) {
        if (_.indexOf(data, '%') > -1) {
            decoded = decodeURIComponent(data);
        }
    }

    //Check to see if synchronous or asynchronous operations
    if (_.isNull(callback) || _.isUndefined(callback) ) {
        return decoded;
    } else {
        callback(undefined, decoded);
    }
};

/**
 * Utitilites related to Date & Time
 */

ldrly.util.date = {};
ldrly.util.time = {};

ldrly.util.date.currentYear = function () {
    //Return the full date - 4 digits e.g. 2014
    return new Date().getFullYear();
};

/**
 * Hide & Show the left hand column
 */
ldrly.util.hide = {};
ldrly.util.show = {};

ldrly.util.hide.left = function () {
    $('#leftside').hide('slow', 'swing', function() {
//        $('hideColumn').hide('fast', 'swing');
//        $('expandColumn').show('fast', 'swing');

//        $('#leftside').removeClass('span3').addClass('span0');
        $('#contentData').removeClass('span9').addClass('span11');

//        $('#leftside').removeClass('span3').addClass('span1');
//        $('#contentData').removeClass('span9').addClass('span11');
    });

//    $('#leftside').animate({
//        left: "-=100",
//        easing : 'swing'
//        },
//        5000,
//        function() {
//            $('hideColumn').hide('fast', 'swing');
//            $('expandColumn').show('fast', 'swing');
//
//            $('#leftside').removeClass('span3').addClass('span1');
//            $('#contentData').removeClass('span9').addClass('span11');
//        }
//    );
};

ldrly.util.show.left = function() {
    $('#leftside').show('slow', 'swing', function() {
//        $('hideColumn').show('fast', 'swing');
//        $('expandColumn').hide('fast', 'swing');

//        $('#leftside').removeClass('span1').addClass('span3');
//        $('#contentData').removeClass('span11').addClass('span9');
//        $('#leftside').removeClass('span0').addClass('span3');
        $('#contentData').removeClass('span11').addClass('span9');
    });
};

ldrly.util.getUserFromSession = function() {
    var userprofile = jaaulde.utils.cookies.get('userprofile');
    userprofile = JSON.parse(userprofile.slice(2));
    return userprofile;
};

ldrly.util.getUseRoles = function() {
    //Retrieve the User Account details from the session
    var userprofile = jaaulde.utils.cookies.get('userprofile');
    userprofile = JSON.parse(userprofile.slice(2));
    return userprofile.role;
};

ldrly.util.role = {};
ldrly.util.role.isAdmin = function() {
    //Retrieve the User Account details from the session
    var userprofile = jaaulde.utils.cookies.get('userprofile');
    userprofile = JSON.parse(userprofile.slice(2));

    if(_.indexOf(userprofile.role, 'Admin') > -1) {
        return true
    } else {
        return false;
    }
};

ldrly.util.role.isTalentManager = function() {
    //Retrieve the User Account details from the session
    var userprofile = jaaulde.utils.cookies.get('userprofile');
    userprofile = JSON.parse(userprofile.slice(2));

    if(_.indexOf(userprofile.role, 'Talent-Manager') > -1) {
        return true
    } else {
        return false;
    }
};

ldrly.util.placeMultimediaVideo = function (data) {
    var src = null,
        wHeight = 0,
        scaledHeight = 0;

    //Set the current SRC - Embeded video address
    src = decodeURIComponent(data);

    //Compute the height of the current Window
    wHeight = $(window).height(); //window.innerHeight
    //Compute the scaled height - 80%
    scaledHeight = wHeight * 0.8;

    //Create the HTML code for the iframe taking into account the height and width
    src = '<iframe src="' + src + '" width="100%" height="' + scaledHeight + 'px" frameborder="0" allowfullscreen></iframe>';

    return src;
};

/**
 * Determine how to decode the data based on the element type.
 * @param type - Type of element, SPAN, DIV, etc.
 * @param element - The DOM element
 * @param value - The value to update.
 */
ldrly.util.determineDecodeElementAction = function (type, element, value) {
    //Use switch to handle the cases
    switch (type) {
        //Elements utilizing elementvalue
        case "input":
            element.value = value;
            break;
        case 'select':
            element.value = value;
            break;
        case 'textarea':
            element.value = value;
            break;
        //Elements utilizing element.innerHTML
        case 'a':
            element.innerHTML = value;
            break;
        case 'div':
            element.innerHTML = value;
            break;
        case 'em':
            element.innerHTML = value;
            break;
        case 'li':
            element.innerHTML = value;
            break;
        case 'span':
            element.innerHTML = value;
            break;
        case 'td':
            element.innerHTML = value;
            break;
    };
};

/* KNOCKOUT BINDINGS */

ko.bindingHandlers.decode = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        // This will be called when the binding is first applied to an element
        // Set up any initial state, event handlers, etc. here
        console.log('@decodeHandlerInit');

        //2014.01.19 - Updating binding handler to update the innerHTML or value depending on the type of element
        var decoded = ldrly.util.decode(valueAccessor()),
            elemType = element.nodeName.toLowerCase();

        ldrly.util.determineDecodeElementAction(elemType, element, decoded);
    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        // This will be called once when the binding is first applied to an element,
        // and again whenever the associated observable changes value.
        // Update the DOM element based on the supplied values here.
        console.log('@decodeHandlerUpdate');

        //2014.01.19 - Updating binding handler to update the innerHTML or value depending on the type of element
        var decoded = ldrly.util.decode(valueAccessor()),
            elemType = element.nodeName.toLowerCase();

        ldrly.util.determineDecodeElementAction(elemType, element, decoded);
    }
};

//(function (ko, CKEDITOR) {
//    CKEDITOR.disableAutoInline = true;
//    ko.bindingHandlers.inlineCkeditor = {
//        counter: 0,
//        prefix: '__cked_',
//        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
//            if (!element.id) {
//                element.id = ko.bindingHandlers.inlineCkeditor.prefix + (++ko.bindingHandlers.inlineCkeditor.counter);
//            }
//            var options = allBindingsAccessor().ckeditorOptions || {};
//            var ckUpdate = allBindingsAccessor().ckUpdate || function () { };
//
//            // Override the normal CKEditor save plugin
//
//            CKEDITOR.plugins.registered['save'] =
//            {
//                init: function (editor) {
//                    editor.addCommand('save',
//                        {
//                            modes: { wysiwyg: 1, source: 1 },
//                            exec: function (editor) {
//                                var ckValue = editor.getData();
//                                if (editor.checkDirty()) {
//                                    var self = valueAccessor();
//                                    if (ko.isWriteableObservable(self) && (ko.utils.unwrapObservable(self) !==ckValue)) {
//                                        valueAccessor()(ckValue);
//                                    }
//
//                                    editor.resetDirty();
//                                }
//                                ckUpdate.call(ckValue);
//                                ckValue = null;
//                            }
//                        }
//                    );
//                    editor.ui.addButton('Save', { label: 'Save', command: 'save', toolbar: 'document' });
//                }
//            };
//
//            options.on = {
//                instanceReady: function (e) {
//
//                },
//                blur: function (e) {
//                    var ckValue = e.editor.getData();
//                    if (e.editor.checkDirty()) {
//
//                        var self = valueAccessor();
//                        if (ko.isWriteableObservable(self) && (ko.utils.unwrapObservable(self) !==ckValue)) {
//                            self(ckValue);
//                        }
//
//                        e.editor.resetDirty();
//                    }
//                    ckUpdate.call(ckValue);
//                    ckValue = null;
//                }
//            };
//            options.floatSpaceDockedOffsetY = 0;
//            options.extraPlugins = 'sourcedialog';
//            options.removePlugins = 'sourcearea';
//
//            var editor = CKEDITOR.inline(element, options);
//
//            //handle destroying
//            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
//
//                var existingEditor = CKEDITOR.instances && CKEDITOR.instances[element.id];
//                if (existingEditor) {
//                    existingEditor.destroy(true);
//                }
//
//            });
//
//        },
//        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
//            //handle programmatic updates to the observable
//            var value = ko.utils.unwrapObservable(valueAccessor()),
//                existingEditor = CKEDITOR.instances && CKEDITOR.instances[element.id];
//
//            if (existingEditor) {
//                if (value !== existingEditor.getData()) {
//                    existingEditor.setData(value, function () {
//                        this.checkDirty(); // true
//                    });
//
//                }
//            }
//
//        }
//
//    };
//
//})(ko, CKEDITOR);
/*jslint browser: true */
/*jslint devel: true */
/*jslint nomen: true */
/*global $, jQuery, _, ko, Mustache */
/*global ldrly */
"use strict";

//ldrly.m.template = {};
var ui = {};
ui.template = {};
ui.template.ldrly = {};

ui.template.ldrly.error = {};

ui.template.global = {};
ui.template.global.modal = {};
ui.template.global.modal.error = {};

/*jslint browser: true */
/*jslint devel: true */
/*jslint nomen: true */
/*global $, jQuery, _, ko, Mustache */
/*global ldrly */
"use strict";

/* ********************** */
/*  TEMPLATE Scaffolding  */
/* ********************** */
ui.template.global = {};

ui.template.global.libs = {};
ui.template.global.style = {};

ui.template.global.page = {};
ui.template.global.page.head = {};
ui.template.global.page.body = {};

ui.template.global.menu = {};
ui.template.global.breadcrumbs = {};
ui.template.global.home = {};
ui.template.global.footer = {};

ui.template.global.modal = {};
ui.template.global.modal.error = {};
ui.template.global.modal.error.xhr = {};

ui.template.ldrly.error = {};

ui.template.ldrly.error =
    '<div id="status" class="container-fluid hide">' +
        //Progress Bar
        '<div class="row-fluid span12">' +
        '<div id="progress" class="progress progress-striped active closable">' +
        '<div id="progress-bar" class="bar" style="width: 0%;" ></div>' +
        '</div>' +
        '</div>' +
        //Error Message
        '<div id="error-alert" class="alert alert-block alert-error fade in hide closable">' +
        //'<button type="button" class="close" data-dismiss="alert">×</button>' +
//            '<button type="button" class="close" data-hide="alert">×</button>' +
    //'<button type="button" class="close" data-hide="alert" data-bind="click: ldrly.viewmodel.helper.hideStatus">×</button>' +
    '<button type="button" class="close" data-hide="closable" data-bind="click: ldrly.viewmodel.helper.hideStatus">×</button>' +
    '<h4 class="alert-heading">Error!!!</h4>' +
    '<p id="error-alert-msg">The operation has failed! Please try again later.</p>' +
    '</div>' +
    //Success Message
    '<div id="success-alert" class="alert alert-block alert-success fade in hide closable">' +
//            '<button type="button" class="close" data-hide="alert">×</button>' +
    //        '<button type="button" class="close" data-dismiss="alert" data-bind="click: ldrly.viewmodel.helper.hideStatus">×</button>' +
    //'<button type="button" class="close" data-hide="alert" data-bind="click: ldrly.viewmodel.helper.hideStatus()">×</button>' +
    //        '<a href="#" class="btn btn-small" data-bind="click: ldrly.viewmodel.helper.hideStatus">×</a>' +
    //'<button type="button" class="close" data-hide="alert" data-bind="click: ldrly.viewmodel.helper.hideStatus">×</button>' +
    '<button type="button" class="close" data-hide="closable" data-bind="click: ldrly.viewmodel.helper.hideStatus">×</button>' +
    '<h4 class="alert-heading">Success!</h4>' +
    '<p id="success-alert-msg">The operation has performed successfully.</p>' +
    '</div>' +

    '</div>';

/*            Global LDRLY Template
 ================================================== */

/* Global Mustache template for LDRLY */

ui.template.global.style =
    "<!-- Global Styles-->" +
        "{{#global.style}}" +
        "<link href='{{{href}}}' rel='{{rel}}' media='{{media}}'>" +
        "{{/global.style}}" +
        "<!-- /Global Styles-->" +
        "<!-- Local Styles-->" +
        "{{#style}}" +
        "<link href='{{{href}}}' rel='{{rel}}' media='{{media}}'>" +
        "{{/style}}" +
        "<!-- /Local Styles-->";

ui.template.global.page.head =
    "<head>" +
        "<title>{{title}}</title>" +
        "<link rel='shortcut icon' href='/img/favicon/ldrly_ico.ico' type='image/x-icon' />" +
        "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
        "<meta http-equiv='Content-Type' content='text/html;charset=utf-8'>" +
        ui.template.global.style +
    "</head>";

ui.template.global.menuNoStatus =
    '<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">' +
        '<div class="container>' +
            '<div class="navbar-header">' +
                '<!-- Responsive Navbar Part 1: Button for triggering responsive navbar.  -->' +
                '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">' +
                    '<span class="sr-only">Toggle navigation</span>' +
                    '<span class="icon-bar"></span>' +
                    '<span class="icon-bar"></span>' +
                    '<span class="icon-bar"></span>' +
                '</button>' +
                '<a class="navbar-brand ldrly-logo" href="#">' +
                    '<img src="{{{global.project.icon}}}"> ' +
//                            '{{global.project.acronym}}' +
                '</a>' +
                '<!-- Responsive Navbar Part 2: Place all navbar contents you want collaposed within .navbar-collapse.collapse -->' +
                '<div class="nav-collapse collapse" style="height: 1px;">' +
                    '<ul class="nav navbar-nav pull-right"> ' +
                        '{{#menu}}' +
                        '<li class="{{active}}"><a href="{{url}}"><i class="{{icon}}"></i>{{name}}</a></li>' +
                        '{{/menu}}' +
                    '</ul> ' +
                '</div><!--/.nav-collapse -->' +
            '</div>' +
        '</div> <!--/container-->' +
    '</div>';


ui.template.global.footer =
    '<div class="footer navbar navbar-fixed-bottom">' +
        '<p class="text-center">&copy; LDRLY - Leaderboard (<a href="http://ldrly.geekatron.org">LDRLY</a>) ' +
            '2014' +
        '</p>' +
    '</div>';

ui.template.global.modal.template =
    '<div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
        '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>' +
            '<h3 id="myModalLabel">Concept Properties</h3>' +
        '</div>' +
        '<div class="modal-body">' +
            '<p>Body content here....</p>' +
        '</div>' +
        '<div class="modal-footer">' +
            '<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>' +
            '<button class="btn btn-primary">Save Changes</button>' +
        '</div>' +
    '</div>';

ui.template.global.modal.error.xhr =
    '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>' +
        '<h3 id="viewModalLabel">ERROR!</h3>' +
        '</div>' +

        '<div class="modal-body">' +
        //Table of properties for LDRLY
        '<div class="container-fulid">' +
        '<div class="row-fluid">' +
        '<div class="span3"> Status Code: </div>' +
        '<div class="span9"> {{status}} </div>' +
        '</div>' +
        '<div class="row-fluid">' +
        '<div class="span3"> Status Message: </div>' +
        '<div class="span9"> {{statusText}} </div>' +
        '</div>' +
        '<div class="row-fluid">' +
        '<div class="span3"> Response Message: </div>' +
        '<div class="span9"> {{responseText}} </div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<button class="btn btn-warning" data-dismiss="modal" aria-hidden="true">Close</button>' +
    '</div>';


/*jslint browser: true */
/*jslint devel: true */
/*jslint nomen: true */
/*global $, jQuery, _, ko, Mustache */
/*global sip */
"use strict";

/*  =============================================
 Error Pages for ICE-M
 ============================================= */
ui.template.global.error = {};
ui.template.global.error.s404 = {};
ui.template.global.error.s500 = {};

ui.template.global.error.head = ui.template.global.page.head;

ui.template.global.error.s404.content =
    '<div class="container-fluid">' +
        '<div class="row pagination-centered">' +
        '<div class="err-title">{{error.404.title}}</div>' +

        '<div class="err-msg">' +
        '{{#error.404.message}}' +
        '<span>{{.}}</span>' +
        '{{/error.404.message}}' +
        '</div>' +
        '<ul class="err-msg">' +
        '{{#error.404.list}}' +
        '<li><span class="err-bullet">*  {{.}}</span></li>' +
        '{{/error.404.list}}' +
        '</ul>' +
        '<div class="err-msg">{{error.404.final}}</div>' +
        '<img class="err-img-right" src="/img/error/b_bwahaha.png">' +
        '</div>' +
        '</div>';
ui.template.global.error.s404.body =
    '<body id="error_page">' +
        ui.template.global.menu +
        ui.template.global.error.s404.content +
//        ui.template.global.footer +
    '<!-- Global Libs-->' +
    '{{#global.libs}}' +
    '<script src="{{src}}"></script>' +
    '{{/global.libs}}' +
    '<!-- /Global Libs-->' +
    '<!-- Local Libs-->' +
    '{{#libs}}' +
    '<script src="{{src}}"></script>' +
    '{{/libs}}' +
    '<!-- /Local Libs-->' +
    '</body>';


ui.template.global.error.s404.page =
    '<!DOCTYPE html>' +
        '<html>' +
        ui.template.global.error.head +
        ui.template.global.error.s404.body +
        '</html>';

ui.template.global.error.s500.content =
    '<div class="container-fluid">' +
        '<div class="row pagination-centered">' +
        '<div class="err-title">{{error.500.title}}</div>' +

        '<div class="err-msg">' +
        '{{#error.500.message}}' +
        '<span>{{.}}</span>' +
        '{{/error.500.message}}' +
        '</div>' +
        '<ul class="err-msg">' +
        '{{#error.500.list}}' +
        '<li><span class="err-bullet">*  {{.}}</span></li>' +
        '{{/error.500.list}}' +
        '</ul>' +

        '<div class="err-msg">' +
        '<span>{{err}}</span>' +
        '</div>' +

        '<div class="err-msg">{{error.500.final}}</div>' +
        '<img class="err-img" src="/img/error/h_nerd.png">' +
        '</div>' +
        '</div>';
ui.template.global.error.s500.body =
    '<body id="error_page">' +
        ui.template.global.menu +
        ui.template.global.error.s500.content +
//        ui.template.global.footer +
    '<!-- Global Libs-->' +
    '{{#global.libs}}' +
    '<script src="{{src}}"></script>' +
    '{{/global.libs}}' +
    '<!-- /Global Libs-->' +
    '<!-- Local Libs-->' +
    '{{#libs}}' +
    '<script src="{{src}}"></script>' +
    '{{/libs}}' +
    '<!-- /Local Libs-->' +
    '</body>';


ui.template.global.error.s500.page =
    '<!DOCTYPE html>' +
        '<html>' +
        ui.template.global.error.head +
        ui.template.global.error.s500.body +
        '</html>';


/*jslint browser: true */
/*jslint devel: true */
/*jslint nomen: true */
/*global $, jQuery, _, ko, Mustache */
/*global sip */
"use strict";

/*  =============================================
 Layouts (Mustache template)for SIP
 ============================================= */
//Layout Namespace declarations
if (!ui.template.ldrly) {
    ui.template.ldrly = {};
}
ui.template.ldrly.layout = {};


/*  ===================================================
 One COLUMN Mustache template
 ==============================

 This template is common for the following:
 - LDRLY Home
 =================================================== */


//One Column Namespace declarations
ui.template.ldrly.layout.onecolumn = {};
ui.template.ldrly.layout.onecolumn.menu = {};
ui.template.ldrly.layout.onecolumn.modal = {};
ui.template.ldrly.layout.onecolumn.column = {};
ui.template.ldrly.layout.onecolumn.content = {};
ui.template.ldrly.layout.onecolumn.head = {};
ui.template.ldrly.layout.onecolumn.body = {};
ui.template.ldrly.layout.onecolumn.page = {};

ui.template.ldrly.layout.onecolumn.column =
//    "<div class='text-center span12 well'>" +
    "<div class='text-center col-md-12'>" +
        "<div class='page-header'>" +
            "<h1>{{title}} <small>({{acronym}})</small></h1>" +
        "</div>" +
        "{{#description}}" +
        "<p>{{.}}</p>" +
        "{{/description}}" +
    "</div>";

ui.template.ldrly.layout.onecolumn.content =
    "<div id='columns' class='container-fluid'>" +
        "<div class='row'>" +
            ui.template.ldrly.error +
        "</div>" +
        "<div class='row content home'>" +
            ui.template.ldrly.layout.onecolumn.column +
        "</div>" +
    "</div>";

ui.template.ldrly.layout.onecolumn.head = ui.template.global.page.head;

ui.template.ldrly.layout.onecolumn.body =
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

ui.template.ldrly.layout.onecolumn.page =
    "<!DOCTYPE html>" +
        "<html>" +
            ui.template.ldrly.layout.onecolumn.head +
            ui.template.ldrly.layout.onecolumn.body +
        "</html>";


/*jslint browser: true */
/*jslint devel: true */
/*jslint nomen: true */
/*global $, jQuery, _, ko, Mustache */
/*global ice, scp, scd */
"use strict";

/*  ===================================================
 TWO COLUMN Mustache template
 ==============================

 These templates are common for the following:
 -....
 =================================================== */

//Two Column Namespace declarations
ui.template.ldrly.layout.twocolumn = {};
ui.template.ldrly.layout.twocolumn.menu = {};
ui.template.ldrly.layout.twocolumn.modal = {};
ui.template.ldrly.layout.twocolumn.left = {};
ui.template.ldrly.layout.twocolumn.right = {};
ui.template.ldrly.layout.twocolumn.columns = {};
ui.template.ldrly.layout.twocolumn.content = {};
ui.template.ldrly.layout.twocolumn.head = {};
ui.template.ldrly.layout.twocolumn.body = {};
ui.template.ldrly.layout.twocolumn.page = {};

ui.template.ldrly.layout.twocolumn.left =
    "<div class='col-md-3 well'>" +
        "{{#behaviour}}" +
        "<h4>{{name}}</h4>" +
        "<hr class='min-hr'>" +
        "<ul>" +
            "{{#children}}" +
            "<li><a href='#' data-bind='{{action}}'>{{name}}</a></li>" +
            "{{/children}}" +
        "</ul>" +
        "{{/behaviour}}" +
    "</div>";
ui.template.ldrly.layout.twocolumn.right =
    "<div id='content' class='text-center col-md-9 well'>" +
        "<div class='page-header'>" +
            "<h1>{{title}} <small>({{acronym}})</small></h1>" +
        "</div>" +
        "{{#description}}" +
        "<p>{{.}}</p>" +
        "{{/description}}" +
    "</div>";

ui.template.ldrly.layout.twocolumn.columns =
    "<!DOCTYPE html>" +
        "<html>" +
            ui.template.ldrly.layout.twocolumn.left +
            ui.template.ldrly.layout.twocolumn.right +
        "</html>";

ui.template.ldrly.layout.twocolumn.content =
    "<div id='columns' class='container-fluid'>" +
        "<div class='row'>" +
            ui.template.ldrly.error +
        "</div>" +
        "<div class='row'>" +
            ui.template.ldrly.layout.twocolumn.columns +
        "</div>" +
    "</div>";

ui.template.ldrly.layout.twocolumn.head = ui.template.global.page.head;

ui.template.ldrly.layout.twocolumn.body =
    "<body>" +
        ui.template.global.menu +
        ui.template.ldrly.layout.twocolumn.content +
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

ui.template.ldrly.layout.twocolumn.page =
    "<!DOCTYPE html>" +
        "<html>" +
            ui.template.ldrly.layout.twocolumn.head +
            ui.template.ldrly.layout.twocolumn.body +
        "</html>";

/*  =============================================
 Common element for ICE-M Layouts
 ============================================= */
ui.template.ldrly.libs =
    "<!-- Global Libs-->" +
        "{{#global.libs}}" +
        "<script src='{{{src}}}'></script>" +
        "{{/global.libs}}" +
        "<!-- /Global Libs-->" +
        "<!-- Local Libs-->" +
        "{{#libs}}" +
        "<script src='{{{src}}}'></script>" +
        "{{/libs}}";


/*jslint browser: true */
/*jslint devel: true */
/*jslint nomen: true */
/*global $, jQuery, _, ko, Mustache */
/*global ldrly */
"use strict";

/*  =============================================
 Mustache template for LDRLY Home Page
 ============================================= */

//ui.template.ldrly.home = {};
//ui.template.ldrly.home.page = ui.template.ldrly.layout.onecolumn.page;

ui.template.ldrly.home = {};
ui.template.ldrly.home.leaderboard = {};

ui.template.ldrly.home.leaderboard.result =
    '<!-- ko if: state() === 1 -->' +
        '<table class="table table-striped well">' +
            '<thead>' +
                '<tr>' +
                    '<th class="text-center">Username</th>' +
                    '<th class="text-center">Ranking</th>' +
                    '<th class="text-center">Value</th>' +
                '</tr>' +
            '</thead>' +
            '<tbody data-bind="foreach: leaderboard()">' +
                '<tr>' +
                    '<td>' +
                        '<div data-bind="text: username"></div>' +
                    '</td>' +
                    '<td>' +
                        '<div data-bind="text: ranking"></div>' +
                    '</td>' +
                    '<td>' +
                        '<div data-bind="text: value"></div>' +
                    '</td>' +
                '</tr>' +
            '</tbody>' +
        '</table>' +
    '<!-- /ko -->';

ui.template.ldrly.home.leaderboard.userstats =
    '<!-- ko if: state() === 2 -->' +
    '<table class="table table-striped well">' +
        '<thead>' +
            '<tr>' +
                '<th>Stat Name</th>' +
                '<th>Stat Value</th>' +
            '</tr>' +
        '</thead>' +
        '<tbody data-bind="foreach: userstats()">' +
            '<tr>' +
                '<td>' +
                    '<div data-bind="text: name"></div>' +
                '</td>' +
                '<td>' +
                    '<div data-bind="text: value"></div>' +
                '</td>' +
            '</tr>' +
        '</tbody>' +
    '</table>' +
    '<!-- /ko -->';

ui.template.ldrly.home.leaderboard.search =
    '<table class="table table-striped well">' +
        '<thead>' +
            '<tr class="text-center">' +
                '<th>Search by Username</th>' +
                '<th></th>' +
                '<th>Search by Stat Name</th>' +
                '<th></th>' +
            '</tr>' +
        '</thead>' +
        '<tbody>' +
            '<tr>' +
                '<td>' +
                    '<input id="username" type="text" class="form-control col-md-8" placeholder="e.g. player0">' +
                '</td>' +
                '<td>' +
                    '<button type="button" data-bind="click: retrieveUserStats" class="btn btn-default">' +
                    '<span class="glyphicon glyphicon-user">Search</span>' +
                    '</button>' +
                '</td>' +
                '<td>' +
                    '<input id="statname" type="text" class="form-control col-xs-8" placeholder="e.g. wins">' +
                '</td>' +
                '<td>' +
                    '<button type="button" data-bind="click: retrieveLeaderboard" class="btn btn-primary">' +
                        '<span class="glyphicon glyphicon-tower">Search</span>' +
                    '</button>' +
                '</td>' +
            '</tr>' +
        '</tbody>' +
    '</table>';

ui.template.ldrly.home.leaderboard.content =
    ui.template.ldrly.home.leaderboard.search +
    ui.template.ldrly.home.leaderboard.result +
    ui.template.ldrly.home.leaderboard.userstats;


ui.template.ldrly.home.column =
    "<div class='text-center'>" +
        "<div class='page-header'>" +
        "<h1>{{title}} <small>({{acronym}})</small></h1>" +
        "</div>" +
        "{{#description}}" +
        "<p>{{.}}</p>" +
        "{{/description}}" +
        ui.template.ldrly.home.leaderboard.content +
    "</div>";

ui.template.ldrly.home.content =
    "<script>" +
        "jQuery(document).ready(function(){" +
        '   var viewModel = new ldrly.viewmodel.Leaderboard(); ' +
        '   ko.applyBindings(viewModel); ' +
        '});' +
    "</script>" +
    "<div id='columns' class='container'>" +
        "<div class='row'>" +
        ui.template.ldrly.error +
        "</div>" +
        "<div class='row content home'>" +
        ui.template.ldrly.home.column +
        "</div>" +
        "</div>";

ui.template.ldrly.home.head = ui.template.global.page.head;

ui.template.ldrly.home.body =
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
        ui.template.ldrly.home.content +
        ui.template.global.footer +
        "</body>";

ui.template.ldrly.home.page =
    "<!DOCTYPE html>" +
        "<html>" +
        ui.template.ldrly.home.head +
        ui.template.ldrly.home.body +
        "</html>";


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

/*jslint browser: true */
/*jslint devel: true */
/*jslint nomen: true */
/*global $, jQuery, _, ko, Mustache */
/*global ldrly, ui */
"use strict";

/* Declare the namespace for Integration */
ldrly.integration = {};
ldrly.integration.error = {};
ldrly.integration.rest = {};

/*            Error Handling for Responses
 ==================================================
 */
ldrly.integration.error.xhr = function handleXHRFailure(XHR, textStatus, errorThrown) {
    console.log("Error! " + errorThrown);

    var err = { responseText : XHR.responseText, status : XHR.status, statusText : XHR.statusText },
        template = '',
        data = '';

    //Use for Error logging in-order to log an problematic/failed calls

    /* Use to throw Alert Dialogs */
    //Get the template & Data for the modal
    template = ui.template.global.modal.error.xhr;
    data = err;

    //Generate and Render the HTML
    var html = Mustache.to_html(template, data);
    $('#myModal').html(html);
    //Show the modal
    $('#myModal').modal('show');
};
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
/*jslint browser: true */
/*jslint devel: true */
/*jslint nomen: true */
/*global $, jQuery, _, ko, Mustache */
/*global ldrly */
"use strict";

ldrly.viewmodel = {};

//View Model Helper Methods
ldrly.viewmodel.helper = {};

ldrly.viewmodel.helper.onlineStatus = function () {
    //Update the Online/Offline Status
    $('#product_status').removeClass('offline');
    $('#product_status').addClass('online');
    //Update the Status Icon
    $('#product_status_icon').removeClass('icon-refresh');
    $('#product_status_icon').removeClass('icon-off');
    $('#product_status_icon').addClass('icon-globe');
    //Update the Status Text
    $('#product_status_text').html('Online');
};

ldrly.viewmodel.helper.offlineStatus = function () {
    //Update the Online/Offline Status
    $('#product_status').removeClass('online');
    $('#product_status').addClass('offline');
    //Update the Status Icon
    $('#product_status_icon').removeClass('icon-refresh');
    $('#product_status_icon').removeClass('icon-globe');
    $('#product_status_icon').addClass('icon-off');
    //Update the Status Text
    $('#product_status_text').html('Offline');
};


ldrly.viewmodel.helper.showStatus = function () {
    //Show the progress dialog
    $('#status').removeClass('hide');
    $('#progress-bar').removeClass('hide');
    $('#progress').removeClass('hide');

    $('#success-alert').addClass('hide');
    $('#error-alert').addClass('hide');

    //Update the progress bar status
    $('#progress-bar').css('width', '50%');
    $('#progress').addClass('active');

    //Clear any error messages
    $('#alert-msg').empty();
};

ldrly.viewmodel.helper.hideStatus = function () {
    //Update the progress bar status
    $('#progress-bar').css('width', '0%');
    $('#progress').removeClass('active');
    $('#progress').addClass('hide');

    //Clear any error messages
    $('#alert-msg').empty();

    //Hide the progress dialog

    $('#success-alert').addClass('hide');
    $('#error-alert').addClass('hide');
    $('#progress-bar').addClass('hide');
    $('#status').addClass('hide');
};

ldrly.viewmodel.helper.errorStatus = function (msg) {
    $('#success-alert').addClass('hide');
    $('#error-alert').removeClass('hide');
    //Remove the style display: none;
    $('#error-alert').removeAttr('style');
    $('#progress').removeAttr('style');

    //Update the Modal Progress Bar to Danger
    $('#progress-bar').addClass('bar-danger');
    $('#progress-bar').removeClass('bar-success');
    $('#progress').removeClass('active');

    //Present the error message
    if (msg) {
        $('#error-alert-msg').html(msg);
        //$('#alert-msg').html(msg);
    }
};

ldrly.viewmodel.helper.successStatus = function (msg) {
    $('#error-alert').addClass('hide');
    $('#success-alert').removeClass('hide');
    //Remove the style display: none;
    $('#success-alert').removeAttr('style');
//    $('#progress-bar').removeAttr('style');
    $('#progress').removeAttr('style');

    //$('#success-alert').removeClass('fade');
    //$('#success-alert').addClass('fade in');

    //Update the Width to 100%
    $('#progress-bar').css('width', '100%');

    //Update the Modal Progress Bar to Success
    $('#progress-bar').addClass('bar-success');
    $('#progress-bar').removeClass('bar-danger');
    $('#progress').removeClass('active');


    if (msg) {
        //$('#alert-msg').html(msg);
        $('#success-alert-msg').html(msg);
    }
};
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