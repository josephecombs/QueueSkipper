QueueSkipper.Views.NewListingSidebarView = Backbone.CompositeView.extend({
  template: JST['listings/new_listing_sidebar'],

  initialize: function () {


  },
  
  events: {
    'click .new-listing-sidebar-submit': 'submit'
  },
  
  submit: function () {
    
    this.model.set({
      latitude: this.$('#selected_latitude').val(),
      longitude: this.$('#selected_longitude').val(),
      max_price: this.$('#max_price').val(),
      description: this.$('#listing_description').val(),
      eta: this.$('#datepicker1').val() + " " + this.$('#timepicker1').val(),
      active: true
    });
    
    console.log(this.$('#max_price').val());
    //perform client-side validations on user input
    
    this.model.save({}, {
      url: 'api/listings/',
      type: 'post',
      //check ordering of status and response
      success: function (model, response, status) {
        //successfully booked listing
        this.$('.finalize-button').addClass('spinner');
        console.log("success");
        console.log(response);
      },
      error: function (model, response, status) {
        console.log("error!")
        console.log(response);
        //display the response object
      }
    });
    
    // this.$('div#description').addClass('has-success');
  },

  render: function () {
    var renderedContent = this.template({
      listing: this.model
    });

    this.$el.html(renderedContent);

    this.attachSubviews();

    return this;
  }
  
  
});