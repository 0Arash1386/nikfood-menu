// ==================== اسلایدر ====================
const sliderImages = [
    "images/slide1.jpg",
    "images/slide2.jpg",
    "images/slide3.jpg"
];

let currentSlide = 0;

function startSlider() {
    const container = document.getElementById('slides');
    container.innerHTML = '';

    sliderImages.forEach(src => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.style.backgroundImage = `url('${src}')`;
        container.appendChild(slide);
    });

    // Auto Slide
    setInterval(() => {
        currentSlide = (currentSlide + 1) % sliderImages.length;
        container.style.transform = `translateX(-${currentSlide * 100}%)`;
    }, 4000);
}

// ==================== غذاها (نمونه) ====================
const foods = [
    { id:1, name:"بوفالو وینگز", category:"سوخاری", price:558000, desc:"بال مرغ تند", image:"images/buffalo-wings.jpg" },
    { id:2, name:"نیک برگر", category:"ساندویچ", price:958000, desc:"برگر مخصوص", image:"images/nik-burger.jpg" },
    { id:3, name:"پیتزا پپرونی", category:"پیتزا", price:888000, desc:"پیتزا پپرونی", image:"images/pepperoni-pizza.jpg" }
];

const categories = ["همه", "پیتزا", "ساندویچ", "سوخاری", "گریل سلامت", "پیش غذا", "سالاد", "سس ها"];

// ==================== رندر ====================
function renderCategories() {
    const container = document.getElementById('categories');
    container.innerHTML = '';
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'cat-btn';
        btn.textContent = cat;
        if (cat === "همه") btn.classList.add('active');
        btn.addEventListener('click', () => {
            document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterByCategory(cat);
        });
        container.appendChild(btn);
    });
}

function renderMenu(filtered) {
    const container = document.getElementById('menuGrid');
    container.innerHTML = '';
    filtered.forEach(food => {
        const card = document.createElement('div');
        card.className = 'food-card';
        card.innerHTML = `
            <img src="\( {food.image}" alt=" \){food.name}">
            <div class="card-body">
                <h3>${food.name}</h3>
                <p>${food.desc}</p>
                <div class="price">${food.price.toLocaleString('fa-IR')} تومان</div>
            </div>
        `;
        container.appendChild(card);
    });
}

function filterByCategory(cat) {
    let filtered = foods;
    if (cat !== "همه") filtered = foods.filter(f => f.category === cat);
    renderMenu(filtered);
}

function setupSearch() {
    document.getElementById('searchInput').addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = foods.filter(food => 
            food.name.toLowerCase().includes(term) || food.desc.toLowerCase().includes(term)
        );
        renderMenu(filtered);
    });
}

function hideLoading() {
    const loading = document.getElementById('loading');
    loading.style.opacity = '0';
    setTimeout(() => loading.style.display = 'none', 600);
}

// ==================== شروع ====================
window.onload = () => {
    renderCategories();
    renderMenu(foods);
    setupSearch();
    startSlider();
    hideLoading();
};
