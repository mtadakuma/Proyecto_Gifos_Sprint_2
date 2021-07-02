const iconActive = document.querySelectorAll('.svg-active')


const changeIconsActive = (e) => {
    const srcImg = e.target.src
    const nameImg = srcImg.split('/')[srcImg.split('/').length - 1]
    if(nameImg.includes('hover')) {
        e.target.src = srcImg.replace("hover","active");
    }else {
        e.target.src = srcImg.replace("active","hover");
    } 

}

for(let i = 0; i < iconActive.length; i += 1 ) {
    iconActive[i].addEventListener('click', changeIconsActive);
}