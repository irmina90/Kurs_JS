function InputCtrl(inputView,store,http) {
    this._store = store;
    this._inputView = inputView;
    this._http = http;
    var self = this;

    this._inputView.on('clickOnButton', function(e){
        if(e.length > 0)
        {
            if(self._store.data.indexOf(e) === -1) self._store.add({
                'id': self._store.allTask,
                'value': e,
                'status': 'inactive'
            });
        }
        self.save();
    });

    this._inputView.on('clickOnButtonSave', function(){
        self.save();
    });
};

InputCtrl.prototype.save = function () {
    var self = this;

    var callback = function (err, response) {
        if (err) {
            throw err;
        }
        console.log(response);
    };

    this._http.request('/api/todos', 'POST', JSON.stringify(self._store.data), callback);
};

function ListCtrl(listView,store,http) {
    this._store = store;
    this._listView = listView;
    this._http = http;
    var self = this;

    self.load();

    this._store.on('addToTheList', function(e){
        self._listView.addLi(e);
    });

    this._listView.on('LiToActive', function(e){
        self._store.update(e,'active');
        self.update();
    });

    this._listView.on('LiToInactive', function(e){
        self._store.update(e,'inactive');
        self.update();
    });

};

ListCtrl.prototype.load = function () {
    var self = this;

    var callback = function (err, response) {
        if (err) {
            throw err;
        }
        console.log(response);
    };

    var requestData = function (data){
            for(var i=0; i<data.length; i++) {
            self._store.add({
                'id': data[i].id,
                'value': data[i].value,
                'status': data[i].status
            });
        }
    };

    this._http.request('/api/todos', 'GET', requestData, callback);

};

ListCtrl.prototype.update = function () {
    var self = this;

    var callback = function (err, response) {
        if (err) {
            throw err;
        }
        console.log(response);
    };

    this._http.request('/api/todos/', 'POST', JSON.stringify(self._store.data), callback);
};

function FooterCtrl(footerView,store) {
    this._store = store;
    this._footerView = footerView;
    var self = this;

    this._store.on('addStatistic', function(e){
        self._footerView.addStat(e);
    });

    this._store.on('updateStatistic', function(e){
        self._footerView.updateStat(e);
    });
};