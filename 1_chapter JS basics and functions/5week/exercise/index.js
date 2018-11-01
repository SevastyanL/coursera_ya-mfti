module.exports = {
    subs: {},
    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {
    if (event === undefined || subscriber === undefined)
      return this;

    if (!this.subs.hasOwnProperty(event))
      this.subs[event] = [];

    this.subs[event].push( {subscriber: subscriber, handler: handler.bind(subscriber)} );
    return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
    if (this.subs[event] === undefined)
      return this;

    if (this.subs.hasOwnProperty(event)) {
      for (var i = this.subs[event].length - 1; i > -1; i--) {
        if (this.subs[event][i].subscriber === subscriber) {
          this.subs[event].splice(i, 1);
        }
      }
    }
    return this;
    },

    /**
     * @param {String} event
     */
    emit: function (event) {
    if (this.subs[event] !== undefined && this.subs[event].length > 0)
      for (var i = 0; i < this.subs[event].length; i++)
        this.subs[event][i].handler();

    return this;
    }
};
