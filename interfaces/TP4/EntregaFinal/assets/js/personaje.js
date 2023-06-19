class Personaje {

    constructor(avatar, caminata, saltando, deslizando, muriendo, muerto, ganando, gano) {
        this.contenedor = avatar;
        this.estado;
        this.caminata = caminata;
        this.saltando = saltando;
        this.deslizando = deslizando;
        this.muriendo = muriendo;
        this.muerto = muerto;
        this.ganando = ganando;
        this.gano = gano;
        this.vivo = true;
        this.puntos = 0;
        this.caminar();

    }

    caminar() {
        this.estado = 'caminando';
        this.contenedor.classList="";
        this.contenedor.classList.add('character_init');
        this.contenedor.classList.add(this.caminata);
    }

    getNombre(){
        if(this.caminata === 'caminando_cody'){
            return 'cody';
        }
        return 'haagar';
    }

    saltar() {
        this.estado = 'saltando';
        let interval = setInterval(() => {
            this.contenedor.classList.replace(this.saltando, this.caminata);
            this.estado = 'caminando';

            clearInterval(interval);
        }, 800);
        this.contenedor.classList.remove(this.caminata);
        this.contenedor.classList.add(this.saltando);
    }

    deslizar() {
        this.estado = 'deslizando';
        let interval = setInterval(() => {
            this.contenedor.classList.replace(this.deslizando, this.caminata);
            this.estado = 'caminando';

            clearInterval(interval);
        }, 800);
        this.contenedor.classList.remove(this.caminata);
        this.contenedor.classList.add(this.deslizando);
    }

    morir(){
        this.estado = 'muerto';

        this.contenedor.classList.remove(this.caminata);
        this.contenedor.classList.remove(this.deslizando);
        this.contenedor.classList.remove(this.saltando);

        this.contenedor.classList.add(this.muriendo);
        let interval = setInterval(() => {
            this.contenedor.classList.remove(this.muriendo);

            this.contenedor.classList.add(this.muerto);

            clearInterval(interval);

        }, 1000);

        }

    getRight() {
        return this.contenedor.getBoundingClientRect().right;
    }

    getTop() {
        return this.contenedor.getBoundingClientRect().top;
    }

    getLeft() {
        return this.contenedor.getBoundingClientRect().left;
    }

    getBottom() {
        return this.contenedor.getBoundingClientRect().bottom;
    }

    sumarPuntos() {
        let scoreInput = document.getElementById("points");
        this.puntos++;
        scoreInput.value = this.puntos;


    }
    ganador(){
        this.estado = 'ganador';

        this.contenedor.classList.remove(this.caminata);
        this.contenedor.classList.remove(this.deslizando);
        this.contenedor.classList.remove(this.saltando);

        this.contenedor.classList.add(this.ganando);
        let interval = setInterval(() => {
            this.contenedor.classList.remove(this.ganando);

            this.contenedor.classList.add(this.gano);

            clearInterval(interval);

        }, 800);
    }
    getPuntos(){
        return this.puntos;
    }

}