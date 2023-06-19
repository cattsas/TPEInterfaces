const targets = document.querySelectorAll('[data-target]');
const content = document.querySelectorAll('[data-content]');
const tab = document.querySelectorAll(".pestaña");
const log = document.querySelectorAll(".logButton");
const reg = document.querySelectorAll(".regButton");
const contLoggin = document.querySelector('.regLogin');
const succes = document.querySelector('.succesLoggin');
const sucLog = document.querySelector('#succesLog');
const sucReg = document.querySelector('#succesReg');
const usNoLog = document.querySelector('#logIcon');
const usLog = document.querySelector('#logged');
const toHome = document.querySelector('#logueado');



targets.forEach(target => {

    target.addEventListener('click', () => {

        content.forEach(c => {
            c.classList.remove('activeForm');

        })
        tab.forEach(p => {
            p.classList.remove('activeTab');

        })

        target.classList.add('activeTab');


        const t = document.querySelector(target.dataset.target);

        t.classList.add('activeForm');

    })

})
log.forEach(lg => {

    lg.addEventListener('click', () => {
        contLoggin.classList.remove('activeCont');
        contLoggin.classList.add('inactiveCont');
        succes.classList.remove('inactiveCont');
        succes.classList.add('succesMsge');






    })



})

reg.forEach(rg => {

    rg.addEventListener('click', () => {
        contLoggin.classList.remove('activeCont');
        contLoggin.classList.add('inactiveCont');
        succes.classList.remove('inactiveCont');
        succes.classList.add('succesMsge');
        sucLog.classList.add('inactiveCont');
        sucReg.classList.remove('inactiveCont');
        sucReg.classList.add('succesMsge');
    })



})

toHome.addEventListener('click', () => { //NO ANDA, LPM.SE SUPONE QUE CAMBIA EL ICONO DE LOGIN POR LA LETRA A...
    console.log("hola");
    usNoLog.classList.add('inactiveCont');
    usLog.classList.remove('inactiveCont');

})