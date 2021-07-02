const posicionFavorito = (arr,e) =>{
    let encontrado = -1;
    let i = 0;
    while (encontrado == -1 && i<arr.length) {
        if(arr[i].id === e.id){
            encontrado = i;
        }else{
            i++;
        }            
    }
    return encontrado;
}

const AltaBajaFavorito = (arr,e) =>{
    if(arr.length != 0){
        let pos = posicionFavorito(arr,e);
        if(pos == -1){
            arr.push(e);
        }else{
            arr.splice(pos,1);
        }
    }else{
        arr.push(e);
    }
    localStorage.setItem('favoritos', JSON.stringify(arr));
} 