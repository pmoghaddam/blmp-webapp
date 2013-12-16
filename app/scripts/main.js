/*global require*/
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
        underscore: '../bower_components/underscore/underscore',
        socketio: '../bower_components/socket.io-client/dist/socket.io'
    }
});

require([
    'jquery',
    'backbone',
    'socketio'
], function ($, Backbone, io) {
    Backbone.history.start();

    // Local or not
    var url;
    if (document.location.hostname === 'localhost') {
        url = 'http://localhost:5000';
    } else {
        url = 'http://blpm-api.herokuapp.com';
    }

    // Dummy View Area
    var $view = $('#list');

    // Basic Socket.IO connection
    var socket = io.connect(url);
    window.socket = socket;
    socket.on('connected', function (data) {
        console.log(data);
    });
    socket.on('tasks:list', function(tasks) {
        for (var i = 0; i < tasks.length; i++) {
            $view.append('<li>' + tasks[i].title + '</li>');
        }
    });
    socket.on('tasks:create', function(task) {
        $view.prepend('<li>' + task.title + '</li>');
    });

    socket.emit('tasks:list');
});
