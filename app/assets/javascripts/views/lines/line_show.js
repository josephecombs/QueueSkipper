QueueSkipper.Views.LineShow = Backbone.View.extend({
  template: _.template("<h1>Line Show View</h1><%= post.escape('title') %></h1><%= post.escape('body') %><a href='#/'>Index</a>"),
  render: function () {
    var renderedContent = this.template({
      line: this.model
    });
    this.$el.html(renderedContent);
    return this;
  }
});