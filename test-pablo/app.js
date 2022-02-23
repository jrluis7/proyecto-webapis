fetch('https://api.thecatapi.com/v1/images/search/?limit=50', {
    headers: {
        'x-ai-key':'29efc343-53e3-4844-af53-8c308654bd56'
    }
}).then(datos=>{
    return datos.json()
}).then(respuesta=>{
    console.log(respuesta)
})