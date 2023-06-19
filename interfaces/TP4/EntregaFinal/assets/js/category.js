document.addEventListener("DOMContentLoaded", ()=>{
    "use strict";

    let games = [];

    getGames();
    async function getGames(){
        let response = await fetch('https://618eb5aa50e24d0017ce13ee.mockapi.io/fran/games');
        if(response.ok){
            games = await response.json();
            
            procesar();
        }else{
            console.log('error')
        }
    }

let url_string = window.location.href; 
let url = new URL(url_string);
let category = url.searchParams.get("category");
console.log(category);
function procesar(){

    let categoryesGames = [];

    for(let elem of games){
        if(elem.category == category){
            categoryesGames.push(elem);
        }
    }


    const games2 = new Vue({
        el: '#games',
        data: {
            category: category,
            listGames: categoryesGames
        }
    })
    }
});
