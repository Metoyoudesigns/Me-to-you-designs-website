const money=n=>"£"+Number(n).toFixed(2);
function renderBasket(){
 const b=getBasket(),box=document.getElementById("basketContent");
 if(!b.length){box.innerHTML='<div class="basketBox emptyBasket"><div style="font-size:45px">🛍️</div><h2>Your basket is empty</h2><p>Find something lovely to personalise.</p><a class="btn primary" href="shop.html">Shop Now</a></div>';return}
 let total=0;
 const rows=b.map(i=>{const p=PRODUCTS.find(x=>x.id===i.id);if(!p)return "";let x=p.price*i.qty;total+=x;return `<div class="basketItem"><div><h3>${p.name}</h3><p>${p.from?"Starting from ":""}${money(p.price)} each</p></div><div class="qty"><button data-minus="${p.id}">−</button><b>${i.qty}</b><button data-plus="${p.id}">+</button><strong>${money(x)}</strong></div></div>`}).join("");
 box.innerHTML=`<div class="basketBox">${rows}<div class="basketSummary"><div>Subtotal</div><strong>${money(total)}</strong><p style="font-size:10px;color:#8d7882">Delivery and personalisation options can be confirmed at checkout.</p><button class="btn primary" id="checkoutBtn">Continue to Checkout</button></div></div>`;
 document.querySelectorAll("[data-minus]").forEach(btn=>btn.onclick=()=>changeQty(btn.dataset.minus,-1));document.querySelectorAll("[data-plus]").forEach(btn=>btn.onclick=()=>changeQty(btn.dataset.plus,1));
}
function changeQty(id,d){let b=getBasket(),x=b.find(i=>i.id===id);if(!x)return;x.qty+=d;if(x.qty<=0)b=b.filter(i=>i.id!==id);setBasket(b);renderBasket()}
renderBasket();
