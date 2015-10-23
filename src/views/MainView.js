var
	kind = require("enyo/kind");

var
	Panels = require("moonstone/Panels");

var
	Slideshow = require("./Slideshow"),
	SearchPanel = require("./SearchPanel");

module.exports = kind({
	name: "flickr.MainView",
	classes: "moon enyo-fit",
	handlers: {
		onRequestPushPanel: "pushPanel",
		onRequestFullScreen: "fullscreen",
		onRequestSlideshowStart: "startSlideshow"
	},
	components: [
		{kind: Slideshow, classes: "enyo-fit", src:"assets/splash.png"},
		{kind: Panels, classes: "enyo-fit", pattern: "alwaysviewing", popOnBack:true, components: [
			{kind: SearchPanel}
		]}
	],
	bindings: [
		{from: "$.panels.showing", to:"panelsShowing"}
	],
	pushPanel: function(inSender, inEvent) {
		this.$.panels.pushPanel(inEvent.panel);
	},
	fullscreen: function(inSender, inEvent) {
		this.$.slideshow.set("src", inEvent.model.get("original"));
		this.$.panels.hide();
	},
	startSlideshow: function() {
		this.$.slideshow.start();
		this.$.panels.hide();
	},
	panelsShowingChanged: function() {
		if (this.panelsShowing) {
			this.$.slideshow.stop();
		}
	}
});