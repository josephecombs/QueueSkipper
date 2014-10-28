QueueSkipper.Views.NewListingSidebarView = Backbone.CompositeView.extend({
  template: JST['listings/new_listing_sidebar'],

  initialize: function () {

  },
  
  events: {
    'click .new-listing-sidebar-submit': 'submit'
  },
  
  submit: function () {
    setTimeout(function() { alert('Hello') }, 2000);
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
    if (this.$('#selected_latitude').val() === "right click somewhere on the map to populate this field") {
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
        //we already know this has succeeded, this makes user value our service more.
        this.$('.finalize-button').addClass('disabled');
        setTimeout(function() {
          this.$('.loadspinner').removeClass('hidden')
        }.bind(this),10);
        setTimeout(function() {
          this.$('.listing-success').removeClass('hidden')      
        }.bind(this),2000);
        setTimeout(function() {
          //this is the wrong way to do it, fix later
          window.location = "/";
          // QueueSkipper.Routers.router.navigate("/");
        }.bind(this),4200);
      }.bind(this),  
        // setTimeout(function() { alert('hello') }.bind(this), 4600);

      error: function (model, response, status) {

        this.decorateErrors(response);
        //display the response object
      }.bind(this)
    });


    this.$('.new-listing-sidebar-submit').removeClass("disabled");
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
    this.$('.form-group > .form-control').css({'border-width':'1px'});
  },
  
  setRed: function (selector) {
    this.$('.form-group#' + selector).removeClass('has-success');
    this.$('.form-group#' + selector).addClass('has-error');
    this.$('.form-group#' + selector + '> .form-control').css({'border-width':'3px'});
    this.$('.form-group#' + selector).css('border-width: 3px');
  },
  
  parseErrorMessage: function (message) {
    //purify
    return this.dontJudgeMe(message.split(' ')[0]);
  },
  
  dontJudgeMe: function (string) {
    //please 
    return string.replace("\"","").replace("[","").replace("]","").replace("\"","");
  }
  
});