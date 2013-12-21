/*global define*/

/**
 * Assisting class to configure and load required classes
 */
define([
    'jquery',
    'lib/controller'
], function ($) {
    'use strict';

    // Explicitly a Singleton
    var Helper = {

        /**
         * Extract form values into a single object
         * @param $el
         */
        extractFormValues: function ($el) {
            var values = {};
            $.each($el.serializeArray(), function (i, field) {
                values[field.name] = field.value;
            });
            return values;
        }
    };

    return Helper;
});
