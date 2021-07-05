let botonComenzar = document.querySelector('.boton-start');
let paso1 = document.getElementById('paso1');
let paso2 = document.getElementById('paso2');
let paso3 = document.getElementById('paso3');
let crearPaso1 = document.querySelector('.crear-paso1');
let crearPaso2 = document.querySelector('.crear-paso2');
let videoRec = document.querySelector('.video-rec');
let botonGrabar = document.querySelector('.boton-grabar');
let botonFinalizar = document.querySelector('.boton-finalizar');
let timer = document.querySelector('.timer');
let repetir = document.querySelector('.repetir');
let botonSubir = document.querySelector('.boton-subir');
let loaderCont = document.querySelector('.loader-cont');
let loaderText = document.querySelector('.loader-text');
let loaderImg= document.querySelector('.loader-img');
let successText = document.querySelector('.success-text');
let successImg= document.querySelector('.success-img');
let botonDownload = document.querySelector('.download-btn');
let botonDownloadCont = document.querySelector('.download-cont');
let arrMisGifos = new Array();


if(localStorage.getItem('misGifos') !== null){
    arrMisGifos = JSON.parse(localStorage.getItem('misGifos'));
}

botonDownload.addEventListener('mouseover', changeIconsHover);
botonDownload.addEventListener('mouseout', changeIconsHover);

let APIKEY = 'BR3gnJaBsqjYSwSCRdWScdLmlyjq0WeT';

botonComenzar.addEventListener('click',()=>{
    botonComenzar.style.display = 'none';
    paso1.classList.add('paso1');
    crearPaso1.style.display = 'none';
    crearPaso2.style.display = 'block';
    getStreamAndRecord();
});


function getStreamAndRecord () { 
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true
    }).then(function(stream) {
    crearPaso2.style.display = 'none';
    paso1.classList.remove('paso1');
    paso2.classList.add('paso2');
    botonGrabar.style.display = 'block';
    timer.style.display = 'block';

    videoRec.style.display = 'block';
    videoRec.srcObject = stream;
    videoRec.play();
    
    var recorder = RecordRTC(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        onGifRecordingStarted: function() {
        console.log('started')
    },
    });

    var timeInterval;
    botonGrabar.addEventListener('click',()=>{
        timeInterval = setInterval(countTimer, 1000);
        botonGrabar.style.display = 'none';
        botonFinalizar.style.display = 'block';
        recorder.startRecording();
    });
    
    botonFinalizar.addEventListener('click',()=>{
        clearInterval(timeInterval);
        timer.style.display = 'none';
        repetir.style.display = 'block';
        recorder.stopRecording();
        botonFinalizar.style.display = 'none';
        botonSubir.style.display = 'block';
    });

    repetir.addEventListener('click',()=>{
        botonFinalizar.style.display = 'none';
        botonSubir.style.display = 'none';
        botonGrabar.style.display = 'block';
        timer.style.display = 'block';
        repetir.style.display = 'none';
        timer.innerHTML = '00:00:00';
        totalSeconds = 0;
        recorder.reset();
    });
    
    botonSubir.addEventListener('click', ()=>{
        botonSubir.style.display = 'none';
        paso2.classList.remove('paso2');
        paso3.classList.add('paso3');
        repetir.style.display = 'none';

        let form = new FormData();
        form.append('file', recorder.getBlob(), 'myGif.gif');
        console.log(form.get('file'))
        let url = `https://upload.giphy.com/v1/gifs?api_key=${APIKEY}`
        loaderCont.style.opacity= 1;
        loaderText.style.display = 'block';
        loaderImg.style.display = 'block';
        successText.style.display = 'none';
        successImg.style.display = 'none';
        fetch(url, {
            method: 'POST',
            body: form,
        })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
            console.log(result.data.id);
            loaderText.style.display = 'none';
            loaderImg.style.display = 'none';
            successText.style.display = 'block';
            successImg.style.display = 'block';
            let idDeMiGif = result.data.id;
            //Agrego mi id de gif en arrMisGifos
            arrMisGifos.push(idDeMiGif);
            //Agrego mi array en el local storage
            localStorage.setItem('misGifos', JSON.stringify(arrMisGifos));
            botonDownloadCont.style.display = 'block';
            botonDownload.addEventListener('click', ()=>{
                let urlMisGifs = `https://api.giphy.com/v1/gifs/${idDeMiGif}?api_key=${APIKEY}`
                fetch(urlMisGifs)
                .then(response => response.json())
                .then(content => {
                    let gif = content.data;
                    downloadEvent(gif);
                })
            })  
        })
        .catch(error => {
            console.error('Error:', error);
        });
    })

    }).catch(error => {
        console.error('No diste permiso a la camara :( ', error);
    });
}


let totalSeconds = 0;
function countTimer() {
    totalSeconds++;
    var hour = Math.floor(totalSeconds /3600);
    var minute = Math.floor((totalSeconds - hour*3600)/60);
    var seconds = totalSeconds - (hour*3600 + minute*60);
    if(hour < 10)
        hour = "0"+hour;
    if(minute < 10)
        minute = "0"+minute;
    if(seconds < 10)
        seconds = "0"+seconds;
    timer.innerHTML = hour + ":" + minute + ":" + seconds;
}
