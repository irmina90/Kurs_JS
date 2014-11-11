var button = document.getElementsByClassName('button')[0];
var ul = document.getElementsByTagName('ul')[0];
var listOfLi = ul.getElementsByTagName('li');
var allTasks = document.querySelector('.sum-tasks .number');
var activeTasks = document.querySelector('.active-tasks .number');

countTasks();

button.addEventListener('click', function(){
    var name = document.getElementById('new-prod').value;
    if(name.length > 0) {
        var li = document.createElement('li');
        li.innerHTML = name;
        var newLi = ul.appendChild(li);
        newLi.classList.add('inactive');

        countTasks();
    }
});

ul.addEventListener('click',function(event){
    if (event.target.tagName === "LI") {
        if ( event.target.classList.contains("inactive")) {
            event.target.classList.remove('inactive');
            event.target.classList.add('active');
        }
        else {
            event.target.classList.remove('active');
            event.target.classList.add('inactive');
        }

        countTasks();
    }
});

function countTasks(){
    var all = listOfLi.length;
    var count = 0;
    for(var i=0; i<all; i++) {
        if(listOfLi[i].classList.contains('active')) count++;
    }
    var active = count;

    allTasks.innerHTML = all;
    activeTasks.innerHTML = active;

}