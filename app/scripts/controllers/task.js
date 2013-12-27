/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'lib/dispatcher',
    'lib/socket-io',
    'services/task',
    'models/taskList',
    'collections/tasks',
    'collections/taskLists',
    'views/layouts/taskLayout'
], function ($, _, Backbone, dispatcher, io, TaskService, TaskList, Tasks, TaskLists, TaskLayout) {
    'use strict';

    var TaskController = Backbone.Controller.extend({
        className: 'task-controller',
        events: {
            'task:delete': 'onRemoveTask',
            'task:create': 'onAddTask',
            'task:hover': 'onHoverTask',
            'task:update': 'onUpdateTask',

            'taskList:create': 'onAddTaskList',
            'taskList:select': 'onSelectTaskList',
            'taskList:delete': 'onRemoveTaskList'
        },

        initialize: function () {
            // Setup collection and models
            this.taskLists = new TaskLists();
            this.taskLists.fetch();
        },

        createLayout: function () {
            return new TaskLayout({
                tasks: this.tasks,
                taskLists: this.taskLists
            });
        },

        // TODO: doLayout should be inside layout object
        list: function (taskListId) {
            // TODO: avoid memory leak here
            this.taskListId = taskListId;
            this.tasks = new Tasks([], {taskList: taskListId});
            this.tasks.fetch();
            this.doLayout();
        },

        onSelectTaskList: function (e, taskList) {
            // OPTIMIZE: No need to reload entire page
            Backbone.history.navigate('tasks/' + taskList.id, {trigger: true});
        },

        onAddTaskList: function (e, taskList) {
            this.taskLists.create(taskList);
        },

        onRemoveTaskList: function (e, taskList) {
            var model = this.taskLists.get(taskList.id);
            this.taskLists.remove(model);
            model.destroy();
        },

        onHoverTask: function (e, task) {
            this.layout.showTask(task);
        },

        onAddTask: function (e, task) {
            // Append task list to task
            task.taskList = this.taskListId;

            this.tasks.create(task);
        },

        onUpdateTask: function (e, task, update) {
            var model = this.tasks.get(task.id);
            model.save(update);
        },

        onRemoveTask: function (e, task) {
            var model = this.tasks.get(task.id);
            this.tasks.remove(model);
            model.destroy();
        }

    });

    return TaskController;
});
