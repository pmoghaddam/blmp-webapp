/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var TaskView = Backbone.View.extend({
        template: JST['app/scripts/templates/task.ejs'],

        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this;
        }
    });

    return TaskView;
});
