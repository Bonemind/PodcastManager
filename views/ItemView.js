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
