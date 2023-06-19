
document.addEventListener('DOMContentLoaded', ()=>{

    let btnClose = document.getElementById('close_adv');
    let btnSearch = document.getElementById('btnSearch');

    btnSearch.addEventListener('click', ()=>{
        search();
    })
    btnClose.addEventListener('click', ()=>{
        closeAdv();
    })
    
    const closeAdv = ()=>{
        document.querySelector('.publicidad').classList.add("oculto");
    }

    window.onscroll = function() {
        searchBarEffect()
    };

    function searchBarEffect() {
        let barra = document.querySelector('.barra_busqueda');
        let logo = document.querySelector('.logo');
        barra.classList.toggle('lupita', window.scrollY>15);
        logo.classList.toggle('invisible', window.scrollY>15);
  
    }


});