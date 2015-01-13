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
    Backbone.history.start();
  }
};
  
$(document).ready(function(){
  QueueSkipper.initialize();
  
  $("a.close").click(function() {
	  $("div.alert").remove();
  });
  //from https://github.com/jaredhanson/passport-facebook/issues/12
	//   (function removeFacebookAppendedHash() {
	//     if (!window.location.hash || window.location.hash !== '_=_')
	//       return;
	//     if (window.history && window.history.replaceState)
	//       return window.history.replaceState("", document.title, window.location.pathname);
	//     // Prevent scrolling by storing the page's current scroll offset
	//     var scroll = {
	//       top: document.body.scrollTop,
	//       left: document.body.scrollLeft
	//     };
	//     window.location.hash = "";
	//     // Restore the scroll offset, should be flicker free
	//     document.body.scrollTop = scroll.top;
	//     document.body.scrollLeft = scroll.left;
	// console.log("tried to remove fb _=_ garbage");
	//   }());
  
});
