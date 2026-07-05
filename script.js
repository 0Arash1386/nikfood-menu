// ==================== اسلایدر ====================
const sliderImages = [
    "images/slide1.jpg",
    "images/slide2.png",
    "images/slide3.png",
    "images/slide4.png"
];

let currentSlide = 0;
let isDragging = false;
let startX = 0;

function startSlider() {
    const container = document.getElementById('slides');
    container.innerHTML = '';

    sliderImages.forEach(src => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.style.backgroundImage = `url('${src}')`;
        container.appendChild(slide);
    });

    const sliderContainer = document.querySelector('.slider');

    // Auto Slide
    setInterval(() => {
        if (!isDragging) nextSlide();
    }, 4000);

    // Swipe Support
    sliderContainer.addEventListener('touchstart', e => {
        isDragging = true;
        startX = e.touches[0].clientX;
    });

    sliderContainer.addEventListener('touchend', e => {
        if (!isDragging) return;
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (diff > 50) nextSlide();
        else if (diff < -50) prevSlide();

        isDragging = false;
    });

    function nextSlide() {
        currentSlide = (currentSlide + 1) % sliderImages.length;
        container.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + sliderImages.length) % sliderImages.length;
        container.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
}

// ==================== غذاها (همه آیتم‌ها) ====================
const foods = [
    // سوخاری
    { id:1, name:"بوفالو وینگز", category:"سوخاری", price:558000, desc:"بال مرغ تند", image:"images/buffalo-wings.jpg" },
    { id:2, name:"هانی موستارد وینگز", category:"سوخاری", price:558000, desc:"بال مرغ با سس عسل و خردل", image:"images/honey-mustard.jpg" },
    { id:3, name:"باربیکیو وینگز", category:"سوخاری", price:558000, desc:"بال مرغ با سس باربیکیو", image:"images/bbq-wings.jpg" },
    { id:4, name:"نرمال وینگز", category:"سوخاری", price:558000, desc:"بال مرغ معمولی", image:"images/normal-wings.jpg" },
    { id:5, name:"فیله استریپس", category:"سوخاری", price:988000, desc:"فیله مرغ سوخاری", image:"images/fillet-strips.jpg" },

    // ساندویچ
    { id:6, name:"نیک برگر", category:"ساندویچ", price:958000, desc:"برگر مخصوص نیک فود", image:"images/nik-burger.jpg" },
    { id:7, name:"همبرگر", category:"ساندویچ", price:878000, desc:"همبرگر کلاسیک", image:"images/hamburger.jpg" },
    { id:8, name:"چیز برگر", category:"ساندویچ", price:898000, desc:"برگر با پنیر", image:"images/cheese-burger.jpg" },
    { id:9, name:"ماشروم برگر", category:"ساندویچ", price:928000, desc:"برگر با سس قارچ", image:"images/mushroom-burger.jpg" },
    { id:10, name:"فیله برگر", category:"ساندویچ", price:998000, desc:"برگر فیله مرغ", image:"images/fillet-burger.jpg" },
    { id:11, name:"گریل چیکن", category:"ساندویچ", price:658000, desc:"ساندویچ مرغ گریل", image:"images/grill-chicken.jpg" },
    { id:12, name:"زینگر", category:"ساندویچ", price:658000, desc:"ساندویچ زینگر", image:"images/zinger.jpg" },
    { id:13, name:"چیکن فیله", category:"ساندویچ", price:628000, desc:"چیکن فیله", image:"images/chicken-fillet.jpg" },
    { id:14, name:"سالامی", category:"ساندویچ", price:618000, desc:"ساندویچ سالامی", image:"images/salami.jpg" },
    { id:15, name:"بیف اسموکی", category:"ساندویچ", price:858000, desc:"بیف اسموکی", image:"images/beef-smoky.jpg" },
    { id:16, name:"ترکی اسموکی", category:"ساندویچ", price:758000, desc:"ترکی اسموکی", image:"images/turkey-smoky.jpg" },

    // پیتزا
    { id:17, name:"نیک پیتزا", category:"پیتزا", price:1048000, desc:"پیتزا مخصوص", image:"images/nik-pizza.jpg" },
    { id:18, name:"پپرونی", category:"پیتزا", price:888000, desc:"پیتزا پپرونی", image:"images/pepperoni-pizza.jpg" },
    { id:19, name:"رست بیف", category:"پیتزا", price:1148000, desc:"رست بیف", image:"images/roast-beef.jpg" },
    { id:20, name:"چیکن آلفردو", category:"پیتزا", price:998000, desc:"چیکن آلفردو", image:"images/chicken-alfredo.jpg" },
    { id:21, name:"سیر و استیک", category:"پیتزا", price:1098000, desc:"سیر و استیک", image:"images/garlic-steak.jpg" },
    { id:22, name:"گوشت و قارچ", category:"پیتزا", price:1180000, desc:"گوشت و قارچ", image:"images/meat-mushroom.jpg" },
    { id:23, name:"چیزا", category:"پیتزا", price:848000, desc:"پیتزا چهار پنیر", image:"images/cheese-pizza.jpg" },

    // گریل سلامت
    { id:24, name:"استیک مرغ", category:"گریل سلامت", price:788000, desc:"استیک مرغ", image:"images/chicken-steak.jpg" },
    { id:25, name:"فیله گریل", category:"گریل سلامت", price:788000, desc:"فیله گریل", image:"images/fillet-grill.jpg" },

    // سس ها
    { id:26, name:"سس قارچ", category:"سس ها", price:128000, desc:"سس قارچ", image:"images/mushroom-sauce.jpg" },
    { id:27, name:"سس چدار", category:"سس ها", price:128000, desc:"سس چدار", image:"images/cheddar-sauce.jpg" },
    { id:28, name:"سس بافالو", category:"سس ها", price:38000, desc:"سس بافالو", image:"images/buffalo-sauce.jpg" },
    { id:29, name:"سس دودی", category:"سس ها", price:128000, desc:"سس دودی", image:"images/smoky-sauce.jpg" },
    { id:30, name:"سس سانتافه", category:"سس ها", price:0, desc:"سس سانتافه", image:"images/santafe-sauce.jpg" },

    // پیش غذا
    { id:31, name:"سیب زمینی", category:"پیش غذا", price:258000, desc:"سیب زمینی", image:"images/fries.jpg" },
    { id:32, name:"وایت فرایز", category:"پیش غذا", price:428000, desc:"وایت فرایز", image:"images/white-fries.jpg" },
    { id:33, name:"قارچ سوخاری", category:"پیش غذا", price:338000, desc:"قارچ سوخاری", image:"images/fried-mushroom.jpg" },
    { id:34, name:"نان سیر", category:"پیش غذا", price:298000, desc:"نان سیر", image:"images/garlic-bread.jpg" },
    { id:35, name:"هات شات", category:"پیش غذا", price:338000, desc:"هات شات", image:"images/hot-shot.jpg" },

    // سالاد
    { id:36, name:"سالاد نیک", category:"سالاد", price:0, desc:"سالاد مخصوص نیک فود", image:"images/nik-salad.jpg" },
    { id:37, name:"سالاد سزار سوخاری", category:"سالاد", price:898000, desc:"سالاد سزار سوخاری", image:"images/caesar-fried.jpg" },
    { id:38, name:"سالاد سزار گریل", category:"سالاد", price:798000, desc:"سالاد سزار گریل", image:"images/caesar-grill.jpg" },
    { id:39, name:"سالاد کلم", category:"سالاد", price:0, desc:"سالاد کلم", image:"images/cabbage-salad.jpg" }
];

const categories = ["همه", "پیتزا", "ساندویچ", "سوخاری", "گریل سلامت", "پیش غذا", "سالاد", "سس ها"];

// ==================== توابع رندر ====================
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
    
    filtered.forEach((food, index) => {
        const card = document.createElement('div');
        card.className = 'food-card';
        card.style.animationDelay = `${index * 0.08}s`;
        card.innerHTML = `
            <img src="${food.image}" alt="${food.name}">
            <div class="card-body">
                <h3>${food.name}</h3>
                <p>${food.desc}</p>
                <div class="price">${food.price === 0 ? "000" : food.price.toLocaleString('fa-IR')} تومان</div>
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

// ==================== اجرا ====================
window.onload = () => {
    renderCategories();
    renderMenu(foods);
    setupSearch();
    startSlider();
    hideLoading();
};
