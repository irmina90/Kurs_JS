UAM.InputView = function (elements) {
    UAM.EventEmitter.call(this);
    this._elements  = elements;
    this.tasks = [];
    var self = this;

    this._elements.querySelector('.button').addEventListener('click',function(){
        var name = document.getElementById('new-prod').value;
        self.emit('clickOnButton', name);
        self.tasks.push(name);
    });

    this._elements.querySelector('.button-save').addEventListener('click',function(){
        self.emit('clickOnButtonSave', self.tasks);
    });
};

UAM.utils.inherits(UAM.EventEmitter, UAM.InputView);


UAM.ListView = function (elements) {
    UAM.EventEmitter.call(this);
    this._elements  = elements;

    var self = this;

    document.querySelector('ul').addEventListener('click',function(event){
        if (event.target.tagName === "LI") {
            if ( event.target.classList.contains("inactive")) {
                event.target.classList.remove('inactive');
                event.target.classList.add('active');

                self.emit('LiToActive', event.target.id);

            }
            else {
                event.target.classList.remove('active');
                event.target.classList.add('inactive');

                self.emit('LiToInactive', event.target.id);
            }
        }

    });
};

UAM.utils.inherits(UAM.EventEmitter, UAM.ListView);


UAM.ListView.prototype.addLi = function (task) {
    if(task.length > 0) {
        var li = document.createElement('li');
        var ul = document.getElementsByTagName('ul')[0];
        li.innerHTML = task;
        var newLi = ul.appendChild(li);
        newLi.classList.add('inactive');
    }
};

UAM.FooterView = function (elements) {
    UAM.EventEmitter.call(this);
    this._elements  = elements;

    var self = this;

};

UAM.utils.inherits(UAM.EventEmitter, UAM.FooterView);

UAM.FooterView.prototype.addStat = function (e) {
    var allTasks = this._elements.querySelector('.sum-tasks .number');
    allTasks.innerHTML = e;
};

UAM.FooterView.prototype.updateStat = function (e) {
    var activeTasks = this._elements.querySelector('.active-tasks .number');
    activeTasks.innerHTML = e;
};