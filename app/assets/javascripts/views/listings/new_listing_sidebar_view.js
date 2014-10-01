QueueSkipper.Views.NewListingSidebarView = Backbone.CompositeView.extend({
  template: JST['listings/new_listing_sidebar'],

  initialize: function () {


  },
  
  events: {
    'click .new-listing-sidebar-submit': 'submit'
  },
  
  submit: function () {

    console.log(this.model);
    
    this.model.set({
      latitude: this.$('#selected_latitude').val(),
      longitude: this.$('#selected_longitude').val(),
      max_price: this.$('#max_price').val(),
      description: this.$('#listing_description').val(),
      eta: this.$('#datepicker1').val() + " " + this.$('#timepicker1').val()
    });
    
    //perform client-side validations on user input
    
    debugger;
    
    this.$('div#description').addClass('has-success');
    debugger;
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