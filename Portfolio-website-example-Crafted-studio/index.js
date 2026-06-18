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

// 1. ADIM: SONSUZ DÖNGÜ İÇİN KARTLARI KLONLAMA
// Yan yana yeterli kart olsun diye mevcut kartları 3 kez klonlayıp arkaya diziyoruz
const originalCards = Array.from(track.children);
originalCards.forEach(card => {
    const clone1 = card.cloneNode(true);
    const clone2 = card.cloneNode(true);
    track.appendChild(clone1);
    track.appendChild(clone2);
});

// Temel Değişkenler
let speed = 1; // Otomatik akış hızı (Artırırsan daha hızlı akar)
let currentX = 0;
let isDragging = false;
let startX = 0;
let autoPlay = true;

// Kartların tek bir grubunun toplam genişliği
const getOriginalWidth = () => {
    // İlk grubun toplam genişliğini gap (boşluklar) ile hesapla
    return (originalCards[0].offsetWidth + 25) * originalCards.length;
};

// 2. ADIM: OTOMATİK KESİNTİSİZ AKIŞ MOTORU
const animate = () => {
    if (autoPlay && !isDragging) {
        currentX -= speed;
        
        // Sınır Kontrolü: Eğer ilk grup tamamen ekrandan çıktıysa, 
        // çaktırmadan sıfır noktasına ışınla (Sonsuzluk hissi)
        const limit = getOriginalWidth();
        if (Math.abs(currentX) >= limit) {
            currentX = 0;
        }
        
        track.style.transform = `translateX(${currentX}px)`;
    }
    requestAnimationFrame(animate);
};

// 3. ADIM: MOUSE İLE TUTUP ÇEKME (DRAG) AYARLARI
slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    autoPlay = false; // Tutunca otomatik akış dursun
    startX = e.pageX - currentX;
    slider.style.cursor = 'grabbing';
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    currentX = e.pageX - startX;
    
    // Çekerken de sonsuz döngüyü koruma algoritmaları
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
        // Fareyi bırakınca eğer hover durumunda değilse otomatik akışı hemen başlatma
        // Üzerinde durduğu sürece beklesin diye mouseleave kontrolü ekliyoruz:
    }
});

// Üzerine gelince otomatik akışı durdur, ayrılınca başlat
slider.addEventListener('mouseenter', () => { if(!isDragging) autoPlay = false; });
slider.addEventListener('mouseleave', () => { if(!isDragging) autoPlay = true; });

// Sistemi başlat
animate();