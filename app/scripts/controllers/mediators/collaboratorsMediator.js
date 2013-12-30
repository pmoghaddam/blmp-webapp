/*global define*/

define([
    'jquery',
    'lib/blpm',
    'services/task'
], function ($, BLPM, TaskService) {
    'use strict';

    var Controller = BLPM.Mediator.extend({
        events: {
            'collaborator:delete': 'onDelete',
            'collaborator:create': 'onCreate'
        },

        initialize: function (options) {
            this.taskList = options.model;
            BLPM.Mediator.prototype.initialize.apply(this, arguments);
        },

        onCreate: function (email) {
            var me = this;

            new TaskService().addCollaborator(this.taskList, email)
                .then(function (user) {
                    me.collection.add(user);
                }).done();
        },

        onDelete: function (view, data) {
            var me = this;
            var user = data.model;

            new TaskService().removeCollaborator(this.taskList, user)
                .then(function (res) {
                    me.collection.remove(res._id);
                }).done();
        }
    });


    return Controller;
});
