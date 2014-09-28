QueueSkipper.Views.MapView = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, "add", this.addListingPin);
    this.listenTo(this.collection, "remove", this.removeListingPin);
    this.mapOptions = {
      zoom: 1,
      center: new google.maps.LatLng(43.140023, -77.572386),
      mapTypeId: google.maps.MapTypeId.HYBRID      
    };
    this.mapBounds = {
      topLeft: [],
      bottomRight: []
    };
    //map can only have one InfoWindow
    this.infoWindow = new google.maps.InfoWindow({
      // content: contentString
      content: "HI MOM"
    });
    navigator.geolocation.getCurrentPosition(
      this.positionSuccess.bind(this), 
      this.positionError.bind(this)
    );
    //add all the listings that we have at initialize time
    this.collection.each(this.addListingPin.bind(this));
  },
  
  template: JST["search/map_view"],
  
  positionSuccess: function(position){
    this.mapOptions.center = new google.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    );

    this.map.setZoom(10);
    
    this.map.setCenter(this.mapOptions.center);
  },
  
  positionError: function(){
    alert('you must give position!');
  },
  
  addListingPin: function(listing){
    var myLatLng = new google.maps.LatLng(
      listing.attributes.latitude,
      listing.attributes.longitude
    );
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: this.map,
      title: listing.attributes.description
    });
    
    google.maps.event.addListener(marker, 'click', function() {
      window.$('button').css('background-color', 'transparent');
      window.$('li.listings-index-item [data-id=' + listing.attributes.id + ']').css('background-color', 'lightPink');
      if (this.infoWindow) {
        this.infoWindow.close();
      }
      this.infoWindow.open(this.map, marker);
    }.bind(this));
  },
  
  removeListingPin: function(listing){
    //write this later
    //find it by lat/lon, remove from map
  },

  render: function(){
    this.$el.html(this.template);
    this.mapify();
    return this;
  },
  
  mapify: function(){
    this.map = new google.maps.Map(this.$('#map-canvas')[0], this.mapOptions);
    
    //we need to debounce this to prevent spamming the server with requests
    google.maps.event.addListener(
      this.map,
      'idle',
      this.mapMoved.bind(this)
    );
  },
  
  mapMoved: function(){
    var bounds = this.map.getBounds();
    this.mapBounds.topLeft = [bounds.Ea.j, bounds.ua.j];
    this.mapBounds.bottomRight = [bounds.Ea.k, bounds.ua.k];
    var opts = { 
      data:{
        bounds: { 
          tl_lat: this.mapBounds.topLeft[0], 
          tl_long: this.mapBounds.topLeft[1], 
          br_lat: this.mapBounds.bottomRight[0], 
          br_long: this.mapBounds.bottomRight[1] 
        }
      }
    };
    
    this.collection.fetch(opts);
  }
})