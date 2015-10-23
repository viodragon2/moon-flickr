var
	kind = require("enyo/kind");

var
	utils = require("enyo/utils"),
	FluxDispatcher = require("enyo/FluxDispatcher");

var
	Panel = require("moonstone/Panel"),
	Spinner = require("moonstone/Spinner"),
	Button = require("moonstone/Button"),
	DataGridList = require("moonstone/DataGridList"),
	GridListImageItem = require("moonstone/GridListImageItem");

var
	DetailPanel = require("./DetailPanel"),
	ActionConstants = require("../data/ActionConstants"),
	Store = require("../data/Store"),
	ImageCollection = require("../data/ImageCollection");

module.exports = kind({
	name: "flickr.SearchPanel",
	kind: Panel,
	published: {
		photos: null
	},
	events: {
		onRequestPushPanel: "",
		onRequestSlideshowStart: ""
	},
	handlers: {
		onInputHeaderChange: "search"
	},
	title: "Search Flickr",
	titleBelow: "Enter search term above",
	headerOptions: {inputMode: true, dismissOnEnter: true},
	headerComponents: [
		{kind: Spinner, content: "Loading...", showing:false, name: "spinner"},
		{kind: Button, small:true, name:"startButton", showing:false, content: "Start Slideshow", ontap: "startSlideshow"}
	],
	components: [
		{kind: DataGridList, fit:true, name: "resultList", minWidth: 250, minHeight: 300, ontap: "itemSelected", components: [
			{kind: GridListImageItem, imageSizing: "cover", useSubCaption:false, centered:false, bindings: [
				{from: "model.title", to:"caption"},
				{from: "model.thumbnail", to:"source"}
			]}
		]}
	],
	create: function() {
		this.inherited(arguments);
		this.set("$.resultList.collection", new ImageCollection());
		FluxDispatcher.subscribe(Store.id, utils.bindSafely(this, this.update));
	},
	search: function(inSender, inEvent) {
		FluxDispatcher.notify(Store.id, {
			actionType: ActionConstants.search,
			payload: {
				params : {
					method: "flickr.photos.search",
					sort: "interestingness-desc",
					per_page: 50,
					text: inEvent.originator.get("value")
				}
			}
		});
		this.$.spinner.setShowing(true);
	},
	update: function(data) {
		console.log("SearchPanel update");
		if (data && data.photos && data.photos.photo) {
			this.$.resultList.collection.empty({destroy:true});
			this.$.resultList.collection.add(data && data.photos && data.photos.photo);
			this.$.spinner.setShowing(false);
		}
		if (this.$.resultList.collection.length) {
			this.$.startButton.setShowing(true);
		} else {
			this.$.startButton.setShowing(false);
		}
	},
	itemSelected: function(inSender, inEvent) {
		this.$.resultList.collection.set("selected", inEvent.model);
		this.doRequestPushPanel({panel: {kind: DetailPanel, model: inEvent.model}});
	},
	startSlideshow: function() {
		this.doRequestSlideshowStart();
	}
});