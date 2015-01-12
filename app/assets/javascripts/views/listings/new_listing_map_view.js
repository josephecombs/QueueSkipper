QueueSkipper.Views.NewListingMapView = Backbone.View.extend({
  initialize: function () {
    this.mapOptions = {
      zoom: 1,
      center: new google.maps.LatLng(43.140023, -77.572386),
      mapTypeId: google.maps.MapTypeId.HYBRID      
    };
    this.mapBounds = {
      topLeft: [],
      bottomRight: []
    };
    
    navigator.geolocation.getCurrentPosition(
      this.positionSuccess.bind(this),
      this.positionError.bind(this)
    );
    
    //selected lat/long will go in here
    this.selectedPosition = { latitude: 0.00, longitude: 0.00 };
  
  },
  
  template: JST["listings/new_listing_map"],
  
  positionSuccess: function(position){

    this.mapOptions.center = new google.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    );

    this.map.setZoom(10);
    
    this.map.setCenter(this.mapOptions.center);
    
    google.maps.event.trigger(this.map, "resize");
    
    google.maps.event.addListener(
      this.map,
      "rightclick",
      function(event) {
        this.selectedPosition.latitude = event.latLng.lat();
        this.selectedPosition.longitude = event.latLng.lng();
        this.placeMarker();
        //reach into the cookie jar of the global DOM
        $('#selected_latitude').val(this.selectedPosition.latitude);
        $('#selected_longitude').val(this.selectedPosition.longitude);
      }.bind(this)
    );    
  },
  
  placeMarker: function () {
    var myLatLng = new google.maps.LatLng(
      this.selectedPosition.latitude,
      this.selectedPosition.longitude
    );
    
    if (this.marker) {
      this.marker.setMap(null);
    }

    this.marker = new google.maps.Marker({
      position: myLatLng,
      map: this.map,
    });    
  },
  
  positionError: function(){
    //TODO: change this to center on SF if they don't give you a position
    alert('you must give position!');
  },
  
  render: function(){
    this.$el.html(this.template);
    this.mapify();
     setTimeout(function(){google.maps.event.trigger(this.map, "resize")}.bind(this), 10)
    return this;
  },
  
  mapify: function(){
    
    this.map = window.map = new google.maps.Map(this.$('#map-canvas')[0], this.mapOptions);
  },
  
  // rightClicked: function (event) {
  //   this.selectedPosition.latitude = event.latLng.lat();
  //   this.selectedPosition.longitude = event.latLng.lng();
  //   console.log(this.selectedPosition);
  // },
  
  mapMoved: function(){
    var bounds = this.map.getBounds();
	
	//again, to solve the .getBounds() return values changing, access first key with Object.keys(bounds)[0] and second key with Object.keys(bounds)[1]
	// this.mapBounds.topLeft = [bounds[Object.keys(bounds)[0]].j, bounds[Object.keys(bounds)[1]].j];
	//     this.mapBounds.bottomRight = [bounds[Object.keys(bounds)[1]].k, bounds[Object.keys(bounds)[1]].k];
	
	//fixing this bs again:
	var tl_lat = parseFloat(this.map.getBounds().toUrlValue().split(",")[2]);
	var tl_long = parseFloat(this.map.getBounds().toUrlValue().split(",")[1]);
	var br_lat = parseFloat(this.map.getBounds().toUrlValue().split(",")[0]);
	var br_long = parseFloat(this.map.getBounds().toUrlValue().split(",")[3]);
	
    var opts = { 
      data:{
        bounds: { 
          tl_lat: tl_lat,
          tl_long: tl_long,
          br_lat: br_lat,
          br_long: br_long
        }
      }
    };
	
	
    
    ////deprecated, we don't have a collection in the new map views
    // this.collection.fetch(opts);
  }
})