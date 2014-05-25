Podman.Models.Feed = Backbone.Model.extend({
});

Podman.Models.Item = Backbone.Model.extend({
});

Podman.Collections.Feed = Backbone.Collection.extend({
 model: Podman.Models.Feed
});

Podman.Collections.Item = Backbone.Collection.extend({
 model: Podman.Models.Item,
});

Podman.Controllers.FeedController = BackboneMVC.Controller.extend({
 name: "feeds",
 default: function() {
  var feed1 = new Podman.Models.Feed({ name : "name1"});
  var feed2 = new Podman.Models.Feed({ name : "name2"});
  var feed3 = new Podman.Models.Feed({ name : "name3"});
  var feedCollection = new Podman.Collections.Feed();
  feedCollection.add(feed1);
  feedCollection.add(feed2);
  feedCollection.add(feed3);
  var feedsView = new Podman.Views.FeedsView({model: feedCollection});
  feedsView.render();
  $("#feeds").empty();
  $("#feeds").html(feedsView.el);
 },
 feed: function(x) {
  var item1 = new Podman.Models.Item({ name: "item1", media: "/test.mp3" });
  var item2 = new Podman.Models.Item({ name: "item2", media: "/test2.mp3" });
  var item3 = new Podman.Models.Item({ name: "item3", media: "/test.mp3" });
  var item4 = new Podman.Models.Item({ name: "item4", media: "/test2.mp3" });
  var ic = new Podman.Collections.Item();
  ic.add(item1);
  ic.add(item2);
  ic.add(item3);
  ic.add(item4);
  var itemsView = new Podman.Views.Items({model: ic});
  itemsView.render();
  $("#items").empty();
  $("#items").html(itemsView.el);
 }
});

Podman.Views.FeedView = Backbone.View.extend({
 tagName: "li",
 className: "list-group-item",
 initialize: function() {
  this.template = _.template('<a href="#/feeds/feed/x"><%- name %></a>');
 },
 render: function() {
  console.log(this.model.attributes);
  var html = this.template(this.model.attributes);
  this.$el.html(html);
 }
});

Podman.Views.FeedsView = Backbone.View.extend({
 tagName: "ul",
 className: "list-group",
 render: function() {
  _.each(this.model.models, function(feed){
   var feedView = new Podman.Views.FeedView({model: feed});
   feedView.render();
   this.$el.append(feedView.el);
  }, this);
 }
});

Podman.Views.Item = Backbone.View.extend({
 tagName: "tr",
 initialize: function() {
  this.template = _.template('<td><i class="play glyphicon glyphicon-play"></i><td><%- name %></td><td><%- media %>');
 },
 events: {
  "click .play" : "playItem",
 },
 render: function() {
  var html = this.template(this.model.attributes);
  this.$el.html(html);
 },
 playItem: function() {
  console.log(this.model);
  PlayerWrapper.setModel(this.model);
 }
});

Podman.Views.Items = Backbone.View.extend({
 tagName: "table",
 className: "table table-striped",
 initialize: function() {
  this.template = _.template("<tr><th>&nbsp;</th><th>Name</th><th>URL</th></tr>");
 },
 render: function() {
  this.$el.html(this.template());
  _.each(this.model.models, function(item) {
   var itemView = new Podman.Views.Item({model: item});
   itemView.render();
   this.$el.append(itemView.el);
  }, this);
 }
});
