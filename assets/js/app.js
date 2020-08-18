const sections = document.querySelectorAll('section');
const bubble = document.querySelector('.bubble');
const slideshow_img = document.querySelectorAll('.my-photos img');
const gradients = [
    "linear-gradient(to right top, black, red)",
    "linear-gradient(to left top, red, black)",
    "linear-gradient(to right top, black, red )",
    "linear-gradient(to left top, red, black)"
];

const images = [
    "./assets/images/saturn.jpg",
    "./assets/images/jupiter.jpg",
    "./assets/images/mars.jpg",
    "./assets/images/mars.png",
    "./assets/images/venus.png"
];

const options = {
    threshold : 0.7
};

let observer = new IntersectionObserver(navCheck, options);

function navCheck(entries){
    entries.forEach(entry => {
        const className = entry.target.className;
        const activeAnchor = document.querySelector(`[data-page=${className}]`);
        const gradientIndex = entry.target.getAttribute('data-index');
        const coords = activeAnchor.getBoundingClientRect();
        const directions = {
            height: coords.height,
            width: coords.width,
            top: coords.top,
            left: coords.left
        };
        if(entry.isIntersecting){
            bubble.style.setProperty("left", `${directions.left}px`);
            bubble.style.setProperty("top", `${directions.top}px`);
            bubble.style.setProperty("width", `${directions.width}px`);
            bubble.style.setProperty("height", `${directions.height}px`);
        }
        window.onresize = function(){
            const coordsIn = activeAnchor.getBoundingClientRect();
            const directionsIn = {
                height: coordsIn.height,
                width: coordsIn.width,
                top: coordsIn.top,
                left: coordsIn.left
            };
            bubble.style.setProperty("left", `${directionsIn.left}px`);
            bubble.style.setProperty("top", `${directionsIn.top}px`);
            bubble.style.setProperty("width", `${directionsIn.width}px`);
            bubble.style.setProperty("height", `${directionsIn.height}px`);
        }
    });
}

sections.forEach(section => {
    observer.observe(section);
});

const navSlide = () => {
    const menu = document.querySelector('.hidden-menu');
    const nav = document.querySelector('.menu-nav');

    menu.addEventListener('click', () => {
        nav.classList.toggle('menu-nav-active');
        menu.classList.toggle('hidden-menu-toggle');
    });

    const menu_active = document.querySelectorAll('.menu-nav li');

    menu_active.forEach(element => {
            element.addEventListener('click', () => {
                if(nav.classList.contains('menu-nav-active')){
                    nav.classList.toggle('menu-nav-active');
                    menu.classList.toggle('hidden-menu-toggle');
                }

        });
    });
}

navSlide();

function slideShow(){
    slideshow_img[0].setAttribute('src', images[0]);
    slideshow_img[0].setAttribute('idx', 0);
    slideshow_img[1].setAttribute('src', images[1]);
    slideshow_img[1].setAttribute('idx', 1);
    slideshow_img[2].setAttribute('src', images[2]);
    slideshow_img[2].setAttribute('idx', 2);
    setInterval(function(){
        slideshow_img.forEach( img => {
            let newIdx = (parseInt(img.getAttribute('idx')) + 1) % images.length;
            img.setAttribute('src', images[newIdx]);
            img.setAttribute('idx', newIdx);
        });
    },3000);
}

slideShow();