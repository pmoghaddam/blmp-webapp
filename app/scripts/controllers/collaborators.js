/*global define*/

define([
    'jquery',
    'backbone',
    'underscore',
    'views/collaboratorsView',
    'services/task',
    'collections/users'
], function ($, Backbone, _, CollaboratorsView, TaskService, UsersCollection) {
    'use strict';

    var Controller = Backbone.Controller.extend({

        show: function (taskList) {
            var me = this;
            this.taskList = taskList;

            new TaskService().getCollaborators(taskList)
                .then(function (users) {
                    me.collection = new UsersCollection(users);
                    me.view = new CollaboratorsView({model: taskList, collection: me.collection});
                    me.view.render();

                    $('body').append(me.view.el);
                    me.view.$('.modal').modal('show');

                    // TODO: Almost there!
                    me.view.$el.on('collaborator:delete', _.bind(me.onDeleteCollaborator, me));

                    me.view.on('addCollaborator', me.onAddCollaborator, me);
                }).done();
        },

        onAddCollaborator: function (email) {
            var me = this;

            new TaskService().addCollaborator(this.taskList, email)
                .then(function (user) {
                    me.collection.add(user);
                }).done();
        },

        onDeleteCollaborator: function (e, user) {
            var me = this;

            new TaskService().removeCollaborator(this.taskList, user)
                .then(function (res) {
                    me.collection.remove(res._id);
                }).done();
        }

    });

    return Controller;
});
