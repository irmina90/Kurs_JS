function InputCtrl(inputView,store) {
    this._store = store;
    this._inputView = inputView;
    var self = this;

    this._inputView.on('clickOnButton', function(e){
        self.addToStore(e);
    });
};

InputCtrl.prototype.addToStore = function (task) {
    if(task.length > 0)
    {
        if(this._store.data.indexOf(task) === -1) this._store.add(task);
    }
};

function ListCtrl(listView,store) {
    this._store = store;
    this._listView = listView;
    var self = this;

    this._store.on('addToTheList', function(e){
        self.addToTheList(e);
    });

    this._listView.on('LiToActive', function(e){
        self.updateTheList(e,'active');
    });

    this._listView.on('LiToInactive', function(e){
        self.updateTheList(e,'inactive');
    });

};

ListCtrl.prototype.addToTheList = function (task) {
    this._listView.emit('addToHTML',task);
};

ListCtrl.prototype.updateTheList = function (id,data) {
    this._store.update(id,data);
};



function FooterCtrl(footerView,store) {
    this._store = store;
    this._footerView = footerView;
    var self = this;

    this._store.on('addStatistic', function(e){
        self.addStatistic(e);
    });

    this._store.on('updateStatistic', function(e){
        self.updateStatistic(e);
    })


};

FooterCtrl.prototype.addStatistic = function (number) {
    this._footerView.emit('addStat',number);
};

FooterCtrl.prototype.updateStatistic = function (number) {
    this._footerView.emit('updateStat',number);
};