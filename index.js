const imgContainer = document.getElementById("img-container");
const loader = document.getElementById('loader');
const apiKey = "m2Z_j0g2paBDsw8Johh9zA5LoycqTP5yuHOB5eU_EN8"
let count = 7;
const apiLink = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
//Making an img element for each photos in photosArray and adding it to DOM
function displayLoader() {

}
//Targeting the load event function on each image element
function imageLoaded() {
    console.log("image loaded");
    imagesLoaded++;
    console.log( "images loaded " +imagesLoaded);
    if (imagesLoaded === imagesLoaded) {
        ready = true;
        loader.hidden = true;
        imagesLoaded = 0;
        count = 10;
    }
    console.log("ready = " + ready);
}
//Set Attribute general method for setting attributes
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }

}

function displayPhotos() {
    totalImages = photosArray.length;
    console.log("totalImages" + totalImages);
    photosArray.forEach((photo) => {
        //creating an anchor tag for each photo 

        const item = document.createElement('a')
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        //item.setAttribute('href', photo.links.html);
        //item.setAttribute('target', '_blank')

        //Creating an image element
        const image = document.createElement("img");
        setAttributes(image, {
            src: photo.urls.small,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        //Adding event listener on load of each image

        image.addEventListener('load', imageLoaded)
        //image.setAttribute('src', photo.urls.small);
        //image.setAttribute('alt', photo.alt_description);
        //image.setAttribute('title', photo.alt_description);
        //putting image into item and item into image container
        item.appendChild(image)
        imgContainer.appendChild(item);

    })
}

// Fetching 10 photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiLink);
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();

    } catch (error) {
        console.log(error);
    }
}

//Adding a scroll event listener to identify whether we are at the end of the window and loading new images on that event

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && ready ) {
        ready = false;
        getPhotos();
        console.log('load more');
    } else {

    }
})

// On load
getPhotos();