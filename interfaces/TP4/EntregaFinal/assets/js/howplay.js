document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    let games = [];

    getGames();
    async function getGames() {
        let response = await fetch('https://618eb5aa50e24d0017ce13ee.mockapi.io/fran/games');
        if (response.ok) {
            games = await response.json();
            procesar();
        }
    }

    let url_string = window.location.href;
    let url = new URL(url_string);
    let id = url.searchParams.get("id");
    let selectGame = null;

    function procesar() {
        for (let elem of games) {
            if (elem.id == id) {
                selectGame = elem;
            }
        }




        const game = new Vue({
            el: '#game',
            data: {
                id: selectGame.id,
                name: selectGame.name,
                category: selectGame.category,
                img: selectGame.img,
                desarrollador: selectGame.desarrollador,
                descripcion: selectGame.descripcion
            }
        })

    }
});