// داده‌های منو - این فایل رو راحت می‌تونی ویرایش کنی
const foods = [
    {
        id: 1,
        name: "بوفالو وینگز",
        category: "سوخاری",
        price: 185000,
        desc: "بال مرغ تند و خوشمزه با سس بوفالو",
        image: "assets/images/foods/buffalo-wings.jpg"
    },
    {
        id: 2,
        name: "هانی موستارد وینگز",
        category: "سوخاری",
        price: 185000,
        desc: "بال مرغ با سس عسل و خردل",
        image: "assets/images/foods/honey-mustard.jpg"
    },
    {
        id: 3,
        name: "نیک برگر",
        category: "ساندویچ",
        price: 210000,
        desc: "برگر مخصوص نیک فود با مواد تازه",
        image: "assets/images/foods/nik-burger.jpg"
    },
    {
        id: 4,
        name: "چیز برگر",
        category: "ساندویچ",
        price: 195000,
        desc: "برگر با پنیر ذوب شده",
        image: "assets/images/foods/cheese-burger.jpg"
    },
    {
        id: 5,
        name: "پیتزا پپرونی",
        category: "پیتزا",
        price: 245000,
        desc: "پپرونی، پنیر موزارلا و سس مخصوص",
        image: "assets/images/foods/pepperoni-pizza.jpg"
    },
    {
        id: 6,
        name: "استیک مرغ",
        category: "گریل سلامت",
        price: 165000,
        desc: "فیله مرغ گریل شده با سبزیجات",
        image: "assets/images/foods/chicken-steak.jpg"
    },
    {
        id: 7,
        name: "سیب زمینی سرخ کرده",
        category: "پیش غذا",
        price: 85000,
        desc: "سیب زمینی طلایی و ترد",
        image: "assets/images/foods/fries.jpg"
    },
    {
        id: 8,
        name: "سالاد سزار",
        category: "سالاد",
        price: 95000,
        desc: "کاهو، مرغ گریل و سس سزار",
        image: "assets/images/foods/caesar-salad.jpg"
    }
];

const categories = ["همه", "پیتزا", "ساندویچ", "سوخاری", "گریل سلامت", "پیش غذا", "سالاد", "سس ها"];

// رندر دسته‌بندی‌ها
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

// رندر غذاها
function renderMenu(filteredFoods) {
    const container = document.getElementById('menuGrid');
    container.innerHTML = '';
    
    filteredFoods.forEach(food => {
        const card = document.createElement('div');
        card.className = 'food-card';
        card.innerHTML = `
            <img src="${food.image}" alt="${food.name}">
            <div class="card-body">
                <h3>${food.name}</h3>
                <p>${food.desc}</p>
                <div class="price">${food.price.toLocaleString('fa-IR')} تومان</div>
            </div>
        `;
        container.appendChild(card);
    });
}

// فیلتر بر اساس دسته
function filterByCategory(category) {
    let filtered = foods;
    if (category !== "همه") {
        filtered = foods.filter(food => food.category === category);
    }
    renderMenu(filtered);
}

// جستجو
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
        const term = searchInput.value.trim().toLowerCase();
        const filtered = foods.filter(food => 
            food.name.toLowerCase().includes(term) || 
            food.desc.toLowerCase().includes(term)
        );
        renderMenu(filtered);
    });
}

// لودینگ
function hideLoading() {
    const loading = document.getElementById('loading');
    loading.style.opacity = '0';
    setTimeout(() => loading.style.display = 'none', 600);
}

// شروع برنامه
function init() {
    renderCategories();
    renderMenu(foods);
    setupSearch();
    hideLoading();
}

// اجرای برنامه
window.onload = init;
