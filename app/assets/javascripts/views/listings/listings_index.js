QueueSkipper.Views.ListingsIndex = Backbone.View.extend({
  events: {
    'click .delete': 'destroyListing'
  },

  template: JST['listings/index'],

  initialize: function () {
    // this.listenTo(this.collection, 'sync destroy', this.render);
//     this.mapOptions = {
//       zoom: 10,
//       //TODO: switch back to SF later, currently set to rochester to ensure user's location is consumed
//       center: new google.maps.LatLng(43.140023, -77.572386)
//     };
//     this.mapBounds = {
//       topLeft: [],
//       bottomRight: []
//     };
//
//     navigator.geolocation.getCurrentPosition(
//       function(position) {
//         this.mapOptions.center =
//           new google.maps.LatLng(position.coords.latitude,
//                                  position.coords.longitude);
//         this.map =
//           new google.maps.Map(this.$('#map-canvas')[0], this.mapOptions);
//         //attempt to listen to map bounds change:
//         google.maps.event.addListener(
//           this.map,
//           'bounds_changed',
//           function () {
//
//             console.log(this.map.getBounds());
//             var temp = this.map.getBounds();
//             this.mapBounds.topLeft = [temp.Ea.j, temp.ua.j];
//             this.mapBounds.bottomRight = [temp.Ea.k, temp.ua.k];
//             console.log(this.mapBounds);
//             var opts = { data: { tlt: 37.835573, tlg: -122.547144, brt: 37.737895, brg: -122.361750 }} ;
//             // debugger;
//             this.collection.fetch(opts);
//           }.bind(this)
//         );
//
//         //   debugger;
//         console.log(this.map.getBounds());
//         this.drawListings(this.map, QueueSkipper.Collections.listings);
//         // console.log(this.map.getBounds());
//
//       }.bind(this),
//       function () {
//         this.$('#map-canvas').html("USER MUST ALLOW ACCESS TO THEIR LOCATION");
//       }.bind(this)
    // );
    
    // this.listenTo(this.map, 'bounds_changed', function() {
    //   alert(this.map.getBounds());
    // });
    
  },
  
  // drawListings: function (map, listings) {
  //   for (var i = 0; i < listings.length; i++) {
  //     var listing = listings.models[i];
  //     var myLatLng =
  //       new google.maps.LatLng(
  //         listing.attributes.latitude,
  //         listing.attributes.longitude
  //       );
  //     var marker = new google.maps.Marker({
  //       position: myLatLng,
  //       map: map,
  //       title: listing.attributes.description
  //     });
  //   }
  // },
  //
  // destroyListing: function (eveant) {
  //   var $target = $(event.target);
  //   var listing = this.collection.get($target.attr('data-id'));
  //
  //   listing.destroy();
  // },

  render: function () {
    var renderedContent = this.template({
      listings: this.collection
    });
 //    // this.$el.html(renderedContent);
 //    this.$el.empty();
 //    this.delegateEvents();
    this.$el.html(renderedContent);
 //
 //    //   new google.maps.Map(this.$('#map-canvas')[0], this.mapOptions);

    return this;
  },
});