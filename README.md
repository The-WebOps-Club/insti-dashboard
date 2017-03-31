# Insti-Dashboard

[![Join the chat at https://gitter.im/The-WebOps-Club/insti-dashboard](https://badges.gitter.im/The-WebOps-Club/insti-dashboard.svg)](https://gitter.im/The-WebOps-Club/insti-dashboard?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
Dashboard for all insti related activities

We're now live!! Check us out [here](http://iitm.webops.club/)


## Submit a new widget
There are two types of widget:

* Native angular widget
* Embedded external widet

If you have an idea for a new widget, make a feature request in issues. If you
are enthusiastic enough, you can build the widget yourself (make sure it is responsive)
and submit the repositiry url as a new feature.

Otherwise, you can host the application yourself and give us the url.

This will become an embedded external widget.

#### Points to note:
 - Application must be responsive following a mobile first design.
 - Must conform to overall styling of the dashboard so that the widget will not look out of place.
 - Authentication/Notification API spec has to be followed.
 - There should not be indepenedent authentication in the application while it is added as a widget in the dashboard

For builing native widgets, see [Getting started with development](#getting-started-with-development)

### Authentication API

Work in progress.

### Notification API

Work in progress.

## Getting started with development

### Installations
 - Install `nvm` from [here](https://github.com/creationix/nvm)
 - Install the latest **NodeJS** version, followed by `bower`, `gulp`, `gulp-cli` by executing
 ```bash
 nvm install node
 npm install -g bower gulp gulp-cli
 ```

### Running the app
 - Clone the repository
 - Then `cd` into the directory and execute `npm install` to install dependencies
 - Run the development web-server by executing `gulp serve`

## Guidelines for contribution
See [contirbuting guidelines](CONTRIBUTING.md)

The dashboard template is taken from [blur-admin](https://github.com/akveo/blur-admin)

