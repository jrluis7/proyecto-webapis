export function homemain(){

    console.log( "HOME" );
    
    debugger
    
    
    async function getGato(){
        return new Promise( (resolve, reject)=>{

            fetch('https://api.thecatapi.com/v1/images/search/?limit=2', {
                headers: {
                    'x-ai-key':'29efc343-53e3-4844-af53-8c308654bd56'
                }
            }).then(datos=>{
                return datos.json()
            }).then(respuesta=>{
                // console.log(respuesta)
                resolve(respuesta) 
                // return respuesta
            })
        })
    }

    let vargato = {};
    let gatoConBreeds;
    let nodoDescTexto;
    let gatoAnterior;
    let nodoAnterior = document.querySelector('.anterior')

    function test2() {
        if(localStorage.getItem('gato')){
            gatoAnterior = localStorage.getItem('gato')
            localStorage.setItem('gatoAnterior', gatoAnterior)
            nodoAnterior.classList.add('.active')
        }else{
            nodoAnterior.classList.remove('.active')
            
        }
        getGato().then( resp=>{
            vargato = resp
            for (let i = 0; i<vargato.length; i++){

                if (vargato[i].breeds.length>0){
                    console.log(vargato)
                    gatoConBreeds = vargato[i]
                    let gatoConBreedsJSON = JSON.stringify(vargato[i])
                    localStorage.setItem('gato', gatoConBreedsJSON)
                    break
                }else{
                    console.log("try")
                    // debugger
                    if(i>=vargato.length){
                        test2()
                    }
                }
            }

            let nodoImagen = document.querySelector('.main__img')
            nodoImagen.addEventListener('load', function(){
                
                nodoDescripcion.innerHTML = `
                <span class="desc__raza">
                    ${gatoConBreeds.breeds[0].name}
                </span>
                <span class="desc__subraza">
                    ${gatoConBreeds.breeds[0].alt_names || gatoConBreeds.breeds[0].alt_names === " "  ? gatoConBreeds.breeds[0].alt_names : "Felis catus"}
                </span>
                <span class="desc__texto">
                    ${gatoConBreeds.breeds[0].description}
                </span>
                <span class="desc__texto">
                    ${gatoConBreeds.breeds[0].temperament}
                </span>
                <span class="desc__texto">
                    Cariño: ${gatoConBreeds.breeds[0].affection_level} estrellas SVGs
                </span>
                <span class="desc__texto">
                    Inteligencia: ${gatoConBreeds.breeds[0].intelligence} estrellas SVGs
                </span>
                <span class="desc__texto">
    
                </span>`
                nodoDescTexto = document.querySelectorAll('.desc__texto')
            })
            nodoImagen.setAttribute('src', `${gatoConBreeds.url}`)

            let nodoDescripcion = document.querySelector('.desc')
            
        })
    } 
    test2()
    
    let nodoRandom = document.querySelector('.aleatorio')
    nodoRandom.addEventListener('click', function(){
        console.log('dentro')
        test2()
    })
    
    let nodoDesc = document.querySelector('.desc')
    nodoDesc.addEventListener('click', function(){
        console.log('dentro de click de DESC')
        for (let texto of nodoDescTexto){
            texto.classList.toggle('active')
        }
    })

    // let interRandomGato = setInterval(()=>test2(), 8000)








}
