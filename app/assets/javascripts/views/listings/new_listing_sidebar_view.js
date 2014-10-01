QueueSkipper.Views.NewListingSidebarView = Backbone.CompositeView.extend({
  template: JST['listings/new_listing_sidebar'],

  initialize: function () {


  },
  
  events: {
    'click .new-listing-sidebar-submit': 'submit'
  },
  
  submit: function () {
    console.log("these are the days we've been waiting for");
    console.log(this.model)
  },

  render: function () {
    var renderedContent = this.template({
      listing: this.model
    });

    this.$el.html(renderedContent);

    this.attachSubviews();

    return this;
  }
  
  
});