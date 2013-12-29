/*global define*/

define([
    'jquery',
    'backbone',
    'services/task'
], function ($, Backbone, TaskService) {
    'use strict';

    var Controller = Backbone.Controller.extend({
        events: {
            'collaborator:delete': 'onDelete',
            'collaborator:create': 'onCreate'
        },

        initialize: function (options) {
            this.taskList = options.model;
            this.collection = options.collection;
            var view = this.view = options.view;
            this.listenToView(view);
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
