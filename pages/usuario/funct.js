// export function usuario(){

//     console.log( "USUARIO" );

// }

'use strict'

let favouritesSVG = '<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>'

let favouritesEmptySVG = '<path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>'

let likesSVG = '<path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>'

let likesEmptySVG = '<path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>'

let dislikesSVG = '<path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z"/>'

let dislikesEmptySVG = '<path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z"/>'

//SWITCH API-KEY --> SWITCH USER

const HEADER_CATAPI = {
    'Content-Type': 'application/json',
    'x-api-key': 'a3dbe9d6-dda1-4f49-9a01-3b109d1486c3'
}

// let limit = 20
let filter = 'like' //fav, like, dislike
let userID = 'user123'

const URL_CATAPI = 'https://api.thecatapi.com/v1'
const URL_FAV = URL_CATAPI + '/favourites'
const URL_LIKES = URL_CATAPI + '/votes'

let likes = []
let dislikes = []
let favourites = []

let nodeGrid =  document.querySelector('#grid')
let nodeSVG = document.querySelector('.user__svg')
let nodeSubtitle = document.querySelector('.user__subtitle')

function setPage(){
    let typeColor
    let typeData
    let typeSVG
    let nodeButton
    
    switch (filter){
        case 'fav':

            typeColor = 'var(--c-accent-yellow)'
            typeData = 'favourites'
            typeSVG = favouritesSVG
            nodeButton = $('.user__button-fav')

        break
        case 'like':

            typeColor = 'var(--c-accent-red)'
            typeData = 'likes'
            typeSVG = likesSVG
            nodeButton = $('.user__button-like')

        break
        case 'dislike':
            
            typeColor = 'var(--c-accent-orange)'
            typeData = 'dislikes'
            typeSVG = dislikesSVG
            nodeButton = $('.user__button-dislike')

        break
    }

    $('.user__button').removeClass('active')
    nodeButton.addClass('active')
    nodeGrid.setAttribute('data-type', typeData)
    nodeSVG.innerHTML = typeSVG
    $(nodeSubtitle).css({
        color: typeColor
    })

}

function containsObj( obj, arr){
    for( let i = 0; i < arr.length; i++){
        if(arr[i].favID === obj.favID){
            return true
        }
    }
    return false
}

function getData( url){

    fetch( url + `?sub_id=${userID}`, {
        headers: HEADER_CATAPI
    }).then( respuesta => respuesta.json()).then( data => {

        let promises = []
        
        if( !userID && data[0] ){
            userID = data[0].user_id
        }
        // console.log(data)
        for( let element of data ){

            switch ( element.value ){
                case undefined:

                    let newFav = {
                        favID: element.id, 
                        url: element.image.url, 
                        id: element.image_id
                    }

                    if( containsObj(newFav, favourites) === false ){
                        favourites.push(newFav)
                    }

                break
                default:
                    // Like / Dislike
                    promises.push( getSrc( element ) )

                break
            }

        }

        Promise.all(promises).then( respuesta => {

            if( url === URL_FAV && filter === 'fav' || url === URL_LIKES && (filter === 'like' || filter === 'dislike')){
                paintUser()
                paintData()
            }

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
                likes.push({id: data.id, url: data.url, likeID: element.id})
            break
            case 0:
                // Dislike
                dislikes.push({id: data.id, url: data.url, likeID: element.id})
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

    console.log('array', imageArray)

    nodeGrid.innerHTML = ''
    
    for( let i = 0; i < imageArray.length; i++ ){
        paintImages( imageArray[i] )
    }

}

function paintImages( param_element ){

    let nodeContainer = document.createElement('li')
    nodeContainer.classList.add('user__img-grid')

    let nodeImg = document.createElement('img')
    nodeImg.classList.add('user__img')
    nodeImg.setAttribute('src', param_element.url)

    nodeContainer.appendChild(nodeImg)

    if( filter === 'like'  || filter === 'fav'){
        let favButton = createButton('favourites', param_element)
        nodeContainer.appendChild(favButton)

        let likeButton = createButton('likes', param_element)
        nodeContainer.appendChild(likeButton)
    } else {
        let dislikeButton = createButton('dislikes', param_element)
        nodeContainer.appendChild(dislikeButton)
    }

    nodeGrid.appendChild(nodeContainer)
}

function createButton( type, param_element ){

    let typeURL = type === 'favourites' ? URL_FAV : URL_LIKES

    let nodeButton = document.createElement('button')
    nodeButton.classList.add(`user__star`)
    nodeButton.classList.add(`user__star-${type}`)

    let buttonSVG = eval(`${type}EmptySVG`)

    for( let item of eval(type) ){

        if( item.id === param_element.id ){
            buttonSVG = eval(`${type}SVG`)
            nodeButton.classList.add( type )
        }
    }

    let typeArray
    let typeKey

    if( filter !== 'dislike'){
        switch ( filter ){
            case 'fav':
                typeArray = likes
                typeKey = 'likeID'
            break
            case 'like':
                typeArray = favourites
                typeKey = 'favID'
            break
        }
    
        for( let item of typeArray ){
    
            if( item.id === param_element.id){
                param_element[typeKey] = item[typeKey]
            }
    
        }
    }

    nodeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="user__icon" viewBox="0 0 16 16">${buttonSVG}</svg>`

    $(nodeButton).on({
        click: function(){

            $(this).prop('disabled', true)

            if(this.classList.contains( type )){

                let typeID = type === 'favourites' ? param_element.favID : param_element.likeID

                console.log(typeID)
                console.log(param_element.likeID)

                let index = eval(type).indexOf(param_element)
                eval(type).splice(index, 1)

                paintUser()

                this.classList.remove( type )
                this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="user__icon" viewBox="0 0 16 16">${eval(`${type}EmptySVG`)}</svg>`

                if( nodeGrid.dataset.type === type ){
                    $(this).closest('.user__img-grid').remove()
                }

                console.log(`${typeURL}/${typeID}`)

                fetch(`${typeURL}/${typeID}`, {

                    method: 'DELETE',
                    headers: HEADER_CATAPI
    
                }).then(respuesta => respuesta.json()).then(data => {

                    $(this).prop('disabled', false)
                    console.log(data)

                })

            } else{

                this.classList.add( type )
                this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="user__icon" viewBox="0 0 16 16">${eval(`${type}SVG`)}</svg>`

                let data = { 'image_id': param_element.id, 'sub_id': userID}

                if( type === 'likes' ){
                    data.value = 1
                } else if ( type === 'dislikes' ){
                    data.value = 0
                }

                data = JSON.stringify(data)

                fetch( typeURL , {

                    method: 'POST',
                    headers: HEADER_CATAPI,
                    body: data

                }).then(respuesta => respuesta.json()).then(data => {

                    fetch(typeURL, {

                        headers: HEADER_CATAPI

                    }).then( respuesta => respuesta.json()).then( data => {
                        for( let fav of data){
                            if( param_element.id === fav.image_id ){

                                eval(type)[eval(type).indexOf(param_element)].favID = fav.id

                            }
                        }

                        $(this).prop('disabled', false)
                        
                    })
                })

                eval(type).push(param_element)
                paintUser()

            }
            
        }
    })

    return nodeButton

}


$('#user-like').on({
    click: function(){

        filter = 'like'
        setPage()

        paintData()
        
    }
})

$('#user-dislike').on({
    click: function(){

        filter = 'dislike'
        setPage()

        paintData()
        
    }
})

$('#user-fav').on({
    click: function(){

        filter = 'fav'
        setPage()

        paintData()
        
    }
})

