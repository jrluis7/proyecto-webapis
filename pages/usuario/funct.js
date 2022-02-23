// export function usuario(){

//     console.log( "USUARIO" );

// }

'use strict'

let starSVG = '<svg xmlns="http://www.w3.org/2000/svg" class="user__icon" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>'

//SWITCH API-KEY --> SWITCH USER

const HEADER_CATAPI = {
    'Content-Type': 'application/json',
    'x-api-key': 'a3dbe9d6-dda1-4f49-9a01-3b109d1486c3'
}

let limit = 20
let filter = 'fav'

const URL_CATAPI = 'https://api.thecatapi.com/v1'
const URL_FAV = URL_CATAPI + '/favourites'
const URL_LIKES = URL_CATAPI + '/votes'

let likes = []
let dislikes = []
let favourites = []

let nodeGrid =  document.querySelector('#grid')

function getData( url ){
    fetch( url, {
        headers: HEADER_CATAPI
    }).then( respuesta => respuesta.json()).then( data => {


        let promise = new Promise( (resolve, reject)=>{
            for( let element of data ){
                        switch ( element.value ){
                            case undefined:
                                //Fav
                                favourites.push( element.image )
                            break
                            default:

                                fetch(URL_CATAPI + `/images/${element.image_id}`, {
                                    headers: HEADER_CATAPI
                                }).then ( respuesta => respuesta.json()).then( data => {
                                    switch(element.value){
                                        case 1:
                                            //Like
                                            likes.push({id: data.id, url: data.url})
                                        break
                                        case 0:
                                            //Dislike
                                            dislikes.push({id: data.id, url: data.url})
                                        break
                                    }

                                })

                            break
                        }
                    }

        } )

        promise.then( resp=>{

            paintUser()
        } )
   
        //Promise All / for await ...

    })
}

getData( URL_FAV )
getData( URL_LIKES )

function paintUser(){
    console.log(likes)
    // debugger
    console.log(likes.length)
    // debugger


    document.querySelector('#data-like').innerHTML = likes.length

    // $('#data-like').html(likes.length)
    // $('#data-dislike').html(dislikes.length)
    // $('#data-fav').html(favourites.length)
}

// function getData( url ){
//     fetch( url, {
//         headers: HEADER_CATAPI
//     } ).then( respuesta => respuesta.json() ).then( data => {

//         // nodeGrid.innerHTML = ''
//             for(let element of data){

//                 if( filter === 'fav' || filter === 'like' && element.value === 1 || filter === 'dislike' && element.value === 0){
//                     fetch(URL_CATAPI + `/images/${element.image_id}`, {
//                         headers: HEADER_CATAPI
//                     }).then( respuesta => respuesta.json()).then( data => {

//                         switch (filter){
//                             case 'fav':
//                                 favourites.push({url: data.url, id: data.id})
//                             break
//                             case 'like':
//                                 likes.push({url: data.url, id: data.id})
//                             break
//                             case 'dislike':
//                                 dislikes.push({url: data.url, id: data.id})
//                             break
//                         }

//                         // paintImages()
//                     })
//                 }
//             }

//     })
// }


// // function paintImages( param_url ){
// //     let nodeContainer = document.createElement('li')
// //     nodeContainer.classList.add('user__img-grid')

// //     let nodeImg = document.createElement('img')
// //     nodeImg.classList.add('user__img')
// //     nodeImg.setAttribute('src', param_url)

// //     // let nodeButton = document.createElement('button')
// //     // nodeButton.classList.add('user__star')
// //     // nodeButton.innerHTML = starSVG

// //     nodeContainer.appendChild(nodeImg)
// //     // nodeContainer.appendChild(nodeButton)
// //     nodeGrid.appendChild(nodeContainer)
// // }

// $('#user-like').on({
//     click: function(){
//         $('.user__button').removeClass('active')
//         $(this).addClass('active')
//         filter = 'like'
//         getData(URL_LIKES)
//     }
// })

// $('#user-dislike').on({
//     click: function(){
//         $('.user__button').removeClass('active')
//         $(this).addClass('active')
//         filter = 'dislike'
//         getData(URL_LIKES)
//     }
// })

// $('#user-fav').on({
//     click: function(){
//         $('.user__button').removeClass('active')
//         $(this).addClass('active')
//         filter = 'fav'
//         getData(URL_FAV)
//     }
// })

// function prueba(){
//     fetch(URL_CATAPI + '/images/search?sub_id=itsme', {
//         headers: HEADER_CATAPI
//     }).then( respuesta => respuesta.json() ).then( data => {
//         console.log(data)
//     })
// }

// prueba()

// getData(URL_FAV)
