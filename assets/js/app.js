const sections = document.querySelectorAll('section');
const bubble = document.querySelector('.bubble');
const gradients = [
    "linear-gradient(to right top, black, red)",
    "linear-gradient(to left top, red, black)",
    "linear-gradient(to right top, black, red )",
    "linear-gradient(to left top, red, black)"
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