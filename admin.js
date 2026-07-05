const foodsDiv = document.getElementById("foods");
const toast = document.getElementById("toast");

function showToast(text, color = "#16a34a") {
  toast.innerText = text;
  toast.style.background = color;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 2500);
}

async function loadFoods() {

  const { data, error } = await supabase
    .from("foods")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    showToast(error.message, "#dc2626");
    return;
  }

  foodsDiv.innerHTML = "";

  data.forEach(food => {

    foodsDiv.innerHTML += `

    <div class="food-card">

      <h3>${food.name}</h3>

      <p>دسته : ${food.category}</p>

      <p>قیمت : ${food.price.toLocaleString()} تومان</p>

      <p>${food.ingredients || ""}</p>

      <button class="delete-btn"
      onclick="deleteFood(${food.id})">

      حذف

      </button>

    </div>

    `;

  });

}

async function deleteFood(id){

const ok = confirm("حذف شود؟");

if(!ok) return;

const {error} = await supabase
.from("foods")
.delete()
.eq("id",id);

if(error){

showToast(error.message,"#dc2626");
return;

}

showToast("غذا حذف شد");

loadFoods();

}

document.getElementById("save").addEventListener("click", async ()=>{

const name=document.getElementById("name").value.trim();

const price=document.getElementById("price").value;

const category=document.getElementById("category").value;

const ingredients=document.getElementById("ingredients").value;

if(name===""){

showToast("نام غذا را وارد کنید","#dc2626");
return;

}

const {error}=await supabase

.from("foods")

.insert({

name:name,

category:category,

price:Number(price)||0,

description:"",

ingredients:ingredients,

image:"",

available:true,

featured:false

});

if(error){

console.error(error);

showToast(error.message,"#dc2626");

return;

}

showToast("غذا اضافه شد");

document.getElementById("name").value="";
document.getElementById("price").value="";
document.getElementById("ingredients").value="";

loadFoods();

});

loadFoods();
