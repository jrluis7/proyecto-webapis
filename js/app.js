import { homemain } from "/pages/home/funct.js";
import { filtromain } from "/pages/filtro/funct.js";
import { tindermain } from "/pages/tinder/funct.js";
import { usuariojs } from "/pages/usuario/funct.js";
import { listadomain } from "/pages/listado/funct.js";

let home, contact, filtro, tinder, listado, usuario, routes;
let root = document.querySelector( '#root' );
let keys = ["54d13939-bd09-450f-84f0-2603538f5eed","key2","key3","key4","key5"];
let keyusando;

async function loadPage( pagina ){
    const respuesta = await fetch( './pages/' + pagina );
    const html = await respuesta.text();
    //console.log( html );
    return html;
}

async function loadAllPages(){
    home = await loadPage('home/home.html');
    contact = await loadPage('contacto/contacto.html');
    filtro = await loadPage('filtro/filtro.html');
    tinder = await loadPage('tinder/tinder.html');
    usuario = await loadPage('usuario/usuario.html');
    listado = await loadPage('listado/listado.html');

}

async function main(){
    await loadAllPages();
    const ruta = window.location.pathname 
    console.log( ruta );
    routes = {
        '/':{html:home, js:homemain},
        '/home':{html:home, js:homemain},
        '/contacto':{html:contact},
        '/filtro':{html:filtro, js:filtromain},
        '/usuario':{html:usuario, js:usuariojs},
        '/tinder':{html:tinder, js:tindermain},
        '/listado':{html:listado, js:listadomain}

    }
    paintRoot(routes[ruta]);
}

function clickNavigation( pathName ){
    window.history.pushState({},pathName,window.location.origin + pathName);
    paintRoot(routes[pathName]);
}

function paintRoot(element){
    root.innerHTML = element.html;
    document.getElementById("nav").classList.add("inactivo");
    if(element.js){
        element.js();
    }
}
// Ejecución directa
await main();

document.querySelectorAll('a').forEach( cadaEnlace=>{
    cadaEnlace.addEventListener( 'click',function(e){
        e.preventDefault();
        clickNavigation( this.pathname )
    } );
    
} )

window.onpopstate = () => {
    paintRoot(routes[ window.location.pathname ]);
}
document.getElementById("botonmenu").addEventListener("click", function( event ) {
    document.getElementById("nav").classList.remove("inactivo")
})

document.getElementById("nav").addEventListener("click", function(event){
    console.log(event.target)
    if(event.target == document.getElementById("nav")){
        document.getElementById("nav").classList.add("inactivo");
    }
})

document.getElementById("header__botonregistro").addEventListener("click", function( event ) {
    document.getElementById("menu__login").classList.remove("inactivo")
})


document.getElementById("menu__login").addEventListener("click", function(event){
    console.log(event.target)
    if(event.target == document.getElementById("menu__login")){
        document.getElementById("menu__login").classList.add("inactivo");
    }

})
document.getElementById("sendData").addEventListener("click", function( event ) {
    let indice = document.getElementById("form__select").selectedIndex;
    keyusando = keys[indice];
    document.getElementById("menu__login").classList.add("inactivo");
    console.log(keyusando);
})