

let contentArr;
let resultsName = new Array();
let clicksVerMas = 0;

const searchInput = document.getElementById('search');
const searchWrapper = document.querySelector('.search-box');
const resultsWrapper = document.querySelector('.results');
const resultsSeparator = document.querySelector('.results-separator');
const searchIconBox = document.querySelector('.search-button');
const searchIconGrey = document.querySelector('.search-button-grey');
const cancelSearchIcon = document.querySelector('.cancel-search');
const verMas = document.querySelector('.vermas');
const sinResultados = document.querySelector('.search-failure');
const trendingWords = document.querySelector('.trending-tags');
const searchResultados = document.querySelector('.search-results');
const titleContainer = document.querySelector('.title-container');
const titleSearch = document.querySelector('.title-search');
const searchResultSeparator = document.querySelector('.search-results-separator');



const fetchAutocomplete = async (input) =>{
    let url = `https://api.giphy.com/v1/gifs/search/tags?api_key=${APIKEY}&q=${input}&limit=5`;
    try {
        resultsName = [];
        const response = await fetch(url);
        const content = await response.json();
        let contentArr = content.data;
        contentArr.forEach(suggestion => {
            resultsName.push(suggestion.name);
        });
        renderResults(resultsName);
    } catch (error) {
        console.error(error);
    }
}


const fetchSearchGifs = async (input, index) =>{
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${input}&limit=12&rating=r&offset=${12*index}`
    try {
        const response = await fetch(url);
        const content = await response.json();
        let arrResultsGifs = content.data;
        titleSearch.innerHTML = input;
        if (arrResultsGifs.length == 0){
            showNoResults();
            titleSearch.textContent = 'No ingresaste texto';
        }else{
            arrResultsGifs.forEach(gif => {
                cargarGif(gif, '.search');
            });
            showResults();
            if(arrResultsGifs.length < 12){
                verMas.style.display = 'none';
            }else{
                verMas.style.display = 'block';
            }
        }

        
    } catch (error) {
        console.error(error);
    }
}

function renderResults(results){
    emptyResults();
    if(!results.length){
        return searchWrapper.classList.remove('show');
    }
    let max;
    if(results.length >= 5){
        max = 5;
    }else{
        max = results.length;
    }

    searchActive();
    resultsSeparator.style.display = 'block';
    for (let i = 0; i < max; i++) {
        let liItem = document.createElement('li');
        let linkItem = document.createElement('a');
        let searchImage = document.createElement('img');
        searchImage.src='./src/img/icon-search-result.svg';
        searchImage.alt = 'icon search';
        searchImage.classList.add('icon-search-result');

        linkItem.href="#";
        liItem.appendChild(searchImage);
        liItem.appendChild(linkItem);
        linkItem.textContent = results[i];
        liItem.addEventListener('click', ()=>{
            let input;
            input = liItem.textContent;
            searchInput.value='';
            emptyResults();
            cancelSearch();
            clearSearchResults();
            clicksVerMas=0;
            fetchSearchGifs(input,clicksVerMas); 
        });
        resultsWrapper.appendChild(liItem);
    }
    
    searchWrapper.classList.add('show');
    
}

searchInput.addEventListener('keyup', (e)=>{
    let input = searchInput.value;
    if(e.key == 'Enter'){
        searchInput.value='';
        emptyResults();
        cancelSearch();
        clearSearchResults();
        clicksVerMas=0;
        fetchSearchGifs(input,clicksVerMas);
    }else if(input.length>0){
        fetchAutocomplete(input);
    }else{
        emptyResults();
        cancelSearch();
        clearSearchResults();
    }
})

function emptyResults(){
    resultsWrapper.innerHTML="";
    resultsSeparator.style.display = 'none';
    searchWrapper.classList.remove('show');
}

function searchActive(){
    searchIconBox.style.display = 'none';
    searchIconGrey.style.opacity=1;
    cancelSearchIcon.style.display = 'block';
}

function cancelSearch(){
    searchIconBox.style.display = 'block';
    searchIconGrey.style.opacity=0;
    cancelSearchIcon.style.display = 'none';
}

function clearSearchResults(){
    trendingWords.style.display = 'block';
    verMas.style.display = 'none';
    sinResultados.style.display = 'none';
    titleContainer.style.display = 'none';
    searchResultados.innerHTML = "";
    searchResultSeparator.style.display = 'none';
}

function showNoResults(){
    trendingWords.style.display = 'block';
    sinResultados.style.display = 'block';
    titleContainer.style.display = 'block';
    searchResultSeparator.style.display = 'block';
}

function showResults(){
    trendingWords.style.display = 'none';
    sinResultados.style.display = 'none';
    titleContainer.style.display = 'block';
    searchResultSeparator.style.display = 'block';
}

cancelSearch();
clearSearchResults();

cancelSearchIcon.addEventListener('click', ()=>{
    searchInput.value='';
    emptyResults();
    cancelSearch();
    clearSearchResults();
});

verMas.addEventListener('click',()=>{
    clicksVerMas++;
    console.log(titleSearch.textContent);
    fetchSearchGifs(titleSearch.textContent, clicksVerMas);
});