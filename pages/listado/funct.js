
let urls = {
    url_img: "https://api.thecatapi.com/v1/images/search",
    url_fav: "https://api.thecatapi.com/v1/favourites",
    url_voto: "https://api.thecatapi.com/v1/votes",
    url_breed: "https://api.thecatapi.com/v1/breeds",
    url_categoria: "https://api.thecatapi.com/v1/categories",
    estado: "gato"
};

let listaRazas = [];

const URL_GATO = "api.thecatapi.com";
const URL_PERRO = "api.thedogapi.com";

export function listadomain (){

    console.log("LISTADO");

    getCategories (urls.url_categoria).then( datos => {
        console.log(datos);
        generaSelectCategoria ( datos );
    });

    getBreeds (urls.url_breed).then ( datos => {
        console.log(datos);
        generaSelectRaza ( datos );
        console.log(listaRazas);
        getImagenes (urls.url_img, listaRazas[4].id).then ( datos => {
            console.log(datos);
            pintaImagenes (datos);
        }).catch ( error => {
            console.log(error);
        });
    });

    $(document).ready( function () {

        $('#raza').on({
            change: function () {
                console.log($(this).val());
            }
        });
    });
    
}

function generaSelectRaza (datos) {
    let nodoSelect = document.querySelector('#raza');
    datos.forEach( raza => {
        let objectRaza = {
            id: raza.id,
            nombre: raza.name
        }
        listaRazas.push(objectRaza);
        let nodoOption = document.createElement('option');
        nodoOption.value = raza.name;
        nodoOption.innerHTML = raza.name;
        nodoSelect.appendChild(nodoOption);
    });
}

function generaSelectCategoria (datos) {
    let nodoSelect = document.querySelector('#categoria');
    datos.forEach( categoria => {
        let nodoOption = document.createElement('option');
        nodoOption.value = categoria.name;
        nodoOption.innerHTML = categoria.name;
        nodoSelect.appendChild(nodoOption);
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

function getImagenes (url, idRaza) {
    return new Promise ( (resolve, reject ) => {
        let urlRequest = url + "?limit=20&breed_id=" + idRaza;
        fetch (urlRequest, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': '82ca1c74-fa03-4c37-b25f-6a7e7dcb499e'
            }
        }).then ( respuesta => {
            return respuesta.json();
        }).then ( datos => {
            resolve ( datos );
        }).catch ( error  => {
            reject ( error );
        });
    });
}

function getBreeds (url) {
    return new Promise ( (resolve, reject ) => {
        let urlRequest = url + "?attach_breed=5";
        fetch (urlRequest, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': '82ca1c74-fa03-4c37-b25f-6a7e7dcb499e'
            }
        }).then ( respuesta => {
            return respuesta.json();
        }).then ( datos => {
            resolve ( datos );
        }).catch ( error  => {
            reject ( error );
        });
    });
}

function getCategories (url) {
    return new Promise ( (resolve, reject ) => {
        let urlRequest = url;
        fetch (urlRequest, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': '82ca1c74-fa03-4c37-b25f-6a7e7dcb499e'
            }
        }).then ( respuesta => {
            return respuesta.json();
        }).then ( datos => {
            resolve ( datos );
        }).catch ( error  => {
            reject ( error );
        });
    });
}

function pintaImagenes (listaImagenes) {
    let nodoListado = document.querySelector('.listado__imagenes');
    listaImagenes.forEach( imagen => {
        let nodoImagen = devuelveNodoImg (imagen.url);
        let nodoDiv = document.createElement('div');
        nodoDiv.classList.add('contenedor');
        nodoDiv.append(nodoImagen);
        nodoListado.append(nodoDiv);
    });
}

function devuelveNodoImg (src) {
    let nodoImg = document.createElement('img');
    nodoImg.setAttribute('src', src);
    nodoImg.classList.add('imagen');
    return nodoImg;
}

$(window).on({
    scroll: function () {
        console.log($(this).height());
        console.log($(this).scrollTop());
    }
});

