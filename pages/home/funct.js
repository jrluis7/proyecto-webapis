export function homemain(){

    console.log( "HOME" );
    

   
    
    async function getGato(){
        return new Promise( (resolve, reject)=>{

            fetch('https://api.thecatapi.com/v1/images/search/?limit=1', {
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

    let vargato;

    function test2() {

        getGato().then( resp=>{
            // console.log(resp)
            vargato = resp
            if (vargato[0].breeds.length>0){
                console.log(vargato)
            }else{
                console.log("try")
                test2()
            }
        })
    } 
    test2()

}
