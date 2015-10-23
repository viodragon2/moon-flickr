var
	kind = require("enyo/kind");

var
	utils = require("enyo/utils"),
	JsonpSource = require("enyo/JsonpSource"),
	FluxStore = require("enyo/FluxStore");

var
	ActionConstants = require("./ActionConstants");

var flickrSource = kind({
	name: "flickrSource",
	kind: JsonpSource,
	urlRoot: "https://api.flickr.com/services/rest/",
	fetch: function(rec, opts) {
		opts.callbackName = "jsoncallback";
		opts.params = utils.clone(rec.params);
		opts.params.api_key = "2a21b46e58d207e4888e1ece0cb149a5";
		opts.params.format = "json";
		this.inherited(arguments);
	}
});

new flickrSource({name: "flickrSource"});

var Store = kind({
	name: "flickr.Store",
	kind: FluxStore,
	source: "flickrSource",
	update: function(action) {

		//handle dispatched actions to the store
		switch(action.actionType) {
			case ActionConstants.search:
				this.search(action.payload);
				break;
			default:
				//default code block
		}
	},
	search: function(data) {
		//do something here with your source
		this.params = data.params;
		this.url = "";
		this.fetch(data);
	}
});

// export instance of store
module.exports = new Store();