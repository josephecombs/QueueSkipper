QueueSkipper.Views.ListingsIndex = Backbone.View.extend({
  events: {
    'click .delete': 'destroyListing'
  },

  template: JST['listings/index'],

  initialize: function () {
    this.listenTo(this.collection, 'sync destroy', this.render);
    this.mapOptions = {
      zoom: 12,
      //TODO: switch back to SF later, currently set to rochester to ensure user's location is consumed
      center: new google.maps.LatLng(43.140023, -77.572386)
    };

    var that = this;
    //updates this.mapOptions to user's geolocation
    navigator.geolocation.getCurrentPosition( 
      function(position) { 
        that.mapOptions.center = 
          new google.maps.LatLng(position.coords.latitude,
                                 position.coords.longitude);
        that.map =
          new google.maps.Map(that.$('#map-canvas')[0], that.mapOptions);

        that.drawListings(that.map, QueueSkipper.Collections.listings);
        
      },
      function () { 
        that.$('#map-canvas').html("USER MUST ALLOW ACCESS TO THEIR LOCATION")
      }
    );

  },
  
  drawListings: function (map, listings) {
    for (var i = 0; i < listings.length; i++) {
      var listing = listings.models[i];
      var myLatLng = 
        new google.maps.LatLng(
          listing.attributes.latitude, 
          listing.attributes.longitude
        );
      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: listing.attributes.description
      });
    }
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
    // this.map =
    //   new google.maps.Map(this.$('#map-canvas')[0], this.mapOptions);

    return this;
  },
});