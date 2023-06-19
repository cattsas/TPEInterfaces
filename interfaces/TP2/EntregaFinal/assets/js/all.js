document.addEventListener('DOMContentLoaded', () => {
    let btnAll = document.querySelector('#mostrarTodos');
    let btnLess = document.querySelector('#mostrarMenos');
    let some = document.querySelector('.verAlgunos');
    let all = document.querySelector('.verlosTodos');


    btnAll.addEventListener('click', () => {
        some.classList.add('inactiveCont');
        all.classList.remove('inactiveCont');

    })

    btnLess.addEventListener('click', () => {
        some.classList.remove('inactiveCont');
        all.classList.add('inactiveCont');
    })





})