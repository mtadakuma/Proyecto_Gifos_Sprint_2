const iconHover = document.querySelectorAll('.svg-hover')


const changeIconsHover = (e) => {
    const srcImg = e.target.src
    const idImg  = e.target.id
    const nameImg = srcImg.split('/')[srcImg.split('/').length - 1]
    if(nameImg.includes('normal')) {
        e.target.src = srcImg.replace("normal","hover");
    }else {
        e.target.src = srcImg.replace("hover","normal");
    } 

}

for(let i = 0; i < iconHover.length; i += 1 ) {
    iconHover[i].addEventListener('mouseover', changeIconsHover);
    iconHover[i].addEventListener('mouseout', changeIconsHover);
}