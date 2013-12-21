'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore'
    }
});

require([
    'jquery',
    'backbone',
    'io',
    'lib/config', // Important to load
    'controllers/application'
], function ($, Backbone, io, config, ApplicationController) {
    new ApplicationController().start();

//    // Local or not
//    var url;
//    if (document.location.hostname === 'localhost') {
//        url = 'http://localhost:5000';
//    } else {
//        url = 'http://blpm-api.herokuapp.com';
//    }
//
//    // Dummy view area
//    var $view = $('#list');
//
//    // Basic Socket.IO connection
//    var socket = io.connect(url); // TODO: Capture with AMD
//    window.socket = socket;
//
//    // Tasks
//    socket.on('connected', function (data) {
//        console.log(data);
//    });
//    socket.on('tasks:list', function (tasks) {
//        for (var i = 0; i < tasks.length; i++) {
//            $view.append('<li data-id="' + tasks[i]._id + '">' + tasks[i].title + '</li>');
//        }
//    });
//    socket.on('tasks:create', function (task) {
//        $view.prepend('<li data-id="' + task._id + '">' + task.title + '</li>');
//    });
//    socket.on('tasks:delete', function (task) {
//        $view.find('[data-id="' + task._id + '"]').remove();
//    });
//
//    socket.emit('tasks:list');
//
//    // Dummy View Area
//    var i = 0;
//    $('#add').click(function () {
//        socket.emit('tasks:create', {title: 'New Task #' + i++});
//    });
//    $('#remove').click(function () {
//        var id = $view.find('li').data('id');
//        socket.emit('tasks:delete', {id: id});
//    });
});
