const URL = "https://api.thecatapi.com/v1/images/search";

export function tindermain(){

    console.log( "TINDER" );

    let nodoLike = document.querySelector('#like');
    let nodoDislike = document.querySelector('#dislike');
    let nodoFav = document.querySelector('#fav');

    pintaImagen ();
    
    nodoLike.addEventListener ('click', () => {
        getImagen(URL).then ( imagen => {
            actualizaImg (imagen);
        });
    });

    nodoDislike.addEventListener ('click', () => {
        getImagen(URL).then ( imagen => {
            actualizaImg (imagen);
        });
    });

    nodoFav.addEventListener ('click', () => {
        getImagen(URL).then ( imagen => {
            actualizaImg (imagen);
        });
    });

}

function pintaImagen () {
    getImagen (URL).then ( imagen => {
        console.log(imagen);
        let nodoImg = creaNodoImagen (imagen);
        let nodoTinder = document.querySelector('.gatoImg');
        nodoTinder.append(nodoImg);
    });
}

function actualizaImg (respuesta) {
    let nodoImg = document.querySelector('.gato');
    nodoImg.setAttribute('src', respuesta[0].url);
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
        console.log(error);
    }
}

function creaNodoImagen (respuesta) {
    let nodoImagen = document.createElement('img');
    nodoImagen.classList.add('gato');
    nodoImagen.setAttribute('src', respuesta[0].url);
    return nodoImagen;
}

