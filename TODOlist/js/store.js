UAM.Store = function () {
	UAM.EventEmitter.call(this);
	this.data  = [];
	this.allTask = 0;
	this.activeTask = 0;
};

UAM.utils.inherits(UAM.EventEmitter, UAM.Store);

UAM.Store.prototype.add = function (data) {
	this.data.push(data);
	this.allTask++;

	if (data.status == 'active') this.activeTask++;

	this.emit('addToTheList',data);
	this.emit('addStatistic',this.allTask);
	this.emit('updateStatistic',this.activeTask);
};

UAM.Store.prototype.update = function (id,data) {
	var self = this;

	console.log("id: " + id + " data: " + data);
	self.data[id].status = data;

	if(data === 'active'){
		this.activeTask++;
	}
	if(data === 'inactive'){
		this.activeTask--;
	}

	this.emit('updateStatistic',this.activeTask);
};