QueueSkipper.Views.NewListingView = Backbone.View.extend({
  initialize: function(){
    this.mapView = new QueueSkipper.Views.NewListingMapView({
      model: this.model
    }).render();
    this.listingSidebar = new QueueSkipper.Views.NewListingSidebarView({
      model: this.model
    }).render();
  },
  
  template: JST['listings/new'],
  
  render: function(){
    this.$el.html(this.template);
    this.$('#new-listing-map').html(this.mapView.$el);
    this.$('#new-listing-sidebar').html(this.listingSidebar.$el);
    this.$('#datepicker1').datepicker({
      showOtherMonths: true,
      selectOtherMonths: true,
      // defaultDate: new Date(2001,01,01)
      defaultDate: this.getCurDate()
    });
    this.$('#datepicker1').val(this.getCurDate({string: true}));
    this.$('#timepicker1').timepicker({
      showInputs: false,
      minuteStep: 5
    });

    return this;
  },
  
  getCurDate: function (options) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    } 

    var changeLater = mm + '/' + dd + '/' + yyyy;

    var newToday = new Date(yyyy, mm, dd);

    //if the options hash has string: true in it, render a string, else render the date object
    if (options) {
      if (options.string) {
        console.log("hit stringify");
        console.log(changeLater);
        return changeLater;
      }
    } else {
      console.log("hit dateify");
      console.log(newToday);
      return newToday;
    }
  }
});