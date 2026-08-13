let currentCat=new URLSearchParams(location.search).get("cat")||"all";
const money=n=>"£"+Number(n).toFixed(2);
function renderProducts(){
 const q=document.getElementById("searchProducts").value.toLowerCase().trim(),sort=document.getElementById("sortProducts").value;
 let list=PRODUCTS.filter(p=>(currentCat==="all"||p.cat===currentCat)&&(!q||p.name.toLowerCase().includes(q)||p.desc.toLowerCase().includes(q)));
 if(sort==="low")list.sort((a,b)=>a.price-b.price);if(sort==="high")list.sort((a,b)=>b.price-a.price);
 document.getElementById("productCount").textContent=list.length+" products";
 document.getElementById("productsGrid").innerHTML=list.map(p=>`<article class="productCard"><div class="productImage">${p.emoji}</div><div class="productInfo"><span class="tag">${p.cat}</span><h3>${p.name}</h3><p>${p.desc}</p><div class="productBottom"><span class="price">${p.from?"From ":""}${money(p.price)}</span><button class="addProduct" data-add="${p.id}">Add to basket</button></div></div></article>`).join("")||'<div class="emptyBasket">No products found.</div>';
 document.querySelectorAll("[data-add]").forEach(b=>b.onclick=()=>addToBasket(b.dataset.add));
 document.querySelectorAll(".catFilter").forEach(b=>b.classList.toggle("active",b.dataset.cat===currentCat));
}
document.querySelectorAll(".catFilter").forEach(b=>b.onclick=()=>{currentCat=b.dataset.cat;renderProducts()});
document.getElementById("searchProducts").oninput=renderProducts;document.getElementById("sortProducts").onchange=renderProducts;renderProducts();
