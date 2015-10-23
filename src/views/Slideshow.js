var
	kind = require("enyo/kind");

var
	utils = require("enyo/utils"),
	FluxDispatcher = require("enyo/FluxDispatcher");

var
	ImageView = require("layout/ImageView");

var
	Store = require("../data/Store"),
	ImageCollection = require("../data/ImageCollection");

module.exports = kind({
	name: "flickr.Slideshow",
	kind: ImageView,
	src: "assets/splash.png",
	published: {
		photos: null,
		delay: 3000
	},
	index: 0,
	create: function() {
		this.inherited(arguments);
		this.photos = new ImageCollection();
		FluxDispatcher.subscribe(Store.id, utils.bindSafely(this, this.update));
	},
	start: function() {
		this.next(true);
	},
	next: function(start) {
		if (!start) {
			this.index++;
			if (this.index >= this.photos.length) {
				this.index = 0;
			}
		}
		this.set("src", this.photos.at(this.index).get("original"));
		this.startJob("slideshow", "next", this.delay);
	},
	stop: function() {
		this.stopJob("slideshow");
		this.set("src", "assets/splash.png");
	},
	update: function(data) {
		console.log("Slideshow update");
		if (data && data.photos && data.photos.photo) {
			this.photos.empty({destroy:true});
			this.photos.add(data && data.photos && data.photos.photo);
		}
	}
});