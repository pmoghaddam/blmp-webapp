# Overview
Web application of BLPM.

# Quick Start

    # Install NPM and Bower packages
    npm install && bower install

    # Serve locally
    grunt server

# Architecture
The application is served locally by having Grunt mount `.tmp` folder and `app` folder to serve files.

For distribution, `grunt` task creates a `dist` folder with files processed for distribution.

## Web Server
The production server itself is a basic `express` Node.JS application that simply serves the content of the `dist` application. This is captured as a submodule in the `server` application.

To achieve this, the Continuous Integration server simply executes `sh deployment/development.sh` which brings the latest files into the `server` folder, commits the changes, and then pushes them out to the submodule's master branch (Heroku).

# Tasks
* [X] Add Socket.IO
* [X] Provide basic functionality to showcase live nature
* Understand how to keep socket.io as separate file? (prevent large JS files)
* Utilize CryptoJS (AES-256 bit)

## Big Picture
* Have application start on access
    * Users can capture tasks but it saves locally
    * When they sign-up, it can then be synced across devices, and persisted
