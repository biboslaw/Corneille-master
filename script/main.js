function main (){
    
    document.addEventListener('mousemove', function(e){
        toggleMenu(e);
    })
    document.addEventListener('scroll', function(e){
        toggleMenuScroll(e);
    })
    var hamburger = document.querySelector('.iconRwd')
    hamburger.addEventListener('click', function(e){  
       changeDisplay(e)
        var a = document.querySelectorAll('.topnav a')
        for (var j = 0; j<a.length; j++){
        a[j].addEventListener('click', function(e){
            e.target.classList.remove('topnavRwd')
        })
    }
    })
    
    var modal = document.querySelector('.modal')
    modal.addEventListener('click', function(e){
        closeModal(e)
        })
    var images = document.querySelectorAll('#products .product img')
    for (var j = 0; j<images.length; j++){
        images[j].addEventListener('click', addModal)
    }
}

function toggleMenu(e){
    var nav = document.querySelector('nav');
    var logo = document.querySelector('.logoNav')
    var windowTopPos = document.documentElement.scrollTop || document.body.scrollTop;

    if (e.clientY>300 && windowTopPos>300){
        nav.classList.add('hidden2')
        logo.classList.add('hidden2')
    } else {
        
        nav.classList.remove('hidden2')
        logo.classList.remove('hidden2')
    }
}

function toggleMenuScroll(e){
    var windowTopPos = document.documentElement.scrollTop || document.body.scrollTop;
    var nav = document.querySelector('nav');
    var logo = document.querySelector('.logoNav')
    if (windowTopPos>300){
        nav.classList.add('hidden2')
        logo.classList.add('hidden2')
    } else {
        
        nav.classList.remove('hidden2')
        logo.classList.remove('hidden2')
}
}

function addModal(e){
    openModal(e)
}

function closeModal (e){
    var removeNode = e.target.querySelector('.modalGallery')
    console.log(removeNode)
    e.target.removeChild(removeNode)
    e.target.classList.add('hidden')
}

                               
function changeDisplay(e) {
    e.preventDefault();
    var a = e.target.parentElement.querySelectorAll('a')
    console.log(a)
    for (var i = 0; i<a.length; i++){
        e.target.parentElement.querySelector('.topnav').style.position = 'relative'
            a[i].classList.toggle('topnavRwd')
        }
    }

function hideNav (e) {
    var topnaw = e.target.parentElement.querySelectorAll('a')
    console.log(topnaw)
    for (var i = 0; i<topnaw.length; i++){
        topnaw[i].classList.toggle('topnavRwd')
        console.log(topnaw[i])
    }
    e.target.parentElement.style.position = 'absolute'
}


function openModal(e){
    var section = document.querySelectorAll('section');
    for (i = 0; i<section.length; i++){
        section[i].classList.add('blur');
    }
    var modal = document.querySelector('.modal')
    var div = document.createElement('div')
    div.classList.add('modalGallery')
    var mainImage = document.createElement('img')
    var mainImageSrc = e.target.getAttribute('src')
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    var productName = e.target.parentElement.dataset.product
    console.log(width, mainImageSrc)
    if (width>600 && productName === 'cora') {
        mainImageSrc = insert(mainImageSrc, '_big', 11)
        console.log('bla')
    } else if (width > 600 && productName === 'dorica') {
        mainImageSrc = insert(mainImageSrc, '_big', 13)
    }
    mainImage.setAttribute('src', mainImageSrc)
    mainImage.classList.add('mainImage')
    div.appendChild(mainImage)
    mainImage.addEventListener('click', function(e){
        e.stopPropagation()
    })
    for (var d = 1; d<4; d++){
        var img = document.createElement('img')
        img.setAttribute('src', './images/' + productName + '/' + productName + d + '_.jpg')
        div.appendChild(img)    
    }
    modal.appendChild(div)
    var smallImages = div.querySelectorAll('img')
    for (var i = 1; i<smallImages.length; i++){
        smallImages[i].addEventListener('click', function(e){
            e.stopPropagation()
            e.preventDefault()
            var thisAttribute = e.target.getAttribute('src')
            if (width>600 && productName==='cora'){
                thisAttribute = insert(thisAttribute,'_big',13)
                e.target.parentElement.querySelector('.mainImage').setAttribute('src', thisAttribute) 
            } else if (width>600 && productName==='dorica') {
                thisAttribute = insert(thisAttribute,'_big',15)
                e.target.parentElement.querySelector('.mainImage').setAttribute('src', thisAttribute) 
            } else if (width<600){
                e.target.parentElement.querySelector('.mainImage').setAttribute('src', thisAttribute) 
            }
        })
    }
    modal.classList.remove('hidden')
    
}

function insert(original, string, place) {
    var array = original.split('');
    array.splice(place, 0, string);
    return array.join('');
}

document.addEventListener("DOMContentLoaded", main())