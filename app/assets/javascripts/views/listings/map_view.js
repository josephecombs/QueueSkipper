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
    });
	
	console.log("does the browser even ask for user's position?");
	
    navigator.geolocation.getCurrentPosition(
      this.positionSuccess.bind(this),
      this.positionError.bind(this)
    );
	
	  //     navigator.geolocation.getCurrentPosition(
	  // function() {
	  //     console.log("success");
	  // },
	  //       function() {
	  //       	  console.log("failure");
	  //       }
	  //     );

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
	console.log("successfully set the zoom of the map to 10");
    
    this.map.setCenter(this.mapOptions.center);
    
    google.maps.event.trigger(this.map, "resize");
  },
  
  positionError: function(){
    console.log("user did not give their geolocation for some reason");
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

	//right now, this is necessary because the values of the keys returned by .getBounds() seem to be changing at random.  Therefore, I have to pick out the first key with Object.keys(bounds)[0] and the second key with Object.keys(bounds)[1] 
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
	//     console.log("trying to fetch listings collection with these options:")
	// console.log(opts)
    this.collection.fetch(opts);
  }
})