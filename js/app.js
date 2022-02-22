import { homemain } from "/pages/home/funct.js";



let home,contact,routes;
let root = document.querySelector( '#root' );

async function loadPage( pagina ){
    const respuesta = await fetch( './pages/'+pagina );
    const html = await respuesta.text();
    console.log( html );
    return html
}

async function loadAllPages(){
    home = await loadPage('home/home.html');
    contact = await loadPage('contacto/contacto.html');
}

async function main(){
    await loadAllPages();
    const ruta = window.location.pathname 
    console.log(ruta )
    console.log( '333' )
    routes = {
        '/':{html:home, js:homemain},
        '/home':{html:home, js:homemain},
        '/contacto':{html:contact}
    }
    paintRoot(routes[ruta]);
}

function clickNavigation( pathName ){
    window.history.pushState({},pathName,window.location.origin + pathName);
    paintRoot(routes[pathName]);
}

function paintRoot(element){
    root.innerHTML = element.html;
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




