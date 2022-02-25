
let urls = {
    url_img: "https://api.thecatapi.com/v1/images/search",
    url_fav: "https://api.thecatapi.com/v1/favourites",
    url_voto: "https://api.thecatapi.com/v1/votes",
    estado: "gato"
};

const URL_GATO = "api.thecatapi.com";
const URL_PERRO = "api.thedogapi.com";


const userId = "miguel";
let imagenActual, imagenSiguiente;

export function tindermain (){
    
    let nodoImagen = document.querySelector('.tinder__gato');

    let nodoLike = document.querySelector('#btn__like');
    let nodoDislike = document.querySelector('#btn__dislike');
    let nodoFav = document.querySelector('#btn__fav');
    let nodoBtn = document.querySelector('#btn__swap');

    document.querySelector('.swap__gatos').classList.add('activo');
    desactivaBotones ();
    pintaImagenInicial (urls.url_img). then ( () => {
        activaBotones ();
    });

    nodoLike.addEventListener ('click', () => {
        imagenActual.nodo.classList.add('moverDerecha');
        desactivaBotones();
        sendVoto(urls.url_voto, imagenActual.id, 1).then ( datosVoto => {
            console.log(datosVoto);
            devuelveObjetoImgRandom (urls.url_img).then ( imagen => {
                nodoImagen.removeChild(imagenActual.nodo);
                imagenSiguiente.nodo.classList.add('gatoActual');
                imagenActual = imagenSiguiente;
                imagenSiguiente = imagen;
                nodoImagen.append(imagenSiguiente.nodo);
                activaBotones();
            });
        });
    });

    nodoDislike.addEventListener ('click', () => {
        console.log(imagenActual);
        imagenActual.nodo.classList.add('moverIzquierda');
        desactivaBotones();
        sendVoto(urls.url_voto, imagenActual.id, 0).then (datosVoto => {
            console.log(datosVoto);
            devuelveObjetoImgRandom (urls.url_img).then ( imagen => {
                nodoImagen.removeChild(imagenActual.nodo);
                imagenSiguiente.nodo.classList.add('gatoActual');
                imagenActual = imagenSiguiente;
                imagenSiguiente = imagen;
                nodoImagen.append(imagenSiguiente.nodo);
                activaBotones();
            });
        });
    });

    nodoFav.addEventListener ('click', () => {
        imagenActual.nodo.classList.add('moverArriba');
        desactivaBotones();
        guardaImagenFav (urls.url_fav, imagenActual.id).then ( datosFav => {
            console.log(datosFav);
            devuelveObjetoImgRandom (urls.url_img).then ( imagen => {
                nodoImagen.removeChild(imagenActual.nodo);
                imagenSiguiente.nodo.classList.add('gatoActual');
                imagenActual = imagenSiguiente;
                imagenSiguiente = imagen;
                nodoImagen.append(imagenSiguiente.nodo);
                activaBotones();
            });
        });
    });

    nodoBtn.addEventListener ('click', () => {
        cambiaEstado ();
        desactivaBotones ();
        this.disabled = true;
        actualizaImagenes (urls.url_img).then ( () => {
            activaBotones ();
        });
    });
}

function cambiaEstado () {

    let nodoSpanGatos = document.querySelector('.swap__gatos');
    let nodoSpanPerros = document.querySelector('.swap__perros');

    let urlImg = urls.url_img.split("/");
    let urlFav = urls.url_fav.split("/");
    let urlVoto = urls.url_voto.split("/");

    if (urls.estado === "gato") {
        nodoSpanGatos.classList.remove('activo');
        console.log(nodoSpanGatos);
        urls.estado = "perro";
        urlImg[2] = URL_PERRO;
        urlFav[2] = URL_PERRO;
        urlVoto[2] = URL_PERRO;
        nodoSpanPerros.classList.add('activo');
    } else {
        nodoSpanPerros.classList.remove('activo');
        urls.estado = "gato";
        urlImg[2] = URL_GATO;
        urlFav[2] = URL_GATO;
        urlVoto[2] = URL_GATO;
        nodoSpanGatos.classList.add('activo');
    }
    urlImg = urlImg.join("/");
    urlFav = urlFav.join("/");
    urlVoto = urlVoto.join("/");
    
    urls.url_img = urlImg;
    urls.url_fav = urlFav;
    urls.url_voto = urlVoto;

}

function desactivaBotones () {
    let nodoBotones = document.querySelectorAll('.tinder__botones button');
    let nodoBtnSwap = document.querySelector('#btn__swap');
    nodoBtnSwap.disabled = true;
    nodoBotones.forEach(boton => {
        boton.disabled = true;
    });
}

function activaBotones () {
    let nodoBotones = document.querySelectorAll('.tinder__botones button');
    let nodoBtnSwap = document.querySelector('#btn__swap');
    nodoBtnSwap.disabled = false;
    nodoBotones.forEach(boton => {
        boton.disabled = false;
    });
}

function devuelveObjetoImgRandom (url) {
    return new Promise ((resolve, reject) => {
        getImagen (url).then ( datosImg => {
            let nombreGato = "";
            console.log(datosImg[0].breeds);
            if(datosImg[0].breeds.length >= 1) {
                console.log(datosImg[0].breeds[0].name);
                nombreGato = datosImg[0].breeds[0].name;
            }
            let idImagen = datosImg[0].id;
            let nodoImg = creaNodoImagen (datosImg);
            resolve ({
                nodo: nodoImg,
                id: idImagen,
                nombre: nombreGato
            });
        }).catch ( error => {
            reject (error);
        });
    });
}

function pintaImagenInicial (url) {
    return new Promise ( (resolve, reject) => {
        let nodoImagen = document.querySelector('.tinder__gato');
        devuelveObjetoImgRandom (url).then ( imagen => {
            console.log(imagen);
            imagenActual = imagen;
            imagenActual.nodo.classList.add('gatoActual');
            nodoImagen.append(imagenActual.nodo);
            devuelveObjetoImgRandom (url).then ( imagen => {
                imagenSiguiente = imagen;
                imagenSiguiente.nodo.classList.add('gatoSiguiente');
                console.log(imagen);
                nodoImagen.append(imagenSiguiente.nodo);
                resolve ();
            });
        }).catch( error => {
            reject( error );
        });
    });
}

function actualizaImagenes (url) {
    return new Promise ( (resolve, reject) => {
        try {
            let nodoImagen = document.querySelector('.tinder__gato');
            nodoImagen.removeChild(imagenActual.nodo);
            nodoImagen.removeChild(imagenSiguiente.nodo);
            pintaImagenInicial (url).then ( () => {
                resolve ();
            });
        } catch ( error ) {
            reject ( error );
        }
    });
}

async function getImagen (url) {
    try {
        let respuesta = await ((await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': '82ca1c74-fa03-4c37-b25f-6a7e7dcb499e'
            }
        })).json());
        return respuesta;
    } catch (error) {
        console.log(error.message);
    }
}

async function guardaImagenFav (url, idImg) {
    let datos = {
        'image_id': idImg,
        'sub_id': userId
    };
    try {
        let respuesta = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': '82ca1c74-fa03-4c37-b25f-6a7e7dcb499e'
            },
            body: JSON.stringify(datos)
        });
        return respuesta;
    } catch (error) {
        console.log (error.message);
    }
}

function creaNodoImagen (respuesta) {
    let nodoImagen = document.createElement('img');
    nodoImagen.classList.add('gato');
    nodoImagen.setAttribute('src', respuesta[0].url);
    return nodoImagen;
}

async function getFavoritos (url) {
    //return new Promise ((resolve, reject) => {
        try {
            let respuesta = await ((await fetch(url, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': '82ca1c74-fa03-4c37-b25f-6a7e7dcb499e'
                }
            })).json());
            return ( respuesta );
        } catch (error) {
            console.log ( error.message );
        }
    //});
}

async function sendVoto (url, idImg, value) {
    let datos = {
        'image_id': idImg,
        'sub_id': userId,
        'value': value
    };
    try {
        let respuesta = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': '82ca1c74-fa03-4c37-b25f-6a7e7dcb499e'
            },
            body: JSON.stringify(datos)
        });
        return respuesta;
    } catch (error) {

    }
}
