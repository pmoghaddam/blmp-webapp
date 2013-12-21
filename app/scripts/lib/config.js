/*global define*/

/**
 * Assisting class to configure and load required classes
 */
define([
], function () {
    'use strict';

    // Local or not
    var url;
    if (document.location.hostname === 'localhost') {
        url = 'http://localhost:5000';
    } else {
        url = 'http://blpm-api.herokuapp.com';
    }

    return {
        url: url
    };
});
