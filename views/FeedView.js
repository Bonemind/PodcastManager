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
