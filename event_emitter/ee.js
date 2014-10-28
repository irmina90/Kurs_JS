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

	EE.prototype.emit = function (eventName /*, other args...*/) {
		var args = Array.prototype.slice.call(arguments, 1);
		var listener = this.listeners[eventName];
	    var length = listener.length;
	    var stored;
		 
		for (var i = 0; i < length; i++) {
			stored = listener[i];
			stored.listener.apply(stored.context, args);
		}
	};

	
	var ee = new EE();
	var list1, list2, list3;
	
	ee.on('event', list1 = function(arg){
		console.log("Guten Morgen " + arg + " " + this.key);
	}, { key: 'listener1' });
	
	ee.on('event', list2 = function(arg){
		console.log("Guten Tag " + arg + " " + this.key);
	}, { key: 'listener2' });
	
	ee.emit('event','Frau Zietek');
	
	ee.on('event', list3 = function(arg){
		console.log("Guten Abend " + arg + " " + this.key);
	}, { key: 'listener3' });
	
	ee.emit('event','Weronika');
	
	
	global.UAM.EventEmitter = EE;

}(window));
