QueueSkipper.Views.NewListingSidebarView = Backbone.CompositeView.extend({
  template: JST['listings/new_listing_sidebar'],

  initialize: function () {


  },

  render: function () {
    var renderedContent = this.template({
      listing: this.model
    });




    this.$el.html(renderedContent);

    this.attachSubviews();

    // $('#timepicker1').timepicker();

    return this;
  }
});