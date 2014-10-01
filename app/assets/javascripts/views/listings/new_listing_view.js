QueueSkipper.Views.NewListingView = Backbone.View.extend({
  initialize: function(){
    this.mapView = new QueueSkipper.Views.NewListingMapView({
      model: this.model
    }).render();
    this.listingSidebar = new QueueSkipper.Views.NewListingSidebarView({
      model: this.model
    }).render();
  },
  
  template: JST['listings/new'],
  
  render: function(){
    this.$el.html(this.template);
    this.$('#new-listing-map').html(this.mapView.$el);
    this.$('#new-listing-sidebar').html(this.listingSidebar.$el);
    return this;
  },
});