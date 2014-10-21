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
		if (!this.listeners[eventName]) {
			this.listeners[eventName] = [];
		}
		this.listeners[eventName].push({listener: listener, context: context});
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
	
	EE.prototype.removeListener = function (eventName, listener) {
		var position = -1;
		if (this.listeners[eventName]) {
			position = this.listeners[eventName].indexOf(listener);
			console.log(position);
			if (position != -1){
				this.listeners[eventName].splice(position,1);
			}
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
	
	ee.removeListener('event',list1);
	ee.removeListener('event',list2);
	
	ee.emit('event','Weronika');
	
	
//	var ee = new EE();
//
//	var removeListener = ee.on('test', function (arg1, arg2) {
//		console.log(arg1, arg2, this.key);
//	}, { key: 'value' });
//
//	ee.emit('test', 1, 2); // 1, 2 value
//
//	removeListener(); //removes my listener from the event emitter;
//
//	ee.emit('test'); //nothing will execute

	global.UAM.EventEmitter = EE;

}(window));
