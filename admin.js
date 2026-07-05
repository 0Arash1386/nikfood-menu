const foodsDiv = document.getElementById("foods");
const toast = document.getElementById("toast");

function showToast(message, color = "#16a34a") {
  toast.innerText = message;
  toast.style.background = color;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}

async function loadFoods() {

  const { data, error } = await db
    .from("foods")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    showToast(error.message, "#dc2626");
    return;
  }

  foodsDiv.innerHTML = "";

  data.forEach(food => {

    foodsDiv.innerHTML += `
      <div class="food-card">

        <h3>${food.name}</h3>

        <p>🍔 دسته: ${food.category}</p>

        <p>💰 ${Number(food.price).toLocaleString()} تومان</p>

        <p>${food.ingredients || ""}</p>

        <button class="delete-btn" onclick="deleteFood(${food.id})">
          🗑 حذف
        </button>

      </div>
    `;

  });

}

async function deleteFood(id) {

  if (!confirm("از حذف این غذا مطمئنی؟")) return;

  const { error } = await db
    .from("foods")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    showToast(error.message, "#dc2626");
    return;
  }

  showToast("غذا حذف شد ✅");

  loadFoods();

}

document.getElementById("save").addEventListener("click", async () => {

  const name = document.getElementById("name").value.trim();
  const category = document.getElementById("category").value;
  const price = Number(document.getElementById("price").value) || 0;
  const ingredients = document.getElementById("ingredients").value.trim();

  if (!name) {
    showToast("نام غذا را وارد کنید", "#dc2626");
    return;
  }

  const { error } = await db
    .from("foods")
    .insert([
      {
        name: name,
        category: category,
        price: price,
        description: "",
        ingredients: ingredients,
        image: "",
        available: true,
        featured: false
      }
    ]);

  if (error) {
    console.error(error);
    showToast(error.message, "#dc2626");
    return;
  }

  showToast("غذا با موفقیت اضافه شد 🎉");

  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("ingredients").value = "";

  loadFoods();

});

const reloadBtn = document.getElementById("reload");

if (reloadBtn) {

  reloadBtn.addEventListener("click", () => {
    loadFoods();
    showToast("بروزرسانی شد");
  });

}

loadFoods();
