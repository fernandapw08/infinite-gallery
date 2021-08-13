const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Helper Function to set Attributes on DOM

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}
// Create elements for links and photos, add to DOM

function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //Run function for each object in photosArray
    photosArray.forEach((photo) => {
        //Create an <a> element to link to unsplash
        const item =  document.createElement('a');
        setAttributes(item, {
        href:photo.links.html,
        target: '_blank',
        });
        //Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description,
            });
        // Event Listener , check when each is finished loading
        img.addEventListener('load', imageLoaded);
        //Put <img> inside <a>, then put both inside image container element
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}

/*Unplash API*/
const count = 30;
const apiKey = 'pdopZRjuh-DRAVcUickqIGAHF3VOvsD7Wo6Au4abHxY';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }

}

//Get photos from Unsplash API
async function getPhotos() {
    try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    } catch (error){
        //Catch Error
    }
}

// check if scrolling near bottom of page, Load more Photos
window.addEventListener('scroll', () =>{
if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
}
});

//On Load
getPhotos();