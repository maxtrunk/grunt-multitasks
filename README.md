GRUNTEND 
========

Boilerplate for frontend development using [HTML5 Boilerplate](http://html5boilerplate.com/), mobile first styles and[LESS](http://lesscss.org/). Built using [Grunt](http://gruntjs.com/).


Getting Started
---------------

Install [Node.js](http://nodejs.org/)

Install Grunt:

	npm install -g grunt-cli 

Install dependencies:

	cd /path/to/gruntend
	npm install

Build the site:

	grunt

The built site can be found at dist/

Grunt can watch the project and compile LESS and coffeescript when you make changes to the files. Grunt is setup to _not_ minify files when watching them to aid debugging whilst in development.

	grunt watch

Project build settings are configured in the usual `Gruntfile.js`.




Release History
---------------
 * 2014-05-13   v0.0.1   Brand new!