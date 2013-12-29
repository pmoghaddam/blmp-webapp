/*global define*/

define([
    'jquery',
    'backbone',
    'underscore',
    'views/collaboratorsView',
    'controllers/mediators/collaboratorsMediator',
    'services/task',
    'collections/users'
], function ($, Backbone, _, CollaboratorsView, CollaboratorsMediator, TaskService, UsersCollection) {
    'use strict';

    var Controller = Backbone.Controller.extend({

        show: function (taskList) {
            var me = this;
            this.taskList = taskList;

            new TaskService().getCollaborators(taskList)
                .then(function (users) {
                    me.collection = new UsersCollection(users);

                    me.view = new CollaboratorsView({model: taskList, collection: me.collection});
                    new CollaboratorsMediator({view: me.view, model: taskList, collection: me.collection});

                    me.view.render();

                    $('body').append(me.view.el);
                    me.view.$('.modal').modal('show');
                }).done();
        }

    });

    return Controller;
});
