const cargarGif = (gif, tipo) =>{

    let arrMisGifos = [];
    if(localStorage.getItem('misGifos') !== null){
        arrMisGifos = JSON.parse(localStorage.getItem('misGifos'));
    }

    let fig = document.createElement('div');
    let img = document.createElement('img');
    let overlay = document.createElement('div');
    let card_icons = document.createElement('div');
    let button1 = document.createElement('button');
    let button2 = document.createElement('button');
    let button3 = document.createElement('button');
    let button4 = document.createElement('button');
    let imgBtn1 = document.createElement('img');
    let imgBtn2 = document.createElement('img');
    let imgBtn3 = document.createElement('img');
    let imgBtn4 = document.createElement('img');
    let gif_caption = document.createElement('div');
    let user = document.createElement('p');
    let titulo = document.createElement('h5');

    button1.appendChild(imgBtn1);
    button2.appendChild(imgBtn2);
    button3.appendChild(imgBtn3);
    button4.appendChild(imgBtn4);

    if(tipo == 'misGifos'){
        card_icons.appendChild(button4);
    }else{
        card_icons.appendChild(button1);
    }
    card_icons.appendChild(button2);
    card_icons.appendChild(button3);

    gif_caption.appendChild(user);
    gif_caption.appendChild(titulo);

    overlay.appendChild(card_icons);
    overlay.appendChild(gif_caption);
    overlay.classList.add('overlay');
    card_icons.classList.add('card-icons');
    button1.classList.add('pointer');
    button2.classList.add('pointer');
    button3.classList.add('pointer');
    button4.classList.add('pointer');
    
    if(posicionFavorito(arrGifsFavs,gif) == -1){
        imgBtn1.src = "./src/img/icon-fav-normal.svg"
    }else{
        imgBtn1.src = "./src/img/icon-fav-active.svg"
    }

    imgBtn1.alt = "icono favorito"
    imgBtn1.classList.add('icon');
    imgBtn1.classList.add('svg-active');
    imgBtn1.classList.add('svg-hover');

    imgBtn2.src = "./src/img/icon-download-normal.svg"
    imgBtn2.alt = "icono descarga"
    imgBtn2.classList.add('icon');
    imgBtn2.classList.add('svg-hover');

    imgBtn3.src = "./src/img/icon-max-normal.svg"
    imgBtn3.alt = "icono expandir"
    imgBtn3.classList.add('icon');
    imgBtn3.classList.add('svg-hover');

    imgBtn4.alt = "icono trash"
    imgBtn4.src = "./src/img/icon-trash-normal.svg"
    imgBtn4.classList.add('icon');
    imgBtn4.classList.add('svg-hover');

    gif_caption.classList.add('gif-caption');
    user.classList.add('card-user');
    titulo.classList.add('subtitulo-6');

    if(tipo!='misGifos'){
        if(gif.user !== undefined){
            user.textContent = gif.user.display_name;
        }else{
            user.textContent = 'Anonymous';
        }
        titulo.textContent = gif.title;
    }else{
        user.textContent = 'mtadakuma';
        titulo.textContent = 'Mi Gif';
    }
    

    let out;
    if(tipo == 'trending'){
        out  = document.querySelector('.contenedor-gifs');
        fig.classList.add('card');
        /* out.insertAdjacentElement('afterbegin', fig); */
        out.appendChild(fig);
    }else if(tipo == 'favs'){
        out = document.querySelector('.favs');
        fig.classList.add('card-other');
        out.appendChild(fig);
    }else if(tipo == '.search'){
        out = document.querySelector('.search-results');
        fig.classList.add('card-other');
        out.appendChild(fig);
    }else if(tipo == 'misGifos'){
        out = document.querySelector('.gifos');
        fig.classList.add('card-other');
        out.appendChild(fig);
    }
    img.src = gif.images.downsized.url;
    img.alt = gif.title;
    fig.appendChild(img);
    fig.appendChild(overlay);
    

    imgBtn1.addEventListener('mouseover', changeIconsHover);
    imgBtn1.addEventListener('mouseout', changeIconsHover);
    imgBtn2.addEventListener('mouseover', changeIconsHover);
    imgBtn2.addEventListener('mouseout', changeIconsHover);
    imgBtn3.addEventListener('mouseover', changeIconsHover);
    imgBtn3.addEventListener('mouseout', changeIconsHover);
    imgBtn4.addEventListener('mouseover', changeIconsHover);
    imgBtn4.addEventListener('mouseout', changeIconsHover);
    imgBtn1.addEventListener('click', changeIconsActive);

    imgBtn1.addEventListener('click', ()=>{
        AltaBajaFavorito(arrGifsFavs, gif);
    });

    imgBtn2.addEventListener('click', ()=>{
        downloadEvent(gif);
    })

    imgBtn3.addEventListener('click', ()=>{
        expandirImagen(gif);
    })

    imgBtn4.addEventListener('click', ()=>{
        eliminarGifo(arrMisGifos, gif);
        location.reload(); 
    })

    img.addEventListener('click', ()=>{
        expandirImagen(gif);
    })

}

function downloadEvent(gif){
    (async () => {
        let a = document.createElement('a');
        let response = await fetch(`${gif.images.original.url}`);
        let file = await response.blob();
        a.download = gif.id;
        a.href = window.URL.createObjectURL(file);
        a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
        a.click();
    })();
}


function expandirImagen(gif){
    let body = document.querySelector('body');
    let imagen = document.createElement('img');
    let botonCerrar = document.createElement('button');
    let cardContainer = document.createElement('div');
    let card = document.createElement('div');
    let imagenCerrar = document.createElement('img');
    let card_icons = document.createElement('div');
    let button1 = document.createElement('button');
    let button2 = document.createElement('button');
    let imgBtn1 = document.createElement('img');
    let imgBtn2 = document.createElement('img');
    let gif_caption = document.createElement('div');
    let user = document.createElement('p');
    let titulo = document.createElement('h5');
    let cardCaptions = document.createElement('div');
    let cardContainerContainer = document.createElement('div');

    button1.appendChild(imgBtn1);   //favs
    button2.appendChild(imgBtn2);   //download

    //contenedor de botones
    card_icons.appendChild(button1);    
    card_icons.appendChild(button2);

    //contenedor de texto
    gif_caption.appendChild(user);
    gif_caption.appendChild(titulo);

    //TO DO: Clase popup-card-icons
    card_icons.classList.add('popup-card-icons');
    button1.classList.add('pointer');
    button2.classList.add('pointer');

    //Verificar si existen los favoritos
    if(posicionFavorito(arrGifsFavs,gif) == -1){
        imgBtn1.src = "./src/img/icon-fav-normal.svg"
    }else{
        imgBtn1.src = "./src/img/icon-fav-active.svg"
    }

    //Favorito
    imgBtn1.alt = "icono favorito"
    imgBtn1.classList.add('icon');
    imgBtn1.classList.add('svg-active');
    imgBtn1.classList.add('svg-hover');

    //download
    imgBtn2.src = "./src/img/icon-download-normal.svg"
    imgBtn2.alt = "icono descarga"
    imgBtn2.classList.add('icon');
    imgBtn2.classList.add('svg-hover');

    //textos
    gif_caption.classList.add('popup-caption');
    user.classList.add('popup-card-user');
    titulo.classList.add('popup-card-title');
    
    //Asigno un usuario anonymous si no existe
    if(gif.user !== undefined){
        user.textContent = gif.user.display_name;
    }else{
        user.textContent = 'Anonymous';
    }
    titulo.textContent = gif.title;

    if(user.textContent =='' && titulo.textContent == ''){
        user.textContent = 'mtadakuma';
        titulo.textContent = 'Mi Gif';
    }

    //popup
    let popup = document.createElement('div');
    popup.classList.add('popup');

    //boton X
    botonCerrar.classList.add('icon');
    botonCerrar.classList.add('svg-hover');
    botonCerrar.classList.add('popup-button');
    imagenCerrar.src = './src/img/close.svg'
    imagenCerrar.alt = 'boton cerrar';
    botonCerrar.appendChild(imagenCerrar);
    botonCerrar.addEventListener('click', closePopup);
    popup.appendChild(botonCerrar);

    cardContainerContainer.classList.add('popup-card-container-container');
    cardContainer.classList.add('popup-card-container');
    card.classList.add('popup-card');

    //mi gif
    imagen.src = gif.images.original.url;
    imagen.alt = gif.title;
    imagen.classList.add('popup-image');

    //textos + iconos
    cardCaptions.appendChild(gif_caption);
    cardCaptions.appendChild(card_icons);

    cardCaptions.classList.add('popup-caption-buttons');

    card.appendChild(imagen);
    card.appendChild(cardCaptions);
    cardContainer.appendChild(card);
    cardContainerContainer.appendChild(cardContainer);
    popup.appendChild(cardContainerContainer);
    body.appendChild(popup);

    
    imgBtn1.addEventListener('mouseover', changeIconsHover);
    imgBtn1.addEventListener('mouseout', changeIconsHover);
    imgBtn2.addEventListener('mouseover', changeIconsHover);
    imgBtn2.addEventListener('mouseout', changeIconsHover);
    imgBtn1.addEventListener('click', changeIconsActive);
    imgBtn1.addEventListener('click', ()=>{
        AltaBajaFavorito(arrGifsFavs, gif);
        /* console.log(arrGifsFavs); */
        /* window.location.reload() */
    });

    imgBtn2.addEventListener('click', ()=>{
        downloadEvent(gif);
    })
}


const closePopup = () =>{
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
}