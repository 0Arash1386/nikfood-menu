const toast = document.getElementById("toast");

function showToast(message, type = "success") {
  toast.textContent = message;

  if (type === "success") {
    toast.style.background = "#2e7d32";
  } else if (type === "error") {
    toast.style.background = "#d32f2f";
  } else {
    toast.style.background = "#f9a825";
  }

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

async function loadFoods() {

  const { data, error } = await supabase
    .from("foods")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    showToast(error.message, "error");
    return;
  }

  const foods = document.getElementById("foods");
  foods.innerHTML = "";

  data.forEach(food => {

    foods.innerHTML += `

<div class="food-card">

<h3>${food.name}</h3>

<p>🍽 دسته: ${food.category}</p>

<p>💰 ${food.price.toLocaleString()} تومان</p>

<p>${food.ingredients || ""}</p>

<button onclick="deleteFood(${food.id})">
🗑 حذف
</button>

</div>

`;

  });

}

async function deleteFood(id){

if(!confirm("از حذف این غذا مطمئنی؟"))
return;

const {error}=await supabase
.from("foods")
.delete()
.eq("id",id);

if(error){

showToast(error.message,"error");

return;

}

showToast("غذا حذف شد ✅");

loadFoods();

}

document.getElementById("save").onclick = async () => {

  const food = {
    name: document.getElementById("name").value.trim(),
    category: document.getElementById("category").value,
    price: Number(document.getElementById("price").value) || 0,
    description: "",
    ingredients: document.getElementById("ingredients").value,
    image: "",
    available: true,
    featured: false
  };

  const { data, error } = await supabase
    .from("foods")
    .insert([food])
    .select();

  if (error) {
    console.error(error);
    showToast(error.message, "error");
    return;
  }

  console.log(data);

  showToast("غذا با موفقیت اضافه شد 🎉");

  loadFoods();
};
