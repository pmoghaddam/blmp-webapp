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
            'taskList:select': 'onSelectTaskList'
        },

        initialize: function () {
            // Setup collection and models
            this.tasks = new Tasks();
            this.taskLists = new TaskLists();

            // Current tasklist
            this.taskList = new TaskList();
        },

        createLayout: function () {
            return new TaskLayout({
                tasks: this.tasks,
                taskLists: this.taskLists
            });
        },

        // TODO: doLayout should be inside layout object
        list: function () {
            this.tasks.fetch();
            this.taskLists.fetch();
            this.doLayout();
        },

        onSelectTaskList: function (e, taskList) {
            this.taskList = taskList;

            // TODO: avoid memory leak here
            this.tasks = new Tasks([], {taskList: taskList.id});
            this.tasks.fetch();
            this.doLayout();
        },

        onAddTaskList: function (e, taskList) {
            this.taskLists.create(taskList);
        },

        onHoverTask: function (e, task) {
            this.layout.showTask(task);
        },

        onAddTask: function (e, task) {
            // Append task list to task
            task.taskList = this.taskList.id;

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
