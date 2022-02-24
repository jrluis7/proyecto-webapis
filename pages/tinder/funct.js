const URL_GET_IMG = "https://api.thecatapi.com/v1/images/search";
const URL_FAV = "https://api.thecatapi.com/v1/favourites";
const URL_VOTO = "https://api.thecatapi.com/v1/votes";

const userId = "miguel";
let imagenActual, imagenSiguiente;

export function tindermain (){

    console.log( "TINDER" );
    
    let nodoImagen = document.querySelector('.gatoImg');

    let nodoLike = document.querySelector('#like');
    let nodoDislike = document.querySelector('#dislike');
    let nodoFav = document.querySelector('#fav');

    pintaImagenInicial ();

    nodoLike.addEventListener ('click', () => {
        imagenActual.nodo.classList.add('moverDerecha');
        sendVoto(URL_VOTO, imagenActual.id, 1).then ( datosVoto => {
            console.log(datosVoto);
            devuelveObjetoImgRandom ().then ( imagen => {
                nodoImagen.removeChild(imagenActual.nodo);
                imagenSiguiente.nodo.classList.add('gatoActual');
                imagenActual = imagenSiguiente;
                imagenSiguiente = imagen;
                nodoImagen.append(imagenSiguiente.nodo);
            });
        });
    });

    nodoDislike.addEventListener ('click', () => {
        imagenActual.nodo.classList.add('moverIzquierda');
        sendVoto(URL_VOTO, imagenActual.id, 0).then (datosVoto => {
            console.log(datosVoto);
            devuelveObjetoImgRandom ().then ( imagen => {
                nodoImagen.removeChild(imagenActual.nodo);
                imagenSiguiente.nodo.classList.add('gatoActual');
                imagenActual = imagenSiguiente;
                imagenSiguiente = imagen;
                nodoImagen.append(imagenSiguiente.nodo);
            });
        });
    });

    nodoFav.addEventListener ('click', () => {
        imagenActual.nodo.classList.add('moverArriba');
        guardaImagenFav (URL_FAV, imagenActual.id).then ( datosFav => {
            console.log(datosFav);
            devuelveObjetoImgRandom ().then ( imagen => {
                nodoImagen.removeChild(imagenActual.nodo);
                imagenSiguiente.nodo.classList.add('gatoActual');
                imagenActual = imagenSiguiente;
                imagenSiguiente = imagen;
                nodoImagen.append(imagenSiguiente.nodo);
            });
        });
    });

}

function devuelveObjetoImgRandom () {
    return new Promise ((resolve, reject) => {
        getImagen (URL_GET_IMG).then ( datosImg => {
            console.log(datosImg);
            let idImagen = datosImg[0].id;
            let nodoImg = creaNodoImagen (datosImg);
            resolve ({
                nodo: nodoImg,
                id: idImagen
            });
        }).catch ( error => {
            reject (error);
        });
    });
}

function pintaImagenInicial () {
    let nodoImagen = document.querySelector('.gatoImg');
    devuelveObjetoImgRandom ().then ( imagen => {
        console.log(imagen);
        imagenActual = imagen;
        devuelveObjetoImgRandom ().then ( imagen => {
            imagenSiguiente = imagen;
            console.log(imagen);
            imagenActual.nodo.classList.add('gatoActual');
            nodoImagen.append(imagenActual.nodo);
            nodoImagen.append(imagenSiguiente.nodo);
        })
    }).catch( error => {
        console.log(error);
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
