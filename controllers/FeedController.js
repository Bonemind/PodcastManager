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
