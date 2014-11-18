UAM.Store = function () {
	UAM.EventEmitter.call(this);
	this.data  = [];
	this.allTask = 4;
	this.activeTask = 1;
};

UAM.utils.inherits(UAM.EventEmitter, UAM.Store);

UAM.Store.prototype.add = function (data) {
	this.data.push(data);
	this.allTask++;
	this.emit('addToTheList',data);
	this.emit('addStatistic',this.allTask);
};

UAM.Store.prototype.update = function (id,data) {
	if(data == 'active'){
		this.activeTask++;
	}
	if(data == 'inactive'){
		this.activeTask--;
	}
	this.emit('updateStatistic',this.activeTask);
};