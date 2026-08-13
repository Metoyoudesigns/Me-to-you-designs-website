const PRODUCTS=[
{id:"vest",name:"Personalised Children's Vest",cat:"clothing",price:10,from:true,emoji:"👕",desc:"A personalised vest made especially for them."},
{id:"kids-top",name:"Personalised Children's Top",cat:"clothing",price:10,from:true,emoji:"👕",desc:"Custom children's tops for birthdays, parties and everyday fun."},
{id:"adult-top",name:"Personalised Adult Top",cat:"clothing",price:15,from:true,emoji:"👚",desc:"A personalised adult top designed your way."},
{id:"kids-pjs",name:"Personalised Children's Pyjamas",cat:"clothing",price:15,from:true,emoji:"🛌",desc:"Cosy personalised pyjamas for little ones."},
{id:"adult-pjs",name:"Personalised Adult Pyjamas",cat:"clothing",price:20,from:true,emoji:"🛌",desc:"Personalised adult pyjamas made to order."},
{id:"school-bag",name:"Personalised School Bag",cat:"school",price:15,from:true,emoji:"🎒",desc:"A personalised school bag with their name."},
{id:"pe-bag",name:"Personalised PE Bag",cat:"school",price:10,from:true,emoji:"🎒",desc:"Personalised PE bags for school."},
{id:"bottle",name:"Personalised Water Bottle",cat:"school",price:6,from:true,emoji:"🧴",desc:"A personalised bottle for school, sports or days out."},
{id:"lunch",name:"Personalised Lunch Box",cat:"school",price:8,from:true,emoji:"🍱",desc:"A personalised lunch box made for them."},
{id:"stack",name:"Standard 1 Number Foil Stack",cat:"party",price:25,from:false,emoji:"🎈",desc:"A classic number balloon stack for celebrations."},
{id:"stack2",name:"1 Number + 2 Foils",cat:"party",price:30,from:false,emoji:"🎈",desc:"A fuller balloon stack with two extra foils."},
{id:"detailed-stack",name:"Detailed Balloon Stack",cat:"party",price:40,from:true,emoji:"🎈",desc:"A detailed personalised balloon stack."},
{id:"half-arch",name:"Half Balloon Arch",cat:"party",price:50,from:false,emoji:"🎈",desc:"A beautiful half balloon arch for your event."},
{id:"full-arch",name:"Full Balloon Arch",cat:"party",price:80,from:false,emoji:"🎈",desc:"A full statement balloon arch."},
{id:"table-centre",name:"Table Centre Balloons",cat:"party",price:15,from:false,emoji:"🎈",desc:"Personalised balloon table centre."},
{id:"a4-frame",name:"A4 Photo Frame",cat:"prints",price:15,from:false,emoji:"🖼️",desc:"A personalised A4 keepsake print and frame."},
{id:"a3-frame",name:"A3 Print & Framed",cat:"prints",price:25,from:false,emoji:"🖼️",desc:"A larger A3 personalised print and frame."},
{id:"sweet-cones",name:"Personalised Sweet Cones",cat:"partyfavours",price:1.5,from:true,emoji:"🍬",desc:"Personalised sweet cones for your celebration."},
{id:"stickers",name:"Personalised Sticker Sheet",cat:"partyfavours",price:2.5,from:false,emoji:"🏷️",desc:"A sheet of personalised stickers."},
{id:"tags",name:"Thank You Tags — Set of 15",cat:"partyfavours",price:10,from:false,emoji:"💌",desc:"A set of 15 personalised thank-you tags."},
{id:"mug",name:"Personalised Mug",cat:"gifts",price:8,from:true,emoji:"☕",desc:"A personalised mug made especially for you."}
];
function getBasket(){try{return JSON.parse(localStorage.getItem("meToYouBasket"))||[]}catch{return[]}}
function setBasket(b){localStorage.setItem("meToYouBasket",JSON.stringify(b));updateBasketCount()}
function addToBasket(id){const p=PRODUCTS.find(x=>x.id===id);if(!p)return;let b=getBasket(),x=b.find(i=>i.id===id);if(x)x.qty++;else b.push({id,qty:1});setBasket(b);alert(p.name+" added to your basket ♡")}
function updateBasketCount(){const n=getBasket().reduce((s,i)=>s+i.qty,0);document.querySelectorAll("#basketCount").forEach(x=>x.textContent=n)}
function setupMenu(){const b=document.getElementById("menuBtn"),m=document.getElementById("mobileMenu");b?.addEventListener("click",()=>m?.classList.toggle("open"))}
document.addEventListener("DOMContentLoaded",()=>{updateBasketCount();setupMenu()})
