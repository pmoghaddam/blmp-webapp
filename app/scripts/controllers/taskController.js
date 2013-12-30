/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'lib/blpm',
    'collections/tasks',
    'collections/taskLists',
    'views/layouts/taskLayout',
    'controllers/collaboratorsController'
], function ($, _, Backbone, BLPM, Tasks, TaskLists, TaskLayout, CollaboratorsController) {
    'use strict';

    var TaskController = BLPM.Controller.extend({

        list: function (taskListId) {
            this.taskLists = new TaskLists();
            this.taskLists.fetch();
            this.destructOnClose(this.taskLists);

            this.tasks = new Tasks([], {taskList: taskListId});
            this.tasks.fetch();
            this.destructOnClose(this.tasks);

            var layout = this.layout = new TaskLayout({
                tasks: this.tasks,
                taskLists: this.taskLists
            });

            this.listenTo(Backbone, 'task:select', this.onSelectTask, this);
            this.listenTo(Backbone, 'taskList:collaborators', this.onCollaborators, this);
            this.listenTo(Backbone, 'taskList:select', this.onSelectTaskList, this);

            this.showLayout(layout);
            layout.show();
        },

        collaborators: function (taskListId) {
            var taskList = this.taskLists.get(taskListId);
            new CollaboratorsController().show(taskList);
        },

        onCollaborators: function (taskList) {
            this.collaborators(taskList.id);
        },

        onSelectTask: function (task) {
            this.layout.showTask(task);
        },

        onSelectTaskList: function (taskList) {
            Backbone.history.navigate('tasks/' + taskList.id, {trigger: true});
        }


    });

    return TaskController;
});
