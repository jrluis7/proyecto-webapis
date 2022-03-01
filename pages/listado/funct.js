
let urls = {
    url_img: "https://api.thecatapi.com/v1/images/search",
    url_breed: "https://api.thecatapi.com/v1/breeds",
    url_categoria: "https://api.thecatapi.com/v1/categories",
    estado: "gato"
};

let listaRazas = [];
let listaCategorias;

const URL_GATO = "api.thecatapi.com";
const URL_PERRO = "api.thedogapi.com";

export function listadomain (){

    console.log("LISTADO");

    inicializaListado ();

    $(document).ready( function () {

        $('.btn__swap').on({
            click: function () {
                if (this.classList.contains('swapOn')) {
                    this.classList.remove('swapOn');
                } else {
                    this.classList.add('swapOn');
                }
                cambiaEstado ();
                $('.preloader').css({
                    'display': 'block'
                });
                $('#raza').empty();
                $('#categoria').empty();
                $('.listado__imagenes').empty();
                inicializaListado ();
            }
        });

        $('#raza').on({
            change: function () {
                $('.preloader').css({
                    'display': 'block'
                });
                $('.listado__imagenes').empty();
                filtraImagenes ();
            }
        });

        $('#categoria').on({
            change: function () {
                $('.preloader').css({
                    'display': 'block'
                });
                $('.listado__imagenes').empty();
                filtraImagenes ();
            }
        });
    });
    
}

function inicializaListado () {
    desactivaBotones ();
    getCategories (urls.url_categoria).then( datos => {
        listaCategorias = datos;
        generaSelectCategoria ( datos );
        getBreeds (urls.url_breed).then ( datos => {
            generaSelectRaza ( datos );
            filtraImagenes ();
        });
    }).catch ( error  => {
        console.log ( error );
    });
}

function cambiaEstado () {

    let nodoSpanGatos = document.querySelector('.swap__gatos');
    let nodoSpanPerros = document.querySelector('.swap__perros');

    let urlImg = urls.url_img.split("/");
    let urlBreed = urls.url_breed.split("/");
    let urlCategoria = urls.url_categoria.split("/");

    if (urls.estado === "gato") {
        nodoSpanGatos.classList.remove('activo');
        urls.estado = "perro";
        urlImg[2] = URL_PERRO;
        urlBreed[2] = URL_PERRO;
        urlCategoria[2] = URL_PERRO;
        nodoSpanPerros.classList.add('activo');
    } else {
        nodoSpanPerros.classList.remove('activo');
        urls.estado = "gato";
        urlImg[2] = URL_GATO;
        urlBreed[2] = URL_GATO;
        urlCategoria[2] = URL_GATO;
        nodoSpanGatos.classList.add('activo');
    }

    urlImg = urlImg.join("/");
    urlBreed = urlBreed.join("/");
    urlCategoria = urlCategoria.join("/");
    
    urls.url_img = urlImg;
    urls.url_breed = urlBreed;
    urls.url_categoria = urlCategoria;

}

function desactivaBotones () {
    $('#raza')[0].disabled = true;
    $('#categoria')[0].disabled = true;
}

function activaBotones () {
    $('#raza')[0].disabled = false;
    $('#categoria')[0].disabled = false;
}

function devuelveIdRaza (nombre) {
    if (nombre === "Todas") {
        return "Todas";
    } else {
        return listaRazas.find( elemento => elemento.nombre === nombre ).id;
    }
}

function devuelveIdCategoria (categoria) {
    if (categoria === "Todas") {
        return "Todas";
    } else {
        return listaCategorias.find ( elemento => elemento.name === categoria ).id;
    }
}

function generaSelectRaza (datos) {
    let nodoSelect = document.querySelector('#raza');
    let nodoOptionInicial = document.createElement('option');
    nodoOptionInicial.value = "Todas";
    nodoOptionInicial.innerHTML = "Todas";
    nodoOptionInicial.selected = true;
    nodoSelect.appendChild(nodoOptionInicial);
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
    let nodoOptionInicial = document.createElement('option');
    nodoOptionInicial.value = "Todas";
    nodoOptionInicial.innerHTML = "Todas";
    nodoOptionInicial.selected = true;
    nodoSelect.appendChild(nodoOptionInicial);
    datos.forEach( categoria => {
        let nodoOption = document.createElement('option');
        nodoOption.value = categoria.name;
        nodoOption.innerHTML = categoria.name;
        nodoSelect.appendChild(nodoOption);
    });
}

function filtraImagenes () {
    let idRaza = devuelveIdRaza ($('#raza').val());
    let idCategoria = devuelveIdCategoria ($('#categoria').val());
    desactivaBotones();
    getImagenes (urls.url_img, idCategoria, idRaza).then ( datos => {
        pintaImagenes ( datos );
        activaBotones ();
    }).catch ( error => {
        console.log ( error );
    });
}

function getImagenes (url, idCategoria, idRaza) {
    return new Promise ( (resolve, reject) => {
        let urlRequest = devuelveURL (url, idCategoria, idRaza);
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

function devuelveURL (url, idCategoria, idRaza) {
    if (idCategoria !== "Todas" && idRaza !== "Todas") {
        return `${url}?limit=20&breed_id=${idRaza}&category_ids=${idCategoria}`;
    } else if (idCategoria === "Todas" && idRaza !== "Todas") {
        return `${url}?limit=20&breed_id=${idRaza}`;
    } else if (idCategoria !== "Todas" && idRaza === "Todas") {
        return `${url}?limit=20&category_ids=${idCategoria}`;
    } else {
        return `${url}?limit=20`;
    }
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
    $('.preloader').css({
        'display': 'none'
    });
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
