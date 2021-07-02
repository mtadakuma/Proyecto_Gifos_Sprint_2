function eliminarGifo(arrMisGifos, gif){
    let arr = arrMisGifos;
    if(arrMisGifos.indexOf(gif.id) != -1){
        arr.splice(arrMisGifos.indexOf(gif.id),1)
    }
    localStorage.setItem('misGifos', JSON.stringify(arr));
}