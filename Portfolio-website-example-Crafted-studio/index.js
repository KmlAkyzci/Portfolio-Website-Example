const hamburger = document.querySelector(".hamburger")
const nav_menu = document.querySelector(".nav-menu")
hamburger.addEventListener("click",()=>{
  hamburger.classList.toggle("active");
  nav_menu.classList.toggle("active");
})
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
  hamburger.classList.remove("active");
  nav_menu.classList.remove("active");
}))



// slider-Bar



const slider = document.getElementById('infiniteSlider');
const track = document.getElementById('infiniteTrack');

const originalCards = Array.from(track.children);
originalCards.forEach(card => {
    const clone1 = card.cloneNode(true);
    const clone2 = card.cloneNode(true);
    track.appendChild(clone1);
    track.appendChild(clone2);
});

let speed = 1; 
let currentX = 0;
let isDragging = false;
let startX = 0;
let autoPlay = true;

const getOriginalWidth = () => {
    return (originalCards[0].offsetWidth + 25) * originalCards.length;
};

const animate = () => {
    if (autoPlay && !isDragging) {
        currentX -= speed;
        
        const limit = getOriginalWidth();
        if (Math.abs(currentX) >= limit) {
            currentX = 0;
        }
        
        track.style.transform = `translateX(${currentX}px)`;
    }
    requestAnimationFrame(animate);
};

slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    autoPlay = false; 
    startX = e.pageX - currentX;
    slider.style.cursor = 'grabbing';
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    currentX = e.pageX - startX;
    
    const limit = getOriginalWidth();
    if (currentX > 0) {
        currentX = -limit;
        startX = e.pageX - currentX;
    } else if (Math.abs(currentX) >= limit * 2) {
        currentX = -limit;
        startX = e.pageX - currentX;
    }
    
    track.style.transform = `translateX(${currentX}px)`;
});

window.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        slider.style.cursor = 'grab';
    }
});

slider.addEventListener('mouseenter', () => { if(!isDragging) autoPlay = false; });
slider.addEventListener('mouseleave', () => { if(!isDragging) autoPlay = true; });

animate();
