module.exports = {
  timers: [],
  newTimer: function (timer){
    this.timers.push(timer);
    return this.timers.indexOf(timer);
  },
  clearTimeout: function(timerId) {
    if(this.timers === null){
      return;
    }
    clearTimeout(this.timers[timerId]);
    this.timers.splice(this.timers.indexOf(timerId), 1);
  },
};
