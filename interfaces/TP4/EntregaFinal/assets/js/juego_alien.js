"use strict";

window.addEventListener('DOMContentLoaded', () => {
    let personajeSelect;
    let obstaculos = [];
    let enJuego;
    let imgScore = document.querySelector('.img_score');
    let botonAp;
    let btnLoose = document.getElementById('backLose');
    let btnWin = document.getElementById('backWin');
    
    let cambiar = document.querySelectorAll(".changeChar"); //elijo las dos flechas que alternan entre los personajes
    cambiar.forEach(cambio => {
        cambio.addEventListener("click", () => {
            let personajes = document.querySelectorAll(".mySlides"); //me quedo con ambos personajes
            personajes.forEach(personaje => {
                personaje.classList.toggle("oculto"); //alterno cual elijo y cual no
                personaje.classList.toggle("elegible");
            })
        })
    })


    const contenedorPj = document.getElementById('character');
    document.getElementById("btn_jugar").addEventListener('click', () => {
        crearJuego();
    })

    function crearJuego() {
        enJuego = true;
        document.getElementById('juego_menu').classList.add('oculto');
        document.getElementById('juego_ejecucion').classList.remove('oculto');

        let personaje = document.getElementsByClassName('elegible'); //se queda con todos los que tienen la clase, en este caso es uno solo
        if (personaje[0].id === 'char1') {


            personajeSelect = new Personaje(contenedorPj, 'caminando_cody', 'saltando_cody', 'deslizando_cody', 'muriendo_cody', 'muerto_cody', 'ganando_cody', 'gano_cody');
        } else {

            personajeSelect = new Personaje(contenedorPj, 'caminando_haagar', 'saltando_haagar', 'deslizando_haagar', 'muriendo_haagar', 'muerto_haagar', 'ganando_haagar', 'gano_haagar');

        }


        jugar();
    }


    function jugar() {
        window.onkeydown = function (event) {

            if (event.keyCode === 32 || event.keyCode === 38 || event.keyCode === 87) {
                // contempla barra espaciadora flechita arriba  y la W
                if(event.keyCode === 38){
                    event.preventDefault();
                }
                if (personajeSelect.estado == 'caminando') {
                    personajeSelect.saltar();
                }
            }
    
            if (event.keyCode === 40 || event.keyCode === 83) {
                // contempla flechita abajo  y la S
                if(event.keyCode === 40){
                    event.preventDefault();
                }
                if (personajeSelect.estado == 'caminando') {
                    personajeSelect.deslizar();
                }
            }
        }
    
        enJuego = true;


        //generamos nuevos obstaculos cada 1.4 segundos
        let intObs = setInterval(() => {
            if (enJuego) {
                generarObs();
            }
        }, 1400);
        //chequeamos que no haya colision
        let interval = setInterval(() => {
            //recorremos el arreglo de obstaculos y vamos preguntando si hubo colision en ese especifico objeto
            for (let obs of obstaculos) {
                if ((obs.colision(personajeSelect))) {
                    if (obs.getValue() !== 'starPoints') {
                        terminarJuego(false);
                        clearInterval(interval);
                        clearInterval(intObs);

                    } else {
                        //agregamos clase para salida de animacion
                        obs.div.classList.add('out_star');
                        //sumamos un punto al personaje
                        personajeSelect.sumarPuntos();
                        imgScore.classList.add('jello_horizontal');

                        //eliminamos del arreglo de obstaculos a la moneda para que no vuelva a recorrerla
                        obstaculos.splice(obstaculos.indexOf(obs), 1);
                        //una vez que pase un segundo eliminamos el div de la moneda para darle lugar a la animacion
                        setTimeout(() => {
                            obs.eliminar();
                            imgScore.classList.remove('jello_horizontal');

                        }, 1000);
                        if (comprobarGanador()) {
                            terminarJuego(true);
                            clearInterval(interval);
                            clearInterval(intObs);

                        };
                    }
                }
            }
        }, 10);


    }

    function generarObs() {
        //si hay menos de 3 obstaculos generados al momemnto entonces
        if (obstaculos.length < 3) {
            //obtenemos un numero random para definir el bicho
            let numero = ((Math.floor(Math.random() * 3)));
            let obstaculo1;
            switch (numero) {
                //creamos los obstaculos y les pasamos por parametro las clases que van a utilizar
                case 0:
                    obstaculo1 = new Obstaculo("alienFloor", "alien_walk");
                    break;
                case 1:
                    obstaculo1 = new Obstaculo("alienSky", "alien_fly");
                    break;
                case 2:
                    obstaculo1 = new Obstaculo("starPoints", "starMove");
                    break;
            }
            //pusheamos el bicho al arreglo
            obstaculos.push(obstaculo1);
        } else {
            //si ya tenemos 2 obstaculos mapeados borramos el primero 
            obstaculos[0].eliminar();
            obstaculos.splice(0, 1)
        }
    }


    function terminarJuego(estado, estrellaTomada) { //activa animaciones de personajes al finalizar, segun haya ganado o perdido,mostrando y ocultando las clases pertinentes
        enJuego = false;


        if (estado) {
            personajeSelect.ganador();

            document.getElementById('youWin').classList.remove('oculto');

        } else {
            personajeSelect.morir();

            document.getElementById('youLose').classList.remove('oculto');
        }
        let fondosAnimados = document.querySelectorAll('#juego_ejecucion>div'); //seleccionamos todos los divs contenidos dentro del contenedor que se ve mientras se juega
        fondosAnimados.forEach(animado => {
            if (animado.classList[0] !== 'characterCont' && animado.classList[0] !== 'starPoints') { //pausa las animaciones de todos los elementos salvo personaje y monedas
                animado.style.animationPlayState = 'paused';

            } else if (animado.classList[0] === 'starPoints') {

                setTimeout(() => {
                    animado.style.animationPlayState = 'paused';
                    document.querySelector('.starMove').style.animationPlayState = 'paused';
                }, 800);


            }

        });

        obstaculos.forEach(obst => {
            if (obst.class1 === 'starPoints') {
                obst.eliminar();
            }
        })

        let obsMov = document.querySelectorAll('.alien_walk,.alien_fly'); //pausa la animacion de los aliens

        obsMov.forEach(animado => {
            animado.style.animationPlayState = 'paused';

        });
        document.getElementById('juego_final').classList.remove('oculto'); //mostramos mensaje perdiste, y el puntaje



        let resultado = document.getElementById("puntaje"); //asignamos el valor acumulado para mostrarlo al finalizar el juego
        let acumuladas = document.getElementById("points");
        resultado.innerHTML = acumuladas.value;

        btnLoose.addEventListener('click', reiniciarJuego);
        btnWin.addEventListener('click', reiniciarJuego);

    }
    
    function reiniciarJuego(){
        console.log('reinicia juego');
        document.getElementById('youLose').classList.add('oculto');
        document.getElementById('youWin').classList.add('oculto');
        if (personajeSelect.getNombre() === 'cody') {


            personajeSelect = new Personaje(contenedorPj, 'caminando_cody', 'saltando_cody', 'deslizando_cody', 'muriendo_cody', 'muerto_cody', 'ganando_cody', 'gano_cody');
        } else {

            personajeSelect = new Personaje(contenedorPj, 'caminando_haagar', 'saltando_haagar', 'deslizando_haagar', 'muriendo_haagar', 'muerto_haagar', 'ganando_haagar', 'gano_haagar');

        }
        let fondosAnimados = document.querySelectorAll('#juego_ejecucion>div'); //seleccionamos todos los divs contenidos dentro del contenedor que se ve mientras se juega

        fondosAnimados.forEach(animado => {
            animado.style.animationPlayState = "running";
        });
        obstaculos.forEach(obst => {
            obst.eliminar();

        });
        document.getElementById("points").value = 0;
        obstaculos = [];
        enJuego = true;
        btnLoose.removeEventListener('click', reiniciarJuego)
        btnWin.removeEventListener('click', reiniciarJuego)
        jugar();
    }

    function comprobarGanador() {
        return personajeSelect.getPuntos() === 8;
    }




});