UAM.InputView = function (elements) {
    UAM.EventEmitter.call(this);
    this._elements  = elements;
    var self = this;

    this._elements.querySelector('.button').addEventListener('click',function(){
        var name = document.getElementById('new-prod').value;
        self.emit('clickOnButton', name);
        document.getElementById('new-prod').value = '';
    });

    this._elements.querySelector('.button-save').addEventListener('click',function(){
        self.emit('clickOnButtonSave');
    });
};

UAM.utils.inherits(UAM.EventEmitter, UAM.InputView);


UAM.ListView = function (elements) {
    UAM.EventEmitter.call(this);
    this._elements  = elements;
    var self = this;

    document.querySelector('ul').addEventListener('click',function(event){
        var position = function() {
            var position = 0;
            var currentNode = event.target;
            var firstNode = currentNode.parentNode.firstChild;
            while(firstNode != currentNode) {
                position++;
                currentNode = currentNode.previousSibling;
            }
            console.log('pozycja: ' + position);
            return position;
        }

        if (event.target.tagName === "LI") {
            if ( event.target.classList.contains("inactive")) {
                event.target.classList.remove('inactive');
                event.target.classList.add('active');
                self.emit('LiToActive', position()); // -1
                //self.emit('clickOnButtonSave');

            }
            else {
                event.target.classList.remove('active');
                event.target.classList.add('inactive');
                self.emit('LiToInactive', position()); // -1
                //self.emit('clickOnButtonSave');
            }
        }
        event.stopPropagation();

    });
};

UAM.utils.inherits(UAM.EventEmitter, UAM.ListView);


UAM.ListView.prototype.addLi = function (data) {
    var li = document.createElement('li');
    var ul = document.getElementsByTagName('ul')[0];
    li.innerHTML = data.value;
    var newLi = ul.appendChild(li);
    newLi.classList.add(data.status);
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