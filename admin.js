async function loadFoods() {
  const { data, error } = await supabase
    .from("foods")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  const foods = document.getElementById("foods");
  foods.innerHTML = "";

  data.forEach(food => {
    foods.innerHTML += `
      <div style="border:1px solid #ddd;padding:15px;margin:10px;border-radius:10px">
        <h3>${food.name}</h3>
        <p>دسته: ${food.category}</p>
        <p>قیمت: ${food.price}</p>
        <button onclick="deleteFood(${food.id})">🗑 حذف</button>
      </div>
    `;
  });
}

async function deleteFood(id) {
  if (!confirm("حذف شود؟")) return;

  await supabase
    .from("foods")
    .delete()
    .eq("id", id);

  loadFoods();
}

document.getElementById("addFood").onclick = async () => {

  const name = prompt("نام غذا");
  if (!name) return;

  const category = prompt("دسته");
  const price = prompt("قیمت");

  await supabase
    .from("foods")
    .insert({
      name,
      category,
      price
    });

  loadFoods();
};

loadFoods();
