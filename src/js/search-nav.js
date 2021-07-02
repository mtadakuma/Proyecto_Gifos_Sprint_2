


const navSearchInput = document.getElementById('nav-search');
const navSearchWrapper = document.querySelector('.nav-search-box');
const navSearchIconBox = document.querySelector('.nav-search-button');
const navSearchIconGrey = document.querySelector('.nav-search-button-grey');
const navCancelSearchIcon = document.querySelector('.nav-cancel-search');

navSearchIconGrey.style.opacity = 0;
navCancelSearchIcon.style.display = 'none';


navSearchInput.addEventListener('keyup', (e)=>{
    let input = navSearchInput.value;
    if(e.key == 'Enter'){
        emptyResults();
        cancelSearch();
        clearSearchResults();
        clicksVerMas=0
        fetchSearchGifs(navSearchInput.value,clicksVerMas);
        navSearchInput.value='';
        navSearchIconGrey.style.opacity = 0;
        navCancelSearchIcon.style.display = 'none';
        navSearchIconBox.style.display = 'block';
    }else if(input.length > 0){
        navSearchIconGrey.style.opacity = 1;
        navCancelSearchIcon.style.display = 'block';
        navSearchIconBox.style.display = 'none';
    }
    else{
        emptyResults();
        cancelSearch();
        clearSearchResults();
    }
})


cancelSearch();
clearSearchResults();

navCancelSearchIcon.addEventListener('click', ()=>{
    navSearchInput.value='';
    navSearchIconGrey.style.opacity = 0;
    navCancelSearchIcon.style.display = 'none';
    navSearchIconBox.style.display = 'block';
});
