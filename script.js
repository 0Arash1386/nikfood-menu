const foods = [
    {
        id: 1,
        name: "بوفالو وینگز",
        category: "سوخاری",
        price: 185000,
        desc: "بال مرغ تند با سس بوفالو",
        image: "images/buffalo-wings.jpg"
    },
    {
        id: 2,
        name: "هانی موستارد وینگز",
        category: "سوخاری",
        price: 185000,
        desc: "بال مرغ با سس عسل و خردل",
        image: "images/honey-mustard.jpg"
    },
    {
        id: 3,
        name: "نیک برگر",
        category: "ساندویچ",
        price: 210000,
        desc: "برگر مخصوص نیک فود",
        image: "images/nik-burger.jpg"
    },
    {
        id: 4,
        name: "چیز برگر",
        category: "ساندویچ",
        price: 195000,
        desc: "برگر با پنیر ذوب شده",
        image: "images/cheese-burger.jpg"
    },
    {
        id: 5,
        name: "پیتزا پپرونی",
        category: "پیتزا",
        price: 245000,
        desc: "پپرونی و پنیر موزارلا",
        image: "images/pepperoni-pizza.jpg"
    },
    {
        id: 6,
        name: "استیک مرغ",
        category: "گریل سلامت",
        price: 165000,
        desc: "فیله مرغ گریل با سبزیجات",
        image: "images/chicken-steak.jpg"
    },
    {
        id: 7,
        name: "سیب زمینی سرخ کرده",
        category: "پیش غذا",
        price: 85000,
        desc: "سیب زمینی طلایی و ترد",
        image: "images/fries.jpg"
    },
    {
        id: 8,
        name: "سالاد سزار",
        category: "سالاد",
        price: 95000,
        desc: "کاهو، مرغ و سس سزار",
        image: "images/caesar-salad.jpg"
    }
];

const categories = ["همه", "پیتزا", "ساندویچ", "سوخاری", "گریل سلامت", "پیش غذا", "سالاد", "سس ها"];

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

function filterByCategory(cat) {
    let filtered = foods;
    if (cat !== "همه") {
        filtered = foods.filter(f => f.category === cat);
    }
    renderMenu(filtered);
}

function setupSearch() {
    document.getElementById('searchInput').addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = foods.filter(food => 
            food.name.toLowerCase().includes(term) || 
            food.desc.toLowerCase().includes(term)
        );
        renderMenu(filtered);
    });
}

function hideLoading() {
    const loading = document.getElementById('loading');
    loading.style.opacity = '0';
    setTimeout(() => loading.style.display = 'none', 600);
}

window.onload = () => {
    renderCategories();
    renderMenu(foods);
    setupSearch();
    hideLoading();
};
