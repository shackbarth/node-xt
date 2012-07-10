/*jshint node:true, indent:2, curly:false, eqeqeq:true, immed:true, latedef:true, newcap:true, noarg:true,
regexp:true, undef:true, strict:true, trailing:true, white:true */
/*global XT:true */

(function () {
  "use strict";
  
  var _ = XT._;
  
  XT.CleanupTask = XT.Object.extend({
    task: XT.$K,
    context: null,
    init: function () {
      var context = this.get("context"), event;
      if (!context) return;
      if ((event = context.cleanupCompletedEvent)) {
        context.once(event, _.bind(this.completed, this));
        this.waitForEvent = true;
        console.log("FOUND ONE");
      }
    },
    exec: function () {
      var task = this.get("task"), waiting = this.waitForEvent;
      task();
      if (!waiting) this.completed();
    },
    completed: function () {
      // TODO: using emit here because set wasn't firing
      // might be due to event not firing if main loop  ends
      // and application ends
      this.emit("isComplete");
    }
  });
  
}());