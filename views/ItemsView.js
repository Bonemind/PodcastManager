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
