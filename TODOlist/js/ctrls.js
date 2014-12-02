function InputCtrl(inputView,store) {
    this._store = store;
    this._inputView = inputView;
    var self = this;

    this._inputView.on('clickOnButton', function(e){
        if(e.length > 0)
        {
            if(self._store.data.indexOf(e) === -1) self._store.add(e);
        }
    });
};

function ListCtrl(listView,store,http) {
    this._store = store;
    this._listView = listView;
    this._http = http;
    var self = this;

    this._store.on('addToTheList', function(e){
        self._listView.addLi(e);
    });

    this._listView.on('LiToActive', function(e){
        self._store.update(e,'active');
    });

    this._listView.on('LiToInactive', function(e){
        self._store.update(e,'inactive');
    });

};

ListCtrl.prototype.load = function () {
    var callback = function (err, response) {
        if (err) {
            throw err;
        }
        console.log(response);
    }

    this._http.request('/api/todos', 'GET', requestData, callback);
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
    })


};