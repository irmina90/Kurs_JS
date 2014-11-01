var button = document.getElementsByClassName('button')[0];
var ul = document.getElementsByTagName('ul')[0];
var listOfLi = ul.getElementsByTagName('li');

button.addEventListener('click', function(){
    var name = document.getElementById('new-prod').value;
    var newProduct = name+'<div class="button">&#10006;</div>';
    var li = document.createElement('li');
    li.innerHTML = newProduct;

    if (listOfLi.length < 1) li.className='active';
    var add = ul.appendChild(li);
});

ul.addEventListener('click',function(event){
    if (event.target.tagName === "LI") {
        for(var i=0; i<listOfLi.length; i++) {
            listOfLi[i].classList.remove('active');
        }
        event.target.classList.add('active');
    }

    if (event.target.tagName === "DIV") {
        ul.removeChild(event.target.parentNode);
    }
});