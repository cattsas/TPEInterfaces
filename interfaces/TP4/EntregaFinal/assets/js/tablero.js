"use strict";

class Tablero {
    constructor(ctx, cantidad) {
        this.alto = 2 + cantidad;
        this.ancho = 2 + cantidad;
        //dependiendo la cantidad de fichas con las que se juega en donde commienza X
        if (cantidad == 4) {
            this.comienzoX = 320;
        } else {
            this.comienzoX = 240
        }

        this.comienzoY = 80;
        this.ladoImagen = 80;

        this.ctx = ctx;
        this.image = new Image();
        this.imageArrow = new Image();

        this.image.src = "assets/images/tablero_forma2.png";
        this.imageArrow.src = "assets/images/chevron.png"
        this.matriz = this.generarMatriz();
        this.arrCol = this.generarArregloColumnas();

    }

    //se crea el tablero una vez que se carga la imagen
    crearTablero() {
            this.image.onload = () => {
                this.imageArrow.onload = ()=>{
                    this.draw();
                }            };
        }
        //genera matriz para la logica del juego
    generarMatriz() {
        let matriz = [this.alto];
        for (let i = 0; i < this.alto; i++) {
            matriz[i] = [];
            for (let j = 0; j < this.ancho; j++) {
                matriz[i][j] = 0;
            }
        }
        return matriz;
    }

    //se genera un arreglo de columnas -- aca se establece el limite de cada pixel en donde se va a tnomar cada columna
    generarArregloColumnas() {
        let arregloColumnas = [];
        arregloColumnas[0] = this.comienzoX + this.ladoImagen;
        for (let i = 1; i < this.ancho; i++) {
            arregloColumnas[i] = (arregloColumnas[i - 1] + this.ladoImagen);
        }

        return arregloColumnas;
    }

    //se pregunta si la posicion corresponde a una columna valida
    esValida(x, y) {
        let col = -1;
        //si y es mayor a al comienzo - 80 e y es menor al comienzo de y del tablero
        if (y > this.comienzoY - 80 && y < this.comienzoY) {
            let i = 0;
            while (i < this.ancho) {
                //preguntamos si x esta entre la medida donde arranca la columna y donde termina
                if (x < this.arrCol[i] && x > this.arrCol[i] - 80) {
                    col = i;
                    return col;
                }
                i++;
            }
        }

        return col;
    }

    getNroCol() { /**Devuelve el ancho del tablero */
        return this.ancho;
    }

    //ingreso de ficha, va a buscar desde la ultima fila hasta la primera para ver donde cae, mientras haya un 1 o un 2 no vaa poner la ficha, 
    //unicamente lo va a hacer cuando se choque con un 0
    ingresoFicha(nroCol, ficha) {
        let i = this.alto - 1;

        while (i >= 0) {
            if (this.matriz[i][nroCol] == 0) {
                this.matriz[i][nroCol] = ficha.getJugador();

                return i;
            }
            i--;
        }
        return i;
    }

    //cae la ficha en una fila columna especifica
    caeFicha(ficha, fila, columna) {
        //calculamos con el comienzo en x del tablero para la fila y le sumamos el tamanio de la imagen y la fila, lo mismo para la columna pero desde Y
        //se suma la division por dos para dar en la mitad de la imagen
        let x = this.comienzoX + fila * this.ladoImagen + this.ladoImagen / 2;
        let y = this.comienzoY + columna * this.ladoImagen + this.ladoImagen / 2;
        let player1 = document.querySelector("#player1");
        let player2 = document.querySelector("#player2");
        ficha.setPosX(x);
        ficha.setPosY(y);
        ficha.bloquearFicha();
        //se recorren las fichas, para ver a que jugador coresponde y manejar turnos
        juego.fichas.forEach(ficha => {
            if (ficha.getJugador() == fichaSelect.getJugador()) {
                ficha.bloquearFicha();
                if (fichaSelect.getJugador() == 1) {
                    player1.classList.remove("visible");
                    player1.classList.add("invisible");
                    player2.classList.remove("invisible");
                    player2.classList.add("visible");
                } else {
                    player2.classList.remove("visible");
                    player2.classList.add("invisible");
                    player1.classList.remove("invisible");
                    player1.classList.add("visible");

                }

            } else {
                ficha.desbloquearFicha();
            }
        });
        console.table(this.matriz);
    }

    //dibujamos el tablero
    draw() {
        let imagenTablero = this.ctx.createPattern(this.image, "repeat");
        let arrowImage = this.ctx.createPattern(this.imageArrow, "repeat");

        this.ctx.fillStyle = imagenTablero;
        this.ctx.fillRect(this.comienzoX, this.comienzoY, (this.image.width * this.ancho), (this.image.height * this.alto));

        this.ctx.fillStyle = arrowImage;
        this.ctx.fillRect(this.comienzoX, this.comienzoY-80, (this.imageArrow.width * this.ancho), (this.imageArrow.height * 1));


    }

}