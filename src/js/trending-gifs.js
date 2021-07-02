let arrGifsFavs = new Array();

if(localStorage.getItem('favoritos') !== null){
    arrGifsFavs = JSON.parse(localStorage.getItem('favoritos'));
}

let APIKEY = 'BR3gnJaBsqjYSwSCRdWScdLmlyjq0WeT';

let url = `https://api.giphy.com/v1/gifs/trending?api_key=${APIKEY}`

const fetchGifs = async () =>{
    try {
        const response = await fetch(url);
        const content = await response.json();
        //data, pagination, meta
        /* console.log(content.data);
        console.log('META', content.meta); */
        let gifs = content.data
        gifs.forEach(miGif => {
            cargarGif(miGif, 'trending');
        });
    } catch (error) {
        console.error(error);
    }
}
fetchGifs();

const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let ventanaGifs = document.querySelector('.ventana-gifs');
let ventanaGifsLength = document.querySelector('.ventana-gifs').offsetWidth;
const contGifs = document.querySelector('.contenedor-gifs');


window.addEventListener('resize', ()=>{
    ventanaGifsLength = document.querySelector('.ventana-gifs').offsetWidth;
    /* console.log(ventanaGifsLength); */
})
/* 
console.log('longitud de la ventana '+ventanaGifsLength); */
prev.classList.add('hide');
let index=0;
next.addEventListener('click', ()=>{
    index++;
    prev.classList.add('show');
    contGifs.style.transform = `translateX(-${index * ventanaGifsLength}px)`
    if((contGifs.offsetWidth - (index * ventanaGifsLength)) <= ventanaGifsLength){
        next.classList.add('hide');
    }
})

prev.addEventListener('click', ()=>{
    index--;
    next.classList.remove('hide');
    if (index===0){
        prev.classList.remove('show');
    }
    contGifs.style.transform = `translateX(-${index * ventanaGifsLength}px)`
})
