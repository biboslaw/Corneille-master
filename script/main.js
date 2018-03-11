function main() {
    var section;
    var nav;
    var test = document.querySelectorAll('.topnav a')
    console.log(test)
    for (var i = 0; i < test.length; i++) {
        test[i].addEventListener('click', function (e) {
            var temp = e.target.getAttribute('href')

            console.log(temp)
            document.querySelector(temp).scrollIntoView({
                behavior: 'smooth'
            })
        })
    }
    /*var test = document.querySelector('.picture')
    test.addEventListener('click', function () {
        document.querySelector('#contact').scrollIntoView({
            behavior: 'smooth'
        })
    })*/
    show()

    document.addEventListener('mousemove', function (e, nav) {
        toggleMenu(e, nav);
    })
    document.addEventListener('scroll', function (e, nav) {
        toggleMenuScroll(e, nav);
    })
    var hamburger = document.querySelector('.iconRwd')
    hamburger.addEventListener('click', function (e) {
        changeDisplay(e)
        var a = document.querySelectorAll('.topnav a')
        for (var j = 0; j < a.length; j++) {
            a[j].addEventListener('click', function (e) {
                e.target.classList.remove('topnavRwd')
            })
        }
    })

    var modal = document.querySelector('.modal')
    modal.addEventListener('click', function (e, section) {
        closeModal(e, section)
    })
    var images = document.querySelectorAll('#products .product img')
    for (var j = 0; j < images.length; j++) {
        images[j].addEventListener('click', function (e, section) {
            openModal(e, section)
        })
    }
    document.addEventListener('scroll', show)
}

// end of main function //

function show() {
    var notViewed = document.querySelectorAll('.notViewed')
    var windowTopPos = document.documentElement.scrollTop || document.body.scrollTop;
    var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    var rect;
    for (var i = 0; i < notViewed.length; i++) {
        rect = notViewed[i].getBoundingClientRect()
        if (windowTopPos + rect.top < windowHeight + windowTopPos) {
            console.log(windowHeight + windowTopPos)
            //console.log(windowTopPos + rect.top)
            notViewed[i].classList.add('viewed')
            notViewed[i].classList.remove('notViewed')
            //console.log('element: ' + i + ' ' + notViewed[i] + ', offset: ' + notViewed[i].offsetTop + ', windowHeight: ' + windowHeight + ', windowTopPos: ' + windowTopPos)
        }
    }
}

function toggleMenu(e, nav) {
    nav = document.querySelector('nav');
    var logo = document.querySelector('.logoNav')
    var windowTopPos = document.documentElement.scrollTop || document.body.scrollTop;
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    if (e.clientY > 200 && windowTopPos > 300 && width > 600) {
        nav.classList.add('hidden2')
        logo.classList.add('hidden2')
    } else {

        nav.classList.remove('hidden2')
        logo.classList.remove('hidden2')
    }
}

function toggleMenuScroll(e, nav) {
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    var windowTopPos = document.documentElement.scrollTop || document.body.scrollTop;
    nav = document.querySelector('nav');
    var logo = document.querySelector('.logoNav')
    if (windowTopPos > 200 && width > 600) {
        nav.classList.add('hidden2')
        logo.classList.add('hidden2')
    } else {

        nav.classList.remove('hidden2')
        logo.classList.remove('hidden2')
    }
}

// removing modal //
function closeModal(e, section) {
    section = document.querySelectorAll('section')
    section = document.querySelectorAll('section')
    for (i = 0; i < section.length; i++) {
        section[i].classList.remove('blur');
    }
    var removeNode = e.target.querySelector('.modalGallery')
    console.log(removeNode)
    e.target.removeChild(removeNode)
    e.target.classList.remove('hiddenModal')
}

// switch navigation menu betweene deskopt and mobile //
function changeDisplay(e) {
    e.preventDefault();
    e.target.parentElement.querySelector('.topnav').classList.add('topnavRwd')
    e.target.classList.add('hidden2')
    var a = document.querySelectorAll('.topnav a')
    console.log(a)
    for (var i = 0; i < a.length; i++) {
        a[i].addEventListener('click', function (e) {
            hideNav(e)
        })
    }
}

function hideNav(e) {
    e.target.parentElement.classList.remove('topnavRwd')
    document.querySelector('.iconRwd').classList.remove('hidden2')
}

// creating modal //
function openModal(e, section) {
    section = document.querySelectorAll('section')
    for (i = 0; i < section.length; i++) {
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
    if (width > 600 && productName === 'cora') {
        mainImageSrc = insert(mainImageSrc, '_big', 11)
        console.log('bla')
    } else if (width > 600 && productName === 'dorica') {
        mainImageSrc = insert(mainImageSrc, '_big', 13)
    }
    mainImage.setAttribute('src', mainImageSrc)
    mainImage.classList.add('mainImage')
    div.appendChild(mainImage)
    mainImage.addEventListener('click', function (e) {
        e.stopPropagation()
    })
    for (var d = 1; d < 4; d++) {
        var img = document.createElement('img')
        img.setAttribute('src', './images/' + productName + '/' + productName + d + '_.jpg')
        div.appendChild(img)
    }
    modal.appendChild(div)
    var smallImages = div.querySelectorAll('img')
    for (var i = 1; i < smallImages.length; i++) {
        smallImages[i].addEventListener('click', function (e) {
            e.stopPropagation()
            e.preventDefault()
            var thisAttribute = e.target.getAttribute('src')
            if (width > 600 && productName === 'cora') {
                thisAttribute = insert(thisAttribute, '_big', 13)
                e.target.parentElement.querySelector('.mainImage').setAttribute('src', thisAttribute)
            } else if (width > 600 && productName === 'dorica') {
                thisAttribute = insert(thisAttribute, '_big', 15)
                e.target.parentElement.querySelector('.mainImage').setAttribute('src', thisAttribute)
            } else if (width < 600) {
                e.target.parentElement.querySelector('.mainImage').setAttribute('src', thisAttribute)
            }
        })
    }
    modal.classList.add('hiddenModal')

}


function insert(original, string, place) {
    var array = original.split('');
    array.splice(place, 0, string);
    return array.join('');
}

document.addEventListener("DOMContentLoaded", main())
