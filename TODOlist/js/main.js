var button = document.getElementsByClassName('button')[0];
var ul = document.getElementsByTagName('ul')[0];
var listOfLi = ul.getElementsByTagName('li');

button.addEventListener('click', function(){
    var name = document.getElementById('new-prod').value;
    var li = document.createElement('li');
    li.innerHTML = name;
    var newLi = ul.appendChild(li);

    newLi.classList.add('inactive');

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
    }
});