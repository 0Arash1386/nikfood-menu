async function loadFoods() {
  const { data, error } = await supabase
    .from("foods")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    alert(error.message);
    return;
  }

  const foods = document.getElementById("foods");
  foods.innerHTML = "";

  data.forEach(food => {
    foods.innerHTML += `
      <div class="food-card">
        <h3>${food.name}</h3>
        <p><b>دسته:</b> ${food.category}</p>
        <p><b>قیمت:</b> ${food.price} تومان</p>

        <button onclick="deleteFood(${food.id})">🗑 حذف</button>
      </div>
    `;
  });
}

async function deleteFood(id){
  if(!confirm("حذف شود؟")) return;

  await supabase
    .from("foods")
    .delete()
    .eq("id",id);

  loadFoods();
}

document.getElementById("save").onclick = async ()=>{

  const name=document.getElementById("name").value;
  const category=document.getElementById("category").value;
  const price=document.getElementById("price").value;
  const ingredients=document.getElementById("ingredients").value;

  if(!name || !category || !price){
    alert("همه فیلدها را پر کن");
    return;
  }

  const {error}=await supabase
  .from("foods")
  .insert([{
      name,
      category,
      price:Number(price),
      ingredients
  }]);

  if(error){
      alert(error.message);
      return;
  }

  document.getElementById("name").value="";
  document.getElementById("category
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
