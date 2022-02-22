console.log( 'Hola mundo!' );


let home,contact,routes;
let root = document.querySelector( '#root' );

async function loadPage( pagina ){
    const respuesta = await fetch( './pages/'+pagina );
    const html = await respuesta.text();
    console.log( html );
    return html
}

async function loadAllPages(){
    console.log( '111' )
    home = await loadPage('home.html');
    contact = await loadPage('contacto.html');
    console.log( '222' )
}
// loadPage( 'home.html' );

async function main(){
    await loadAllPages();
    const ruta = window.location.pathname 
    console.log(ruta )
    console.log( '333' )
    routes = {
        '/':home,
        '/home':home,
        '/contacto':contact
    }
    
    // setTimeout( ()=>{
    console.log( routes )
    console.log( routes[ruta] )
    root.innerHTML = routes[ruta];
    // }, 1250 )

}

function clickNavigation( pathName ){
    window.history.pushState({},pathName,window.location.origin + pathName);
    root.innerHTML = routes[pathName];
}

await main();

document.querySelectorAll('a').forEach( cadaEnlace=>{
    cadaEnlace.addEventListener( 'click',function(e){
        console.log( this.pathname )
        e.preventDefault();
        clickNavigation( this.pathname )
    } );
    
} )

window.onpopstate = () => {
    root.innerHTML = routes[ window.location.pathname ]
}




