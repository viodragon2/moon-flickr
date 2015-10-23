var
	kind = require("enyo/kind");

var
	Collection = require("enyo/Collection");

var
	ImageModel = require("./ImageModel");

module.exports = kind({
	name: "flickr.Collection",
	kind: Collection,
	model: ImageModel
});