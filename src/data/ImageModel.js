var
	kind = require("enyo/kind");

var
	Model = require("enyo/Model");

module.exports = kind({
	name: "flickr.ImageModel",
	kind: Model,
	computed: [
		{method: "thumbnail", path: ["farm", "server", "id", "secret"]},
		{method: "original", path: ["farm", "server", "id", "secret"]}
	],
	thumbnail: function() {
		return "https://farm" + this.get("farm") +
			".static.flickr.com/" + this.get("server") +
			"/" + this.get("id") + "_" + this.get("secret") + "_m.jpg";
	},
	original: function() {
		return "https://farm" + this.get("farm") +
			".static.flickr.com/" + this.get("server") +
			"/" + this.get("id") + "_" + this.get("secret") + ".jpg";
	}
});