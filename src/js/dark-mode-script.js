let darkMode = localStorage.getItem('darkMode');
const darkModeToggle = document.querySelector('#dark-mode-toggle');
const darkModeIcons = document.querySelectorAll('.svg-dark-mode');


//checkear si dark mode está prendido
//si está activado, desactivarlo
//si está desactivado, activarlo

const enableDarkMode = () =>{
    //1. cambiar el css para que utilice las nuevas variables de darkmode
    document.documentElement.setAttribute('dark-theme', 'dark');
    //2.update darkMode en el localStorage
    localStorage.setItem('darkMode', 'enabled');
}

const disableDarkMode = () =>{
    //1. cambiar el css para que utilice las variables de lightmode
    document.documentElement.setAttribute('dark-theme', 'light');
    //2.update darkMode en el localStorage
    localStorage.setItem('darkMode', null);
}

const changeIconsDarkMode = () => {
    darkModeIcons.forEach(e => {
        
        const srcImg = e.src
        const nameImg = srcImg.split('/')[srcImg.split('/').length - 1]
        
        if(!nameImg.includes('-modo-noc')) {
            darkModeToggle.textContent = 'Modo Diurno';
            e.src = srcImg.replace(".svg","-modo-noc.svg");
        }else {
            darkModeToggle.textContent = 'Modo Nocturno';
            e.src = srcImg.replace("-modo-noc.svg",".svg");
        }  
    });
}


if(darkMode === 'enabled'){
    enableDarkMode();
    changeIconsDarkMode();
}

darkModeToggle.addEventListener('click', ()=>{
    darkMode = localStorage.getItem('darkMode');
    
    if(darkMode != 'enabled'){
        enableDarkMode();
    }else{
        disableDarkMode();
    }
    changeIconsDarkMode();
});


const searchIcon = document.getElementById('icon-search');
