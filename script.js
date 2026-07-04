const menu = {
fried:[
{name:"بوفالو وینگز",price:"بزودی",image:"assets/images/placeholder.jpg",desc:"بال سوخاری با سس بوفالو"},
{name:"هانی موستارد وینگز",price:"بزودی",image:"assets/images/placeholder.jpg",desc:"بال سوخاری با سس هانی موستارد"},
{name:"باربیکیو وینگز",price:"بزودی",image:"assets/images/placeholder.jpg",desc:"بال سوخاری با سس باربیکیو"},
{name:"نرمال وینگز",price:"بزودی",image:"assets/images/placeholder.jpg",desc:"بال سوخاری کلاسیک"},
{name:"فیله استریپس",price:"بزودی",image:"assets/images/placeholder.jpg",desc:"فیله مرغ سوخاری"}
],

burger:[
{name:"نیک برگر",price:"بزودی",image:"assets/images/placeholder.jpg",desc:"برگر مخصوص نیک فود"},
{name:"اسمش برگر",price:"بزودی",image:"assets/images/placeholder.jpg",desc:"برگر ویژه"},
{name:"همبرگر",price:"بزودی",image:"assets/images/placeholder.jpg",desc:"همبرگر کلاسیک"},
{name:"چیز برگر",price:"بزودی",image:"assets/images/placeholder.jpg",desc:"همبرگر با پنیر"},
{name:"ماشروم برگر",price:"بزودی",image:"assets/images/placeholder.jpg",desc:"برگر با قارچ"},
{name:"فیله برگر",price:"بزودی",image:"assets/images/placeholder.jpg",desc:"برگر فیله مرغ"}
],

pizza:[
{name:"نیک پیتزا",price:"بزودی",image:"assets/images/placeholder.jpg",desc:"پیتزای مخصوص نیک فود"},
{name:"پپرونی",price:"بزودی",image:"assets/images/placeholder.jpg",desc:"پیتزا پپرونی"}
],

grill:[
{name:"استیک مرغ",price:"بزودی",image:"assets/images/placeholder.jpg",desc:"استیک مرغ گریل"},
{name:"فیله گریل",price:"بزودی",image:"assets/images/placeholder.jpg",desc:"فیله مرغ گریل"}
],

starter:[
{name:"سیب زمینی",price:"بزودی",image:"assets/images/placeholder.jpg",desc:"سیب زمینی سرخ شده"},
{name:"وایت فرایز",price:"بزودی",image:"assets/images/placeholder.jpg",desc:"وایت فرایز"}
],

salad:[
{name:"سالاد نیک",price:"بزودی",image:"assets/images/placeholder.jpg",desc:"سالاد مخصوص"},
{name:"سزار سوخاری",price:"بزودی",image:"assets/images/placeholder.jpg",desc:"سالاد سزار"}
],

sauce:[
{name:"سس قارچ",price:"بزودی",image:"assets/images/placeholder.jpg",desc:"سس قارچ"},
{name:"سس چدار",price:"بزودی",image:"assets/images/placeholder.jpg",desc:"سس چدار"}
]
};

function render(id,data){
const box=document.getElementById(id);

data.forEach(food=>{

box.innerHTML+=`
<div class="food-card" onclick="showFood('${food.name}','${food.price}','${food.image}','${food.desc}')">
<img src="${food.image}">
<h3>${food.name}</h3>
<span>${food.price}</span>
</div>
`;

});
}

render("fried",menu.fried);
render("burger",menu.burger);
render("pizza",menu.pizza);
render("grill",menu.grill);
render("starter",menu.starter);
render("salad",menu.salad);
render("sauce",menu.sauce);

function showFood(name,price,image,desc){

document.getElementById("modal").style.display="block";

document.getElementById("foodName").innerText=name;
document.getElementById("foodPrice").innerText=price;
document.getElementById("foodDesc").innerText=desc;
document.getElementById("foodImage").src=image;

}

document.getElementById("close").onclick=()=>{
document.getElementById("modal").style.display="none";
  }
