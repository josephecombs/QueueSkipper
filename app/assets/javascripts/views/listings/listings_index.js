QueueSkipper.Views.ListingsIndex = Backbone.CompositeView.extend({
  template: JST['listings/index'],

  initialize: function () {
    // this.listingsIndexItem = new QueueSkipper.Views.ListingsIndexItem({
    //   collection: this.collection
    // }).render();
    this.collection.each( function (listing) {
      this.addListingItem(listing);
    }.bind(this));
    
    this.listenTo(this.collection, "add", this.addListingItem);
    this.listenTo(this.collection, "remove", this.removeListingItem);
    this.curModalView = "test";
  },
  
  addListingItem: function (listing) {
    var listingsIndexItem = new QueueSkipper.Views.ListingsIndexItem({
      model: listing
    });
    
    this.addSubview('#listings-index-items', listingsIndexItem);

  },
  
  removeListingItem: function (listing) {
    
    if (this.subviews('#listings-index-items')) {
      var listingsIndexItem = new QueueSkipper.Views.ListingsIndexItem({ 
        model: listing
      });
      
      // console.log(this.subviews('#listings-index-items'));
      
      for (var i = 0; i < this.subviews('#listings-index-items').length; i++) {
        if (this.subviews('#listings-index-items')[i].model.attributes.id === listingsIndexItem.model.attributes.id){
          this.removeSubview('#listings-index-items',   
          this.subviews('#listings-index-items')[i]);
        }
      }
    }
    
    ////old way:
    // $('li').filter(function(){
    //     return $(this).data('id') === listing.attributes.id;
    // }).remove();
  },

  render: function () {
    var renderedContent = this.template({
      listings: this.collection
    });

    this.$el.html(renderedContent);

    this.attachSubviews();

    return this;
  }
});