let searchBarPositionY = 500;
let searchBarPositionX = 1200;
let searchBarNav = document.querySelector('.nav-search-box');
let headerWidth;

searchBarNav.style.display = 'none';

window.addEventListener('scroll',()=>{
    headerWidth = document.querySelector('header').offsetWidth;
    if(window.pageYOffset>searchBarPositionY && headerWidth>searchBarPositionX){
        searchBarNav.style.display = 'block';
    }else{
        searchBarNav.style.display = 'none';
    }
});


window.addEventListener('resize',()=>{
    headerWidth = document.querySelector('header').offsetWidth;
    if(headerWidth>searchBarPositionX && window.pageYOffset>searchBarPositionY){
        searchBarNav.style.display = 'block';
    }else{
        searchBarNav.style.display = 'none';
    }
});