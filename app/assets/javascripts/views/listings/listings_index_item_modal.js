QueueSkipper.Views.ListingsIndexItemModal = Backbone.CompositeView.extend({
  template: JST['listings/index_item_modal'],
  
  initialize: function () {
    this.model.fetch();
  },
  
  events: {
    'click .listings-index-item-modal-dismiss': 'dismiss',
    'click .listings-index-item-modal-book': 'book',
    'keyup .listings-index-item-modal': 'keyDownHandler'
  },
  
  keyDownHandler: function (event) {
    switch (event.which) {
      case 27: this.remove();
    }
  },
  
  dismiss: function (event) {
    event.preventDefault();
    this.remove();
  },  
  
  book: function () {
    this.$('.listings-index-item-modal-book').hide();

    // this.model.set(booker_id: //something goes here I'll figure out what I have access to here
    
    this.model.save({}, {
      url: 'api/listings/' + this.model.get('id') + '/book',
      type: 'post',
      //check ordering of status and response
      success: function (model, response, status) {
        //successfully booked listing
        setTimeout(function() {
          this.$('.modal-profile-pic').addClass('spinner');
        }.bind(this),4000);
        setTimeout(function() {
          this.$('.loadspinner').removeClass('hidden')
        }.bind(this),10);
        setTimeout(function() {
          this.$('.loadspinner').addClass('hidden')
        }.bind(this),2000);
        setTimeout(function() {
          this.$('.listings-index-item-modal').append('<div>THANK YOU FOR YOUR PATRONAGE!</div>');
        }.bind(this),2000);
      },
      error: function (model, response, status) {
        console.log(response);
        //display the response object
      }
    });
    
  },
  
  render: function () {
    var content = this.template({ listingIndexItem: this.model });

    //this.model.attributes.id
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
  
});