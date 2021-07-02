let clicks = 0;
const MAXCANT = 12;
const verMas = document.querySelector('.vermas');
let arrGifsFavs2 = new Array();


if(localStorage.getItem('favoritos') !== null){
    arrGifsFavs2 = JSON.parse(localStorage.getItem('favoritos'));
}

const sinFavs = document.querySelector('.empty-favorites');

if (localStorage.getItem('favoritos') === null || arrGifsFavs2.length == 0){
    console.log('no hay datos');
    /* sinFavs.style.display = 'block'; */
    verMas.style.display = 'none';
    sinFavs.classList.add('show');
}else{
    console.log('Hay datos');
    sinFavs.style.display = 'none';
    sinFavs.classList.remove('show');
    verMas.classList.add('show');
    console.log(sinFavs.style.display)
}



const cargarFavs =() =>{
    let j = clicks*MAXCANT
    if(j<arrGifsFavs2.length){
        while(j < clicks*MAXCANT + MAXCANT && j<arrGifsFavs2.length){
            cargarGif(arrGifsFavs2[j], 'favs');
            j++;
        }
    }
    clicks++;
    if(j>=arrGifsFavs2.length){
        verMas.style.opacity = 0;
    }
}
cargarFavs();
verMas.addEventListener('click', cargarFavs);
