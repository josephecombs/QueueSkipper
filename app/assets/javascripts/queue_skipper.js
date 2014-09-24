window.QueueSkipper = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new QueueSkipper.Routers.Router({
      $rootEl: $("#content")
    });
    alert('Hello from Backbone!');
    Backbone.history.start();
  }
};
  
$(document).ready(function(){
  QueueSkipper.initialize();
});
