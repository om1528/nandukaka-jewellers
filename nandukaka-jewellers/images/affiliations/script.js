const WA_NUMBER="919503151404";
let currentMetal="",currentGroup="",currentCategory="";
const labelMap={gold:"Gold",silver:"Silver",gents:"Gents",ladies:"Ladies",kids:"Kids",devotional:"Devotional",rings:"Rings",bracelets:"Bracelets",chains:"Chains","single-bali":"Single Bali","wrist-watches":"Wrist Watches",earrings:"Earrings",bangles:"Bangles",mangalsutra:"Mangalsutra",necklaces:"Necklaces",payal:"Payal"};

function hideViews(){["groups","subcategories","gallery"].forEach(id=>document.getElementById(id).classList.add("hidden"))}
function card(key,fn){return `<button class="category-card" onclick="${fn}('${key}')"><div class="category-icon">${labelMap[key]}</div><h3>${labelMap[key]}</h3><small>VIEW COLLECTION</small></button>`}

function openMetal(metal){
 currentMetal=metal;currentGroup="";currentCategory="";
 hideViews();
 document.getElementById("groups").classList.remove("hidden");
 document.getElementById("groupLabel").textContent=labelMap[metal].toUpperCase()+" COLLECTION";
 document.getElementById("groupTitle").textContent="Choose a Section";
 document.getElementById("groupGrid").innerHTML=["gents","ladies","kids","devotional"].map(k=>card(k,"openGroup")).join("");
 document.getElementById("groups").scrollIntoView({behavior:"smooth"});
}

function openGroup(group){
 currentGroup=group;currentCategory="";
 if(group==="kids"||group==="devotional"){openGallery();return}
 hideViews();
 document.getElementById("subcategories").classList.remove("hidden");
 document.getElementById("subLabel").textContent=labelMap[currentMetal].toUpperCase()+" • "+labelMap[group].toUpperCase();
 document.getElementById("subTitle").textContent="Choose Jewellery Type";
 document.getElementById("subGrid").innerHTML=Object.keys(jewelleryImages[currentMetal][group]).map(k=>card(k,"openCategory")).join("");
 document.getElementById("subcategories").scrollIntoView({behavior:"smooth"});
}

function openCategory(category){currentCategory=category;openGallery()}

function openGallery(){
 hideViews();
 document.getElementById("gallery").classList.remove("hidden");
 const isDirect=currentGroup==="kids"||currentGroup==="devotional";
 const title=isDirect?labelMap[currentGroup]:labelMap[currentCategory];
 document.getElementById("galleryLabel").textContent=labelMap[currentMetal].toUpperCase()+" • "+labelMap[currentGroup].toUpperCase();
 document.getElementById("galleryTitle").textContent=title;
 const images=isDirect?jewelleryImages[currentMetal][currentGroup]:jewelleryImages[currentMetal][currentGroup][currentCategory];
 const grid=document.getElementById("galleryGrid");
 if(!images.length){
   grid.innerHTML=`<div class="empty"><h3>No photos added yet</h3><p>You can add photos later in the correct images folder and image-list.js.</p></div>`;
 }else{
   grid.innerHTML=images.map((src,i)=>`<article class="product-card"><img src="${src}" alt="${title} ${i+1}"><div class="product-info"><small>SR NO: ${i+1}</small><h3>${title} Design ${i+1}</h3><button onclick="whatsappEnquiry('${title}',${i+1})">WhatsApp Enquiry</button></div></article>`).join("");
 }
 document.getElementById("gallery").scrollIntoView({behavior:"smooth"});
}

function whatsappEnquiry(title,no){
 const msg=encodeURIComponent(`Hello Nandukaka MAID Jewellers & Sons, I am interested in ${currentMetal} ${currentGroup} ${title}. SR NO: ${no}`);
 window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`,"_blank");
}
function goCollections(){hideViews();document.getElementById("collections").scrollIntoView({behavior:"smooth"})}
function goGroups(){openMetal(currentMetal)}
function goSubcategories(){if(currentGroup==="kids"||currentGroup==="devotional")openMetal(currentMetal);else openGroup(currentGroup)}
