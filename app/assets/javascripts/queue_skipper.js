window.QueueSkipper = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Utils: {},
  initialize: function() {
    // QueueSkipper.lines = new QueueSkipper.Collections.Lines();
    new QueueSkipper.Routers.Router({
      $rootEl: $("#content")
    });
    // alert('Hello from Backbone!');
    Backbone.history.start();
  }
};
  
$(document).ready(function(){
  QueueSkipper.initialize();
 });
