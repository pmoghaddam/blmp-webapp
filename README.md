A real-time task management tool with a [backend Node.js + Mongoose](https://github.com/pmoghaddam/blpm-api), and front-end Backbone.js/Marionette.js client, using Socket.IO and REST for real-time collaboration.

**Notes:** Made during Christmas break of 2013 as a quick prototype of mixing together Socket.IO, Mongoose, and Node.js with authentication.

# Overview
This repository holds the front-end client of the application (BLPM). At it's core, it is a Backbone.js application, with sprinkles of Marionette.js where relevant. There are however key additions:
 
* **Controllers** - Routers are kept minimalistic and simply direct to controllers based URL. This helps keep a single Router (similar to Rails), while splitting up the handling of routes across controllers.
* **Services** - Controllers glue together views and models; thus any business logic that is related to a single model is thus captured in Service artifacts.
* **Mediators** - Mediators contain view logic related to their associated model or collections. As such, Views are limited to only rendering logic. *Note:* This artifact is experimental in hoping to see whether it helps to organize further or not.  
* **Backbone.js Socket.IO Integration** - `Backbone.sync` has been overridden to seamlessly synchronize over Socket.IO rather than its default REST client. Psuedo-GUIDs are generated for objects during create process, to allow future offline capabilities.
* **Submodule Express.JS Project for Heroku** - by default, Grunt's `build` will output the compiled JS/CSS/HTML files required for a webserver; however, to host this on Heroku, a web server was required. The production server itself is a basic `express` Node.JS application that simply serves the content of the `dist` application. This is captured as a submodule in the `server` application. To achieve this, the Continuous Integration server simply executes `sh deployment/development.sh` which brings the latest files into the `server` folder, commits the changes, and then pushes them out to the submodule's master branch (Heroku). Ultimately in the future, this process should be simplified by having an external process take the output build files and prepare the required infrastructure. 

**Caution**: This client application lacks test. Given the short period of development (2 weeks for both front-end and back-end), and the experiments I was doing, the cost-benefit trade off was not there. 

# Quick Start

    # Install NPM and Bower packages
    npm install && bower install

    # Serve locally
    grunt server
