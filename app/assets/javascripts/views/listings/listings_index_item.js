QueueSkipper.Views.ListingsIndexItem = Backbone.View.extend({
  template: JST["listings/index_item"],
  
  initialize: function () {
    
  },
  
  render: function () {
    var lst = this.model;

    var renderedContent = this.template({
      listing: lst
    });

    this.$el.html(renderedContent);
    // this.$el.append(renderedContent);

    return this;
  }
});