export function homemain(){

    
    debugger
    
    async function getGato(){
        return new Promise( (resolve, reject)=>{

            fetch('https://api.thecatapi.com/v1/images/search/?limit=50', {
                headers: {
                    'x-ai-key':'29efc343-53e3-4844-af53-8c308654bd56'
                }
            }).then(datos=>{
                return datos.json()
            }).then((respuesta, error)=>{
                // console.log(respuesta)
                resolve(respuesta) 
                // return respuesta
                reject(error)
                console.log(error)
            })
        })
    }

    let vargato = {};
    let gatoConBreeds;
    let nodoDescTexto;
    let gatoAnterior;
    let nodoAnterior = document.querySelector('.anterior')
    let nodoImagen = document.querySelector('.main__img')

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
                    gatoConBreeds = vargato[i]
                    let gatoConBreedsJSON = JSON.stringify(vargato[i])
                    localStorage.setItem('gato', gatoConBreedsJSON)
                    break
                }else{
                    // debugger
                    if(i>=vargato.length-1){
                        test2()
                    }
                }
            }
            let nodoDescripcion = document.querySelector('.desc')

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

            
        })
    } 
    test2()


    let nodoRandom = document.querySelector('.aleatorio')
    nodoRandom.addEventListener('click', function(){
        test2()
        clearInterval(interBarra)
        setInterval(interBarra)
    })


    let nodoDesc = document.querySelector('.desc')
    nodoDesc.addEventListener('click', function(){
        nodoDesc.classList.toggle('active')
    })

    let interRandomGato;
    
    let nodoBarra = document.querySelector('.barra')
    let interBarra
    
    
    addInterval()

    let nodoPause = document.querySelector('.pause')
    nodoPause.addEventListener('click', function(){
        if(nodoPause.classList.contains('play')){
            addInterval()
            nodoImagen.addEventListener('mouseleave', addInterval)
            nodoPause.classList.remove('play')
            nodoPause.innerHTML =   `<svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
                                        <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
                                    </svg>`
        }else{
            clearInterval(interRandomGato)
            clearInterval(interBarra)
            nodoImagen.removeEventListener('mouseleave', addInterval)
            nodoPause.classList.add('play')
            nodoPause.innerHTML =   `<svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                                    </svg>`
        }
        
    })

    nodoImagen.addEventListener('mouseenter', function(){
        clearInterval(interRandomGato)
        clearInterval(interBarra)
        
    })
    nodoImagen.addEventListener('mouseleave', addInterval)

    function addInterval(){
        interRandomGato = setInterval(()=>test2(), 8000)
        let i=0
        interBarra = setInterval(function(){
            if (i<100){
                nodoBarra.style.width = `${i}%`
                i++
            }else{
                i=0
            }
        }, 80)
    }





    let nodoBack = document.querySelector('.anterior')
    nodoBack.addEventListener('click', function(){
        console.log('WIP')
    })






}
