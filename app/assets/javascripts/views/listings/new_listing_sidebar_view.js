QueueSkipper.Views.NewListingSidebarView = Backbone.CompositeView.extend({
  template: JST['listings/new_listing_sidebar'],

  initialize: function () {

  },

  render: function () {
    var renderedContent = this.template({
      listings: this.collection
    });

    this.$el.html(renderedContent);

    this.attachSubviews();

    return this;
  }
});