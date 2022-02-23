// export function usuario(){

//     console.log( "USUARIO" );

// }

'use strict'

let starSVG = '<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>'

let starEmptySVG = '<path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>'

let likeSVG = '<path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>'

let dislikeSVG = '<path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z"/>'

//SWITCH API-KEY --> SWITCH USER

const HEADER_CATAPI = {
    'Content-Type': 'application/json',
    'x-api-key': 'a3dbe9d6-dda1-4f49-9a01-3b109d1486c3'
}

let limit = 20
let filter = 'fav'
let userID

const URL_CATAPI = 'https://api.thecatapi.com/v1'
const URL_FAV = URL_CATAPI + '/favourites'
const URL_LIKES = URL_CATAPI + '/votes'

let likes = []
let dislikes = []
let favourites = []

let nodeGrid =  document.querySelector('#grid')
let nodeSVG = document.querySelector('.user__svg')
let nodeSubtitle = document.querySelector('.user__subtitle')

function getData( url ){

    fetch( url, {
        headers: HEADER_CATAPI
    }).then( respuesta => respuesta.json()).then( data => {

        let promises = []
        if(!userID){
            userID = data[0].user_id
        }

        for( let element of data ){

            switch ( element.value ){
                case undefined:
                    // Fav
                    favourites.push( {favID: element.id, url: element.image.url, id: element.image_id} )
                break
                default:
                    // Like / Dislike
                    promises.push( getSrc( element ) )

                break
            }

        }

        Promise.all(promises).then( respuesta => {

            paintUser()
            paintData()

        } )

    })
}

function getSrc( element ){
    return fetch(URL_CATAPI + `/images/${element.image_id}`, {
        headers: HEADER_CATAPI
    }).then ( respuesta => respuesta.json()).then( data => {
        switch(element.value){
            case 1:
                // Like
                likes.push({id: data.id, url: data.url})
            break
            case 0:
                // Dislike
                dislikes.push({id: data.id, url: data.url})
            break
        }

    })
}

getData( URL_FAV )
getData( URL_LIKES )

function paintUser(){
    $('.user__title').html(`@${userID}`)
    $('#data-like').html(likes.length)
    $('#data-dislike').html(dislikes.length)
    $('#data-fav').html(favourites.length)
}

function paintData(){
    let imageArray

    switch ( filter ){
        case 'fav':
            imageArray = favourites
        break
        case 'like':
            imageArray = likes
        break
        case 'dislike':
            imageArray = dislikes
        break
    }

    nodeGrid.innerHTML = ''
    
    for( let i = 0; i < imageArray.length; i++ ){
        paintImages( imageArray[i], imageArray)
    }

}

function paintImages( param_element ){

    let nodeContainer = document.createElement('li')
    nodeContainer.classList.add('user__img-grid')
    // nodeContainer.setAttribute('data-id', param_element.id)

    let nodeImg = document.createElement('img')
    nodeImg.classList.add('user__img')
    nodeImg.setAttribute('src', param_element.url)

    let nodeButton = document.createElement('button')
    nodeButton.classList.add('user__star')

    let buttonSVG = starEmptySVG

    favourites.filter( item => {
        if(item.id === param_element.id){
            buttonSVG = starSVG
            nodeButton.classList.add('liked')
            param_element.favID = item.favID
        }
    })

    nodeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="user__icon" viewBox="0 0 16 16">${buttonSVG}</svg>`

    $(nodeButton).on({
        click: function(){

            if(this.classList.contains('liked')){
                fetch(`https://api.thecatapi.com/v1/favourites/${param_element.favID}`, {
                method: 'DELETE',
                headers: HEADER_CATAPI
                }).then(respuesta => respuesta.json()).then(data => {
                    console.log('deleted')
                    favourites = []
                    getData( URL_FAV )
                })
            } else{
                let data = JSON.stringify({
                    "image_id": param_element.id
                    });
    
                fetch('https://api.thecatapi.com/v1/favourites', {
                    method: 'POST',
                    headers: HEADER_CATAPI,
                    body: data
                }).then(respuesta => respuesta.json()).then(data => {
                    favourites = []
                    getData( URL_FAV )
                })
            }
            
        }
    })

    nodeContainer.appendChild(nodeImg)
    nodeContainer.appendChild(nodeButton)
    nodeGrid.appendChild(nodeContainer)
}

$('#user-like').on({
    click: function(){
        $('.user__button').removeClass('active')
        $(this).addClass('active')

        nodeSVG.innerHTML = likeSVG
        $(nodeSubtitle).css({
            color: 'var(--c-accent-red)'
        })

        filter = 'like'
        paintData()
    }
})

$('#user-dislike').on({
    click: function(){
        $('.user__button').removeClass('active')
        $(this).addClass('active')

        nodeSVG.innerHTML = dislikeSVG
        $(nodeSubtitle).css({
            color: 'var(--c-accent-orange)'
        })

        filter = 'dislike'
        paintData()
    }
})

$('#user-fav').on({
    click: function(){
        $('.user__button').removeClass('active')
        $(this).addClass('active')

        nodeSVG.innerHTML = starSVG
        $(nodeSubtitle).css({
            color: 'var(--c-accent-yellow)'
        })

        filter = 'fav'
        paintData()
    }
})

