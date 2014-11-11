UAM.EventEmitter = function () {
    //store the listeners somewhere
    this.listeners = {};
};

UAM.EventEmitter.prototype.on = function (eventName, listener, context) {
    var self = this;

    if (!this.listeners[eventName]) {
        this.listeners[eventName] = [];
    }

    var data = {
        listener: listener,
        context: context
    }

    this.listeners[eventName].push(data);

    return function () {
        var position = self.listeners[eventName].indexOf(data);
        if (position > -1){
            self.listeners[eventName].splice(position,1);
        }
    }
};

UAM.EventEmitter.prototype.emit = function (eventName /*, other args...*/) {
    var args = Array.prototype.slice.call(arguments, 1);
    var listener = this.listeners[eventName];
    var length = listener.length;
    var stored;

    for (var i = 0; i < length; i++) {
        stored = listener[i];
        stored.listener.apply(stored.context, args);
    }
};