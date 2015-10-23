var
	kind = require("enyo/kind");

var
	Image = require("enyo/Image");

var
	Panel = require("moonstone/Panel"),
	MoonImage = require("moonstone/Image"),
	Button = require("moonstone/Button"),
	ContextualPopupDecorator = require("moonstone/ContextualPopupDecorator"),
	ContextualPopupButton = require("moonstone/ContextualPopupButton"),
	ContextualPopup = require("moonstone/ContextualPopup");

var
	FittableLayout = require("layout/FittableLayout"),
	FittableColumnsLayout = FittableLayout.Columns;

module.exports = kind({
	name: "flickr.DetailPanel",
	kind: Panel,
	events: {
		onRequestFullScreen: ""
	},
	layoutKind: FittableColumnsLayout,
	components: [
		{kind: MoonImage, name: "image", fit: true, sizing:"contain", ontap:"requestFullScreen"}
	],
	headerComponents: [
		{kind: Button, ontap:"requestFullScreen", small:true, content:"View Fullscreen"},
		{kind: ContextualPopupDecorator, components: [
			{kind: ContextualPopupButton, small: true, content: "QR Code"},
			{kind: ContextualPopup, components: [
				{kind: Image, name:"qr", style:"height: 300px; width: 300px;"}
			]}
		]}
	],
	create: function() {
		this.inherited(arguments);
		if (this.model) {
			this.set("title", this.model.get("title"));
			this.set("$.image.src", this.model.get("original"));
			this.set("titleBelow", "By " + (this.model.get("username") || " unknown user"));
			this.set("$.qr.src", this.model.get("original") ? "https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=" + encodeURIComponent(this.model.get("original")) : "");
		}
	},
	requestFullScreen: function() {
		this.doRequestFullScreen({model: this.model});
	}
});