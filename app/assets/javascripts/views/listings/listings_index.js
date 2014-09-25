QueueSkipper.Views.ListingsIndex = Backbone.View.extend({
  events: {
    'click .delete': 'destroyListing'
  },

  template: JST['listings/index'],

  initialize: function () {
    this.listenTo(this.collection, 'sync destroy', this.render);
    this.mapOptions = {
      zoom: 8,
      //TODO: switch back to SF later, currently set to rochester to ensure user's location is consumed
      center: new google.maps.LatLng(43.140023, -77.572386)
    };

    var that = this;
    //updates this.mapOptions to user's geolocation
    navigator.geolocation.getCurrentPosition( 
      function(position) { 
        console.log(position.coords.latitude + " AAA " +
                    position.coords.longitude);
        that.mapOptions.center = 
          new google.maps.LatLng(position.coords.latitude,
                                 position.coords.longitude);
        that.map = 
          new google.maps.Map(this.$('#map-canvas')[0], that.mapOptions);
      },
      function () { 
        that.$('#map-canvas').html("USER MUST ALLOW ACCESS TO THEIR LOCATION")
      }
    );
  },

  destroyListing: function (event) {
    var $target = $(event.target);
    var listing = this.collection.get($target.attr('data-id'));

    listing.destroy();
  },

  render: function () {
    var renderedContent = this.template({
      listings: this.collection
    });
    this.$el.html(renderedContent);

    return this;
  },
});