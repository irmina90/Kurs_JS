(function (global) {
    var EE;

    if (!global.UAM) {
        global.UAM = {};
    }

    EE = function () {
        //store the listeners somewhere
        this.listeners = {};
    };

    EE.prototype.on = function (eventName, listener, context) {
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

    EE.prototype.emit = function (eventName) {
        var args = Array.prototype.slice.call(arguments, 1);
        var listener = this.listeners[eventName];

        var count = 0;
        var j;
        for (j in listener) {
            if (listener.hasOwnProperty(j)) {
                count++;
            }
        }

        var length = count;
        var stored;

        for (var i = 0; i < length; i++) {
            stored = listener[i];
            stored.listener.apply(stored.context, args);
        }
    };

    global.UAM.EventEmitter = EE;

}(window));