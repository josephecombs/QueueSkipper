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
    
    google.maps.event.trigger(this.map, "resize");
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
      //TODO redo this to not reach into the DOM
      window.$('button').removeAttr('style');
      
      window.$('div.listings-index-item > .btn').css('border', '');
      window.$('div.listings-index-item').css('border', '');
      window.$('div.listings-index-item').css('background-color', '');
      window.$('div#listings-index-items > div > [data-id=' + listing.attributes.id + ']').css({'border':'thin solid black'});
      window.$('div#listings-index-items > div > [data-id=' + listing.attributes.id + ']').css({'background-color':'lightYellow'});
      window.$('div.listings-index-item [data-id=' + listing.attributes.id + ']').css({'background-color': 'lightPink', 'border':'thin solid black'});
      // window.$('div.listings-index-item [data-id=' + listing.attributes.id + '] ').hover(
      //   function ()
      //   {
      //     window.$('div.listings-index-item [data-id=' + listing.attributes.id + ']').removeAttr('style');
      //   },
      //   function ()
      //   {
      //     window.$('div.listings-index-item [data-id=' + listing.attributes.id + ']').css({'background-color': 'lightPink', 'border':'thin solid black'});
      //   }
      // );
      if (this.infoWindow) {
        this.infoWindow.close();
      }
	  console.log(listing.attributes.max_price);
      this.infoWindow.content = "$" + Math.floor(listing.attributes.max_price) + ".00";
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
    setTimeout(function(){google.maps.event.trigger(this.map, "resize")}.bind(this), 10)
    
    return this;
  },
  
  mapify: function(){
    this.map = window.map = new google.maps.Map(this.$('#map-canvas')[0], this.mapOptions);
    
    google.maps.event.addListener(
      this.map,
      'idle',
      this.mapMoved.bind(this)
    );
  },
  
  mapMoved: function(){

    var bounds = this.map.getBounds();

	//TODO: this is a serious problem.  bounds.Fa.j and k seem to be changing every so often... check the pins once in a while.  Figure out a diff way to consume this API.
    this.mapBounds.topLeft = [bounds.Fa.j, bounds.wa.j];
    this.mapBounds.bottomRight = [bounds.Fa.k, bounds.wa.k];
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