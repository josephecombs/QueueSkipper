QueueSkipper.Views.NewListingSidebarView = Backbone.CompositeView.extend({
  template: JST['listings/new_listing_sidebar'],

  initialize: function () {


  },
  
  events: {
    'click .new-listing-sidebar-submit': 'submit'
  },
  
  submit: function () {
    //prevent multiple clicks
    this.$('.new-listing-sidebar-submit').addClass("disabled")

    this.model.set({
      latitude: this.$('#selected_latitude').val(),
      longitude: this.$('#selected_longitude').val(),
      max_price: this.$('.form-control#max_price').val(),
      description: this.$('#listing_description').val(),
      eta: this.$('#datepicker1').val() + " " + this.$('#timepicker1').val(),
      active: true
    });
    
    //this will help errors later
    if (this.$('#selected_latitude').val() === "right click somewhere on the map") {
      this.model.set({latitude: ""});
    }
    //perform client-side validations on user input
    
    this.model.save({}, {
      url: 'api/listings/',
      type: 'post',
      //check ordering of status and response
      success: function (model, response, status) {
        //successfully booked listing
        this.setAllGreen();

        this.$(".new-listing-sidebar-errors").empty();
        this.$('.finalize-button').addClass('spinner');
      }.bind(this),
      error: function (model, response, status) {

        this.decorateErrors(response);
        //display the response object
      }.bind(this)
    });
    

    this.$('.new-listing-sidebar-submit').removeClass("disabled")
  },

  render: function () {
    var renderedContent = this.template({
      listing: this.model
    });

    this.$el.html(renderedContent);

    this.attachSubviews();

    return this;
  },
  
  decorateErrors: function (response) {
    //set inputs as green
    this.setAllGreen();
    this.$(".new-listing-sidebar-errors").empty();
    //set error fields as red
    var responseArr = response.responseText.split(",");
    for (var i = 0; i < responseArr.length; i++) {
      //the fields with errors should be given "has-error" and 
      this.$(".new-listing-sidebar-errors").append('<div>' +
        this.dontJudgeMe(responseArr[i]) +
      '</div>');
      var selector =
        this.selectorsMap[this.parseErrorMessage(responseArr[i])];

      this.setRed(selector);
    }
    
    //append errors to the errors div
  },
  
  //this hash maps the first word of an error message to a css selector/rails column
  selectorsMap: {
    'Latitude': 'latitude',
    'Longitude': 'longitude',
    'Description': 'description',
    'Max': 'max_price',
    'Eta': 'eta'
  },
  
  setAllGreen: function () {
    this.$('.form-group').removeClass('has-error');
    this.$('.form-group').addClass('has-success');
  },
  
  setRed: function (selector) {
    this.$('.form-group#' + selector).removeClass('has-success');
    this.$('.form-group#' + selector).addClass('has-error');
  },
  
  parseErrorMessage: function (message) {
    //purify
    return this.dontJudgeMe(message.split(' ')[0]);
  },
  
  dontJudgeMe: function (string) {
    //yes... I understand this ought to be a regEx
    return string.replace("\"","").replace("[","").replace("]","").replace("\"","");
  }
  
});