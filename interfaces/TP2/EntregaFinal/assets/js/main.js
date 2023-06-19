document.addEventListener('DOMContentLoaded', ()=>{

    let hamburguesa = document.querySelector('.hamburguesa');
    let cierre = document.querySelector('.cerrar_menu');
    const usNoLog = document.querySelector('#logIcon');
    const usLog = document.querySelector('#logged');
    const toHome = document.querySelector('#logueado');
    const abrirMenu = () => {
        document.querySelector('.menu').classList.add('active_menu');
        document.querySelector('.modal').classList.add('active');
        document.querySelector('.menu').classList.remove('out_menu');
    }

    const cerrarMenu = () => {
        document.querySelector('.menu').classList.add('out_menu');
         document.querySelector('.menu').classList.remove('active_menu');
        document.querySelector('.modal').classList.remove('active');

    }
    const checkLogged = ()=>{
        let url_string = window.location.href;
        let url = new URL(url_string);
        let logged = url.searchParams.get("logged");
        if(logged){
            usNoLog.classList.add('inactiveCont');
            usLog.classList.remove('inactiveCont');
        }
    }
    checkLogged();

    hamburguesa.addEventListener('click', abrirMenu);
    cierre.addEventListener('click', cerrarMenu);
    
    let preloader = document.querySelector('#js-preloader');
    setTimeout(()=>{
        preloader.classList.add('loaded');

    }, 1500)



})