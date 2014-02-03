/**
 * Created with WebStorm.
 * Date: 2/3/2014
 * Time: 11:07 AM
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
 View Model for Interview Prep Profile
 ============================================= */
ldrly.viewmodel.stat = {};
ldrly.viewmodel.stat.Profile = {};

/**
 * View models for the Interview Prep Profile.
 * @params args - Arguments expected by the constructor.
 *
 * @constructor
 */
ldrly.viewmodel.stat.Profile = function (args) {
    var self = this,
        err_msg = "";

    /* View related observables */
    self.state = ko.observable(0);
    self.simulate = ko.observable();
    self.feedback = ko.observable(false);

    //  UUID of the IPP
    self.id = ko.observable();
    //  Selected Position Profile ID  - Linked to CP, UAP
    self.ppid = ko.observableArray();
    //  Profile of the Employee conducting the interview
    self.epid = ko.observable();
    // Profile of the Company related to the Position
    self.cpid = ko.observable();

    /* Store the UAP, CP, PP and EP Data*/
    self.uap = ko.observable(); //Store the User Account Profile Data
    self.cp = ko.observableArray(); //Store all the retrieved Company Profile Data
    self.pp = ko.observableArray(); //Store all the retrieved Position Profile Data
    self.ep = ko.observableArray(); //Store all the retrieved Employee Profile Data
    self.stat = ko.observableArray(); //Store all the retrieved Interview Prep Profile Data

    self.cpByCompany = ko.observableArray();

    /* Store the CP, PP and EP Data relevant to the particular position profile */
    self.currentcp = ko.observable(); //Store all the current Company Profile Data
    self.currentpp = ko.observable(); //Store all the current Position Profile Data
    self.currentep = ko.observable(); //Store all the current Employee Profile Data
    self.currentipp = ko.observable(); //Store all the current Interview Prep Profile Data

    self.currentcpphoto = ko.observable();
    self.currentcpgallery = ko.observableArray();

    self.cps = ko.observable({});
    self.pps = ko.observable();

    //Profile to the Multimedia
    self.mulimedia = ko.observableArray();
    //Introduction about yourself relevant to the Position Profile
    self.introduction = ko.observable();
    //The two user stories about Who, What, Where, When, Why
    self.stories = ko.observableArray();
    //Feedback regarding how the interview went
    self.feedback = ko.observable();
    // The state of the view model
    self.state = ko.observable();
    // Indicates if the applicant is applying for an external position
    self.external = ko.observable(false);

    /** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
     **            Private functionality/behaviours              **
     ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

    /**
     * Retrieve the data for each relevant position profile.
     * @param companyProfile UUID of a given company
     */
    function retrievePositionProfile(positionProfile, callback) {
        if (self.simulate()) {
            //Working with Sample Data
            var pp = ldrly.data.sample.data.pp.profiles[positionProfile];
            self.pp.push(pp);
        } else {
            //Working with Real Data (Integration)

        }
    }

    /**
     * Retrieve the data for the specified Company Profile.
     * @param companyProfile UUID of a given company profile.
     */
    function retrieveCompanyProfile(companyProfile, callback) {
        if (self.simulate()) {
            //Working with Sample Data
            var cp = ldrly.data.sample.data.cp.profiles[companyProfile];
            self.cp.push(cp);
            callback(undefined, true);
        } else {
            //Working with Real Data (Integration)

        }
    }

    function retrieveEmployeeProfile(employeeProfile, callback) {
        if (self.simulate()) {
            //Working with Sample Data
            var ep = ldrly.data.sample.data.ep.profiles[employeeProfile];
            self.ep.push(ep);
            callback(undefined, true);
        } else {
            //Working with Real Data (Integration)

        }
    }

    function extractCompanyProfilesForNav() {
        var companies = [],
            currentCompany = null,
            currentIPP = null;

        function forEachPosition(element, index, list) {
            //Check to see if the company exists
            currentCompany = _.find(companies, function (company) {
                if (company.name === element.cp.name) {
                    return company;
                }
            });

            currentIPP = _.find(self.uap().stat, function (ipp) {
                if (ipp.pp === element._id) {
                    return ipp;
                }
            });

            if (!_.isNull(currentCompany) && !_.isUndefined(currentCompany)) {
                currentCompany.pp.push(
                    {
                        id : element._id,
                        name : element.name,
                        ipp : currentIPP
                    }
                );
            } else {
                currentCompany =
                {
                    id : element.cp._id,
                    name : element.cp.name,
                    pp : [{
                        id : element._id,
                        name : element.name,
                        ipp : currentIPP
                    }]
                };
                companies.push(currentCompany);
            }
        }//END forEachPosition

        _.each(self.pp(), forEachPosition);
        self.cp(companies);
    }
    /**
     * Retrieve the Company & Position Profiles from the User Account Profile
     */
//    function retrieveCompanyPositionProfiles(callback) {
//        var cps = {}, //Company Profiles from the User's Account
//            count = 0;
//
//        if (self.simulate()) {
//            //Working with Sample Data
//            cps = self.uap().cp;
//        } else {
//            //Working with Real Data (Integration)
//
//        }
//
//        function handleCompanyProfileResponse(err, data) {
//            //Decrement the counter
//            count--;
//
//            if (!_.isUndefined(err)) {
//                console.log("Error retrieving Company Profile!");
//            } else {
//                if (count <= 0) {
//                    callback(undefined, true);
//                }
//            }
//        }
//
//        function forEachPositionProfile(element, index, list) {
//            //Retrieve the Position Profile
//            retrievePositionProfile(element.id);
//        }
//
//        function forEachCompanyProfile(element, index, list) {
//            //Retrieve the Company Profile
//            retrieveCompanyProfile(element.id, handleCompanyProfileResponse);
//
//            //Retrieve all the Position Profiles
//            _.each(element.pp, forEachPositionProfile);
//        }
//
//        count = cps.length;
//        //For each company profile retrieve the relevant Position Profiles
//        _.each(cps, forEachCompanyProfile);
//    }
//
//    function provideFeedback() {
//        //Check to see if the Interview Date has already passed - if so return true, otherwise false
//        var date = self.currentpp().date,
//            time = self.currentpp().time,
//            current = Date.now(),//The number of ms elapsed since January 1 1970 00:00:00 UTC - NOW
//            ppdate = Date.parse(date + 'T' + time),
//            feedback = false;
//
//        // If the current date/time is greater than the pp date/time we can expect feedback
//        if (current > ppdate) {
//            feedback = true;
//        } else {
//            feedback = false;
//        }
//
//        return feedback;
//    }
    function retrieveCompanyPositionProfiles(callback) {
        var cps = {}, //Company Profiles from the User's Account
            count = 0;

        function handlePositionProfileResponse(err, data) {
            //Decrement the counter
            count--;

            if (!_.isUndefined(err)) {
                console.log("Error retrieving Company Profile!");
            } else {
                //self.pps()[data._id] = data;
                self.pp().push(data);

                //Check to see if the company profile is there yet
//                if (self.cps()[data.cp._id]) {
//                    self.cps()[data.cp._id].push(data._id);
//                } else {
//                    self.cps()[data.cp._id] = [data._id];
//                }


                if (count <= 0) {
                    extractCompanyProfilesForNav();

                    callback(undefined, true);
                }
            }
        }


        function forEachPositionProfile(element, index, list) {
            ldrly.integration.rest.pp.retrieve(element._id, handlePositionProfileResponse);
            //Retrieve the Company Profile
            //retrieveCompanyProfile(element.cp, handleCompanyProfileResponse);
        }

        count = self.uap().pp.length;
        //For each company profile retrieve the relevant Position Profiles
        _.each(self.uap().pp, forEachPositionProfile);
    }

    function provideFeedback() {
        //Check to see if the Interview Date has already passed - if so return true, otherwise false
        var date = self.currentpp().date,
            time = self.currentpp().time,
            current = Date.now(),//The number of ms elapsed since January 1 1970 00:00:00 UTC - NOW
            ppdate = Date.parse(date + 'T' + time),
            feedback = false;

        // If the current date/time is greater than the pp date/time we can expect feedback
        if (current > ppdate) {
            feedback = true;
        } else {
            feedback = false;
        }

        return feedback;
    }

    function extractIPPFields(data) {
        data.introduction = $('#introduction').val();
        //data.feedback = $('#feedback').val();
        data.stories[0].who = $('#story1-who').val();
        data.stories[0].what = $('#story1-what').val();
        data.stories[0].where = $('#story1-where').val();
        data.stories[0].when = $('#story1-when').val();
        data.stories[0].why = $('#story1-why').val();
        data.stories[1].who = $('#story2-who').val();
        data.stories[1].what = $('#story2-what').val();
        data.stories[1].where = $('#story2-where').val();
        data.stories[1].when = $('#story2-when').val();
        data.stories[1].why = $('#story2-why').val();

    }

    /** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
     **             Helper functionality/behaviours              **
     ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */
//
////    self.provideFeedback = function () {
//    //Check to see if the Interview Date has already passed - if so return true, otherwise false
//    var date = self.currentpp().date,
//        time = self.currentpp().time,
//        current = Date.now(),//The number of ms elapsed since January 1 1970 00:00:00 UTC - NOW
//        ppdate = Date.parse(date + 'T' + time),
//        feedback = false;
//
//    // If the current date/time is greater than the pp date/time we can expect feedback
//    if (current > ppdate) {
//        feedback = true;
//    } else {
//        feedback = false;
//    }
//
//    return feedback;
//};

    self.sampleStory = function (story, data) {
        var storyId = '#sample-story-' + story;
        console.log('Story #:');
        console.log(story);

        //Check to see if the Sample Story Element is hidden
        if ($(storyId).hasClass("hidden")) {
            //Sample is hidden - show it
            $(storyId).show('slow', 'swing', function () {
                $(storyId).removeClass('hidden');
            });
        } else {
            //Sample is shown - hide it
            $(storyId).hide('slow', 'swing', function () {
                $(storyId).addClass('hidden');
            });
        }
    };

    self.isImage = function (data) {
        console.log(data);
        if (data.type === 'multimedia#image') {
            return true;
        } else {
            return false;
        }
    };
    self.isVideo = function (data) {
        console.log(data);
        if (data.type === 'multimedia#video') {
            return true;
        } else {
            return false;
        }
    };
    self.isText = function (data) {
        console.log(data);
        if (data.type === 'multimedia#text') {
            return true;
        } else {
            return false;
        }
    };

    self.decode = function (data) {
        console.log('Decoding: ');
        console.log(data);

        var decoded = decodeURIComponent(data);

        console.log('Decoded: ');
        console.log(decoded);

        return decoded;
    };

    self.isCompleteStories = function (data) {
        if (!_.isNull(self.currentipp().introduction) && !_.isUndefined(self.currentipp().introduction) &&
            !_.isNull(self.currentipp().stories[0].who) && !_.isUndefined(self.currentipp().stories[0].who) &&
            !_.isNull(self.currentipp().stories[0].what) && !_.isUndefined(self.currentipp().stories[0].what) &&
            !_.isNull(self.currentipp().stories[0].where) && !_.isUndefined(self.currentipp().stories[0].where) &&
            !_.isNull(self.currentipp().stories[0].when) && !_.isUndefined(self.currentipp().stories[0].when) &&
            !_.isNull(self.currentipp().stories[0].why) && !_.isUndefined(self.currentipp().stories[0].why) &&
            !_.isNull(self.currentipp().stories[1].who) && !_.isUndefined(self.currentipp().stories[1].who) &&
            !_.isNull(self.currentipp().stories[1].what) && !_.isUndefined(self.currentipp().stories[1].what) &&
            !_.isNull(self.currentipp().stories[1].where) && !_.isUndefined(self.currentipp().stories[1].where) &&
            !_.isNull(self.currentipp().stories[1].when) && !_.isUndefined(self.currentipp().stories[1].when) &&
            !_.isNull(self.currentipp().stories[1].why) && !_.isUndefined(self.currentipp().stories[1].why)
            ) {
            return true;
        }

        //Failed return false
        return false;

    };
    /** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
     **         Operations/behaviour to assist Views             **
     ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */
    self.getEmployeeProfilePhoto = function (data) {
        function forEachMultimedia(element, index, list) {
            var profile = null;
            if (element.tags) {
                profile = _.indexOf(element.tags, 'profile');

                if (profile >= 0) {
                    return element.src;
                } else {
                    return undefined;
                }
            }
        } //END forEachMultimedia

        //If there is more than one piece of multimedia search through for the profile
        if (self.currentep().multimedia.length > 1) {
            //Search through the tags
            _.each(self.currentep().multimedia, forEachMultimedia);
        } else {
            return self.currentep().multimedia[0].src;
        }
    };

    self.getCompanyProfilePhoto = function (data, callback) {
        function forEachMultimedia(element, index, list) {
            var profile = null;
            if (element.tags) {
                profile = _.indexOf(element.tags, 'logo');

                if (profile >= 0) {
                    callback(undefined, element.src);
                }
            }
        } //END forEachMultimedia

        //If there is more than one piece of multimedia search through for the profile
        if (self.currentcp().multimedia.length > 1) {
            //Search through the tags
            _.each(self.currentcp().multimedia, forEachMultimedia);
        } else {
            if (!_.isNull(callback) && !_.isUndefined(callback)) {
                callback(undefined, self.currentcp().multimedia[0].src);
            } else {
                return self.currentcp().multimedia[0].src;
            }
        }
    };

    self.getCompanyGalleryPhotos = function (data, callback) {
        var multimedia = null,
            gallery = [],
            count = 0;

        function forEachMultimedia(element, index, list) {
            //Decrement the counter
            count--;

            if (element.tags) {
                multimedia = _.indexOf(element.tags, 'gallery');

                if (multimedia >= 0) {
                    gallery.push(element);
                }

                //Time to callback?
                if (count <= 0) {
                    callback(undefined, gallery);
                }
            }
        } //END forEachMultimedia

        //If there is more than one piece of multimedia search through for the profile
        if (self.currentcp().multimedia.length > 0) {
            count = self.currentcp().multimedia.length;
            //Search through the tags
            _.each(self.currentcp().multimedia, forEachMultimedia);
        } else {
            if (!_.isNull(callback) && !_.isUndefined(callback)) {
                callback(undefined, gallery);
            } else {
                return self.currentep().multimedia[0].src;
            }
        }
    };

    self.placeMultimediaVideo = function (data) {
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

    self.convertTo12h = function (data) {
        var date = new Date(self.currentpp().date + 'T' + self.currentpp().time),
            localeTime = date.toLocaleTimeString();

        return localeTime;
    };

    /**
     * Convert the ISO8601 date to English (e.g. Monday December 2, 2013). Utilizing the Date.prototype.toDateString();
     * @param data - The data passed in
     * @returns {string} - The formatted date in english
     */
//    self.dateToEnglish = function (data) {
//        var date = new Date(self.currentpp().date + 'T' + self.currentpp().time),
//            localDate = date.toDateString();
//
//        return localDate;
//    };

    self.dateToEnglish = function (data) {
        var date = new Date(self.currentpp().date + 'T' + self.currentpp().time),
            day = date.getDay(),
            month = date.getMonth(),
            year = date.getFullYear(),
            english = null;

        //Convert the Day to the English word
        switch (day) {
            case 0:
                day = "Monday";
                break;
            case 1:
                day = "Tuesday";
                break;
            case 2:
                day = "Wednesday";
                break;
            case 3:
                day = "Thursday";
                break;
            case 4:
                day = "Friday";
                break;
            case 5:
                day = "Saturday";
                break;
            case 6:
                day = "Sunday";
                break;
        }

        switch (month) {
            case 0:
                month = "January";
                break;
            case 1:
                month = "February";
                break;
            case 2:
                month = "March";
                break;
            case 3:
                month = "April";
                break;
            case 4:
                month = "May";
                break;
            case 5:
                month = "June";
                break;
            case 6:
                month = "July";
                break;
            case 7:
                month = "August";
                break;
            case 8:
                month = "September";
                break;
            case 9:
                month = "October";
                break;
            case 10:
                month = "November";
                break;
            case 11:
                month = "December";
                break;
        }

        english = day + ' ' + month + ' ' + date.getDate() + ', ' + year;

        return english;
    };

    /**
     * Load the Interview Prep Profile for the select Position Profile.
     */
    self.loadIPPView = function (data) {
        console.log('Selected PP: ');
        console.log(data);

        //Clear the previous data
        self.currentcp(null);
        self.currentep(null);
        self.currentipp(null);
        self.currentpp(null);

        //Change the state to remove the Interview Prep Profile default text
        self.state(1);

        //Set the Position Profile ID as the selected one
        self.ppid(data.id);

        var count = 2;

        //Interview Prep and Position Profile Data Retrieved
        function syncCallback() {
            count--;

            if (count === 0) {
                //Check to hide the Insight Button
                if (!self.currentipp().complete) {
                    //$('#insight-btn').hide();
                }
                //Check to see if Feedback should be provided
                self.feedback(provideFeedback());
            }
        }

        //Get the Interview Prep Profile
        function handleInterviewPrepProfileResponse(err, data) {
            if (err) {
                console.error(err);
            } else {
                self.currentipp(data);
                syncCallback();
            }
        }

        //If an IPP ID is provided, retrieve the IPP
        if (!_.isNull(data.stat) && !_.isUndefined(data.stat)) {
            self.id(data.stat._id);
            ldrly.integration.rest.stat.retrieve(data.stat._id, handleInterviewPrepProfileResponse);
        } else {
            console.error('Missing IPP!');
        }

        function handleCPPhotoResponse(err, data) {
            var msg = "Cannot retrieve Company Profile Logo!";
            if (err) {
                console.error(msg);
                alert(msg);
            } else {
                self.currentcpphoto(data);
            }
        }

        function handleCPGalleryResponse(err, data) {
            var msg = "Cannot retrieve multimedia for Company Profile Gallery!";
            if (err) {
                console.error(msg);
                alert(msg);
            } else {
                self.currentcpgallery(data);
            }
        }


        //Get the Position Profile Data from Service (Has the Company Profile and Employee inside
        function handlePositionProfileResponse(err, data) {
            if (err) {
                console.error(err);
            } else {
                self.currentpp(data);

                //Check to see if the profile is the external profile
                if (self.currentpp()._id === "52e0386154b5570200000005") {
                    self.external(true);
                }

                //  Get the Company Profile Data from the Service (PP has CPID)
                self.currentcp(data.cp);
                //  Get the Employee Profile Data from the Service (PP has ep)
                self.currentep(data.ep);

                self.ppid(data.id);
                self.cpid(data.cp._id);
                self.epid(data.ep._id);

                //Find the Company Profile Logo
                self.getCompanyProfilePhoto(undefined, handleCPPhotoResponse);
                //Find the Company Gallary Images
                self.getCompanyGalleryPhotos(undefined, handleCPGalleryResponse);

                syncCallback();
            }
        }
        ldrly.integration.rest.pp.retrieve(data.id, handlePositionProfileResponse);

        /* SAMPLE DATA INTEGRATION - NO LONGER USED
         //Set the current Position Profile Data
         self.currentpp(ldrly.data.sample.data.pp.profiles[data.id]);

         //Set the relevant Employee Profile ID
         self.epid(self.currentpp().epid);
         //Set the relevant Employee Profile Data
         self.currentep(ldrly.data.sample.data.ep.profiles[self.currentpp().epid]);

         //Set the relevant Company Profile ID
         self.cpid(self.currentpp().cpid);
         //Set the relevant Company Profile Data
         self.currentcp(ldrly.data.sample.data.cp.profiles[self.currentpp().cpid]);

         //Set the relevant Interview Prep Profile ID
         self.id(data.stat);
         //Set the relevant Interview Prep Profile Data
         self.currentipp(data.stat);
         //self.currentipp(ldrly.data.sample.data.stat.profiles[data.stat]);
         */

    };

    self.printProfile = function (data) {
        window.print();
    };
    //Switch to the IPP List (Home) (Stage 0)
    self.loadIPPListView = function (data) {
        //Load the list of Position Profiles for the user - Stage 0
        self.state(0);
    };
    //Switch to the Stories View (Stage 1)
    self.loadStoriesProfileView = function (data) {
        //Check to make sure that a Position Profile is selected!
        if (!_.isNull(self.currentpp()) && !_.isUndefined(self.currentpp())) {
            //Load the Stories View - Stage 2
            self.state(1);
        } else {
            alert('Please select a Potential Position from the left hand side!');
        }

    };
    //Switch to the Insight View (Stage 2)
    self.loadMultimediaProfileView = function (data) {
        //Check to make sure that a Position Profile is selected!
        if (!_.isNull(self.currentpp()) && !_.isUndefined(self.currentpp())) {
            //Load the insight view - Stage 2
            self.state(2);

            //Initialize the carousel & set the speed
            $(document).ready(function () {
                $('.carousel').carousel();
                $('.carousel').carousel({
                    interval: 200000000 //Setting a large time as to allow the user to watch a video completely/read article
                });
            });
        } else {
            alert('Please select a Potential Position from the left hand side!');
        }
    };
    //Switch to the Feedback View (Stage 3)
    self.loadFeedbackView = function (data) {
        //Check to make sure that a Position Profile is selected!
        if (!_.isNull(self.currentpp()) && !_.isUndefined(self.currentpp())) {
            //Load the feedback view - Stage 3
            self.state(3);
        } else {
            alert('Please select a Potential Position from the left hand side!');
        }
    };

    self.loadMultimedia = function (data) {
        if (data.subtype === 'multimedia#image') {
            $('#multimedia').html(
//                '<div style="" class="well">' +
                '<img style="width: 100%" src="' + decodeURIComponent(data.src) + '">'
//                    '</div>'
            );
        } else if (data.subtype === 'multimedia#text') {
            $('#multimedia').html(
                '<div style="" class="well">' +
                    '<h4>' + decodeURIComponent(data.src.title) + '</h4>' +
                    '<p>' + decodeURIComponent(data.src.body) + '</p>' +
                    '</div>'
            );
        } else if (data.subtype === 'multimedia#video') {
            $('#multimedia').html(
                '<div style="" class="well">' +
                    decodeURIComponent(data.src) +
                    '</div>'

            );
        }
    };

    self.logConsole = function (data) {
        console.log(data);
    };

    /** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
     **         Operations/behaviour related to IPP              **
     ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

    self.getPositionProfile = function (data) {
        console.log(data);
    };

    self.submitFeedback = function (data) {
        alert('Thank you for submitting feedback.');

        data = self.currentipp();
        //extractIPPFields(data);
        data.feedback = $('#feedback-input').val();

        //Clear the error message
        $('#err-msg').text('');

        function handleUpdate(err, data) {
            ldrly.viewmodel.helper.showStatus();

            if (err) {
                console.error(err);
                //Show error message
                ldrly.viewmodel.helper.errorStatus('Error updating Feedback!');
            } else {
                //Show success message
                ldrly.viewmodel.helper.successStatus('Feedback Saved!');
                //Update the Insight Button to be visible
                $('#insight-btn').show();

                //Update User Account Profile with IPP
            }
        }

        //Update the IPP via Service
        ldrly.integration.rest.stat.update(self.id(), data, handleUpdate);
    };

    self.submitIPP = function (data) {
        alert('Thank you for submitting your Interview Prep Profile.');
        //Clear the error message
        $('#err-msg').text('');

        function handleUpdate(err, data) {
            ldrly.viewmodel.helper.showStatus();

            if (err) {
                console.error(err);
                //Show error message
                ldrly.viewmodel.helper.errorStatus('Error submitting IPP!');
            } else {
                //Show success message
                ldrly.viewmodel.helper.successStatus('Interview Prep Profile Saved!');
                //Update the Insight Button to be visible
//                $('#insight-btn').show();

                //Update User Account Profile with IPP
            }
        }

        data = self.currentipp();
        data.complete = true;

        extractIPPFields(data);

        //Update the IPP via Service
        ldrly.integration.rest.stat.update(self.id(), data, handleUpdate);
    };


    /** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
     **                 Initialize the View Model                **
     ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */
    (function () {
        //self.cm = args.cm;

        /* set the state of the view model */
        self.state(0);

        function initVM() {
            function handleCompanyPositionProfilesResponse(err, data) {
                if (!_.isUndefined(err)) {
                    alert('Required Company, Position and Interview Prep Profiles data could not load!');
                } else {
                    //alert('All relevant data loaded!');
                    console.log('All relevant data loaded!');
                }
            }

            function handleUAPResponse(err, data) {
                if (err) {
                    console.error(err);
                } else {
                    self.uap(data);
                    self.stat(data.stat);
                }

                //Retrieve all the required Company, Position and Interview Prep Profiles
                retrieveCompanyPositionProfiles(handleCompanyPositionProfilesResponse);
            }

            //Retrieve UAP
            ldrly.integration.rest.uam.retrieve(self.uap()._id, handleUAPResponse);


            //Retrieve the User Accounts
            //ldrly.integration.rest.uam.list(handleUserProfileListResponse);

//            //Initialize the carousel & set the speed
//            $(document).ready(function () {
//                $('.carousel').carousel();
//                $('.carousel').carousel({
//                    interval: 200000000 //Setting a large time as to allow the user to watch a video completely/read article
//                });
//            });
        }//END document ready

        //Check to see if any flags are set
        function parsedURL(err, data) {
            //Check to use sample data
            if (data.simulate === 'true') {
                self.simulate(true);
                //Load the simulation data
                //  Retrieve the User Profile Sample Data
                //      self.uap(ldrly.data.sample.data.uam.list[0]);
                //  Retrieve the data for all the
            } else {
                self.simulate(false);
            }

            //Initialize the VM
            initVM();
        }//END

        //Extract the User Profile from the Cookie
        self.uap(ldrly.util.getUserFromSession());

        //Parse the URL for any Query Parameters
        ldrly.util.parseURL(window.location.href, parsedURL.bind(this));
    }());

};