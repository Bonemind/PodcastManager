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
