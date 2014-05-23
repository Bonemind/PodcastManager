Podman.Views.Item = Backbone.View.extend({
 tagName: "tr",
 initialize: function() {
  this.template = _.template('<td><i class="glyphicon glyphicon-play"></i><td><%- name %></td><td><%- media %>');
 },
 render: function() {
  var html = this.template(this.model.attributes);
  this.$el.html(html);
 }
});
