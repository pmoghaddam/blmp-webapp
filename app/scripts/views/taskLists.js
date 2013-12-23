/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var View = Backbone.View.extend({
        className: 'task-lists',
        template: JST['app/scripts/templates/taskLists.ejs'],

        render: function () {
            this.$el.html(this.template({}));
            return this;
        }
    });

    return View;
});
