/**
	Define and instantiate your enyo.Application kind in this file.  Note,
	application rendering should be deferred until DOM is ready by wrapping
	it in a call to enyo.ready().
*/

var
	kind = require("enyo/kind");

var
	Application = require("enyo/Application");

var
	MainView = require("./views/MainView");

module.exports = kind({
	name: "myapp.Application",
	kind: Application,
	view: MainView
});