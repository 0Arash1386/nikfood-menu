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

document.getElementById("save").onclick=async()=>{

const name=document.getElementById("name").value.trim();

const category=document.getElementById("category").value;

const price=document.getElementById("price").value;

const ingredients=document.getElementById("ingredients").value;

if(name===""||price===""){

showToast("همه فیلدهای ضروری را پر کن","error");

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

showToast(error.message,"error");

return;

}

showToast("غذا با موفقیت اضافه شد 🎉");

document.getElementById("name").value="";

document.getElementById("price").value="";

document.getElementById("ingredients").value="";

loadFoods();

};

document.getElementById("reload").onclick=()=>{

loadFoods();

showToast("اطلاعات بروزرسانی شد");

};

loadFoods();
