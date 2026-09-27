// ================================
// NANDUKAKA MAID JEWELLERS
// COLLECTION SYSTEM
// ================================

let selectedMetal = "";
let selectedGroup = "";
let selectedCategory = "";


// ================================
// CATEGORY NAMES
// ================================

const categoryNames = {
    rings: "Rings",
    bracelets: "Bracelets",
    chains: "Chains",
    earrings: "Earrings",
    bangles: "Bangles",
    mangalsutra: "Mangalsutra",
    necklaces: "Necklaces",
    payal: "Payal",
    "single-bali": "Single Bali",
    "wrist-watches": "Wrist Watches"
};


// ================================
// OPEN GOLD / SILVER
// ================================
function openMetal(metal) {

    selectedMetal = metal;
    selectedGroup = "";
    selectedCategory = "";

    document
        .getElementById("collections")
        .classList.add("hidden");

    document
        .getElementById("subcategories")
        .classList.add("hidden");

    document
        .getElementById("gallery")
        .classList.add("hidden");

    document
        .getElementById("groups")
        .classList.remove("hidden");


    const groupLabel =
        document.getElementById("groupLabel");

    if (groupLabel) {
        groupLabel.textContent =
            metal.toUpperCase() + " COLLECTION";
    }


    const groupTitle =
        document.getElementById("groupTitle");

    if (groupTitle) {
        groupTitle.textContent =
            "Choose a " +
            metal.charAt(0).toUpperCase() +
            metal.slice(1) +
            " Collection";
    }


    const groupGrid =
        document.getElementById("groupGrid");

    if (!groupGrid) {
        console.error("groupGrid not found");
        return;
    }


    // Clear old cards
    groupGrid.innerHTML = "";


    // Get existing collection
    const groups = {
        ...(jewelleryImages[metal] || {})
    };


    // Add ONLY these 2 extra cards to GOLD
    if (metal === "gold") {
        groups["couple-rings"] = [];
        groups["premium-collection"] = [];
    }


    // Create cards ONLY ONCE
    Object.keys(groups).forEach(group => {

        const card =
            document.createElement("div");

        card.className =
            "category-card";


        card.innerHTML = `

            <div class="category-icon">
                ${group.toUpperCase().charAt(0)}
            </div>

            <small>
                ${metal.toUpperCase()} COLLECTION
            </small>

            <h3>
                ${
                    group === "couple-rings"
                        ? "Couple Rings"
                        : group === "premium-collection"
                            ? "Premium Collection"
                            : capitalize(group)
                }
            </h3>

            <p>
                Explore →
            </p>

        `;


        card.addEventListener(
            "click",
            function () {
                openGroup(group);
            }
        );


        groupGrid.appendChild(card);

    });


    scrollToSection("groups");
}

groups["couple-rings"] = [];
groups["premium-collection"] = [];
// ================================
// OPEN GENTS / LADIES / KIDS
// ================================

function openGroup(group) {

    selectedGroup = group;
    selectedCategory = "";


    document
        .getElementById("groups")
        .classList.add("hidden");

    document
        .getElementById("gallery")
        .classList.add("hidden");


    const groupData =
        jewelleryImages[selectedMetal]?.[selectedGroup];


    if (!groupData) {

        console.error(
            "Group not found:",
            selectedMetal,
            selectedGroup
        );

        return;
    }


    // ================================
    // DIRECT PHOTOS
    // KIDS / DEVOTIONAL
    // ================================

    if (Array.isArray(groupData)) {

        openGallery(
            groupData,
            capitalize(selectedMetal) +
            " " +
            capitalize(selectedGroup)
        );

        return;
    }


    // ================================
    // GENTS / LADIES
    // ================================

    document
        .getElementById("subcategories")
        .classList.remove("hidden");


    document
        .getElementById("subLabel")
        .textContent =
        selectedMetal.toUpperCase() +
        " • " +
        selectedGroup.toUpperCase();


    document
        .getElementById("subTitle")
        .textContent =
        capitalize(selectedGroup) +
        " Jewellery";


    const subGrid =
        document.getElementById("subGrid");


    if (!subGrid) {
        console.error("subGrid not found");
        return;
    }


    subGrid.innerHTML = "";


    Object.keys(groupData)
        .forEach(category => {

            const card =
                document.createElement("div");


            card.className =
                "category-card";


            card.innerHTML = `

                <div class="category-icon">

                    <i class="fa-solid fa-gem"></i>

                </div>

                <small>
                    ${selectedMetal.toUpperCase()}
                </small>

                <h3>
                    ${
                        categoryNames[category]
                        || capitalize(category)
                    }
                </h3>

                <p>
                    View Designs →
                </p>

            `;


            card.addEventListener(
                "click",
                function () {

                    openCategory(category);

                }
            );


            subGrid.appendChild(card);

        });


    scrollToSection("subcategories");

}



// ================================
// OPEN JEWELLERY CATEGORY
// ================================

function openCategory(category) {

    selectedCategory = category;


    const images =
        jewelleryImages
            ?. [selectedMetal]
            ?. [selectedGroup]
            ?. [selectedCategory];


    if (!images) {




        
        console.error(
            "Category not found:",
            selectedMetal,
            selectedGroup,
            selectedCategory
        );

        return;
    }


    const categoryName =
        categoryNames[category]
        || capitalize(category);


    const title =
        capitalize(selectedMetal) +
        " " +
        capitalize(selectedGroup) +
        " " +
        categoryName;


    openGallery(
        images,
        title
    );

}



// ================================
// OPEN GALLERY
// ================================

function openGallery(images, title) {

    document
        .getElementById("groups")
        .classList.add("hidden");


    document
        .getElementById("subcategories")
        .classList.add("hidden");


    document
        .getElementById("gallery")
        .classList.remove("hidden");


    document
        .getElementById("galleryLabel")
        .textContent =
        selectedMetal.toUpperCase() +
        " COLLECTION";


    document
        .getElementById("galleryTitle")
        .textContent =
        title;


    const galleryGrid =
        document.getElementById("galleryGrid");


    if (!galleryGrid) {
        console.error("galleryGrid not found");
        return;
    }


    galleryGrid.innerHTML = "";


    // ================================
    // NO PHOTOS
    // ================================

    if (
        !Array.isArray(images) ||
        images.length === 0
    ) {

        galleryGrid.innerHTML = `

            <div class="empty">

                <h3>
                    Photos Coming Soon
                </h3>

                <p>
                    New jewellery designs will be added soon.
                </p>

            </div>

        `;


        scrollToSection("gallery");

        return;
    }



    // ================================
    // ADD PHOTOS
    // ================================

    images.forEach((image, index) => {

        const product =
            document.createElement("div");


        product.className =
            "product-card";


        // ================================
        // CATEGORY-WISE SEQUENCE
        // 01, 02, 03...
        // ================================

        const productNumber =
            String(index + 1)
                .padStart(2, "0");


        const productName =
            title +
            " " +
            productNumber;


        product.innerHTML = `

            <img
                src="${image}"
                alt="${productName}"
                loading="lazy"
            >

            <div class="product-info">

                <h3>
                    ${productName}
                </h3>

                <button
                    type="button"
                    class="whatsapp-product-btn">

                    <i class="fa-brands fa-whatsapp"></i>

                    Enquire on WhatsApp

                </button>

            </div>

        `;


        const whatsappButton =
            product.querySelector(
                ".whatsapp-product-btn"
            );


        whatsappButton.addEventListener(
            "click",
            function () {

                sendWhatsApp(
                    productName,
                    productNumber
                );

            }
        );


        galleryGrid.appendChild(product);

    });


    scrollToSection("gallery");

}



// ================================
// BACK TO COLLECTIONS
// ================================

function goCollections() {

    selectedMetal = "";
    selectedGroup = "";
    selectedCategory = "";


    document
        .getElementById("groups")
        .classList.add("hidden");


    document
        .getElementById("subcategories")
        .classList.add("hidden");


    document
        .getElementById("gallery")
        .classList.add("hidden");


    document
        .getElementById("collections")
        .classList.remove("hidden");


    scrollToSection("collections");

}



// ================================
// BACK TO GROUPS
// ================================

function goGroups() {

    selectedGroup = "";
    selectedCategory = "";


    document
        .getElementById("subcategories")
        .classList.add("hidden");


    document
        .getElementById("gallery")
        .classList.add("hidden");


    document
        .getElementById("groups")
        .classList.remove("hidden");


    scrollToSection("groups");

}



// ================================
// BACK FROM GALLERY
// ================================

function goSubcategories() {

    document
        .getElementById("gallery")
        .classList.add("hidden");


    const groupData =
        jewelleryImages
            ?. [selectedMetal]
            ?. [selectedGroup];


    if (!groupData) {
        return;
    }


    // Kids / Devotional

    if (Array.isArray(groupData)) {

        document
            .getElementById("groups")
            .classList.remove("hidden");


        scrollToSection("groups");

        return;
    }


    // Gents / Ladies

    document
        .getElementById("subcategories")
        .classList.remove("hidden");


    scrollToSection("subcategories");

}



// ================================
// WHATSAPP ENQUIRY
// ================================

function sendWhatsApp(
    product,
    serialNumber
) {

    const phoneNumber =
        "919503151404";


    const message =
`Hello Nandukaka MAID Jewellers,

I am interested in:

${product}

Design No: ${serialNumber}

Please share more details.`;


    const url =
        "https://wa.me/" +
        phoneNumber +
        "?text=" +
        encodeURIComponent(message);


    window.open(
        url,
        "_blank"
    );

}



// ================================
// CAPITALIZE
// ================================

function capitalize(text) {

    return text
        .replace(/-/g, " ")
        .replace(
            /\b\w/g,
            function (char) {
                return char.toUpperCase();
            }
        );

}



// ================================
// SMOOTH SCROLL
// ================================

function scrollToSection(id) {

    setTimeout(function () {

        const section =
            document.getElementById(id);


        if (!section) {
            return;
        }


        section.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    }, 100);

}



// ======================================================
// SAVING SCHEME CALCULATOR
// ======================================================

function calculateScheme() {

    const monthlyInput =
        document.getElementById(
            "monthlyAmount"
        );


    const durationInput =
        document.getElementById(
            "schemeDuration"
        );


    const bonusInput =
        document.getElementById(
            "bonusAmount"
        );


    if (
        !monthlyInput ||
        !durationInput ||
        !bonusInput
    ) {
        return;
    }


    const monthlyAmount =
        Number(monthlyInput.value);


    const duration =
        Number(durationInput.value);


    const bonus =
        Number(bonusInput.value);


    if (monthlyAmount <= 0) {

        alert(
            "Please enter a valid monthly amount."
        );

        return;
    }


    const totalPaid =
        monthlyAmount * duration;


    const finalAmount =
        totalPaid + bonus;


    const formatMoney =
        function (amount) {

            return "₹" +
                amount.toLocaleString("en-IN");

        };


    const summaryMonthly =
        document.getElementById(
            "summaryMonthly"
        );


    const summaryDuration =
        document.getElementById(
            "summaryDuration"
        );


    const totalPaidElement =
        document.getElementById(
            "totalPaid"
        );


    const summaryBonus =
        document.getElementById(
            "summaryBonus"
        );


    const finalAmountElement =
        document.getElementById(
            "finalAmount"
        );


    if (summaryMonthly) {

        summaryMonthly.textContent =
            formatMoney(monthlyAmount);

    }


    if (summaryDuration) {

        summaryDuration.textContent =
            duration + " Months";

    }


    if (totalPaidElement) {

        totalPaidElement.textContent =
            formatMoney(totalPaid);

    }


    if (summaryBonus) {

        summaryBonus.textContent =
            formatMoney(bonus);

    }


    if (finalAmountElement) {

        finalAmountElement.textContent =
            formatMoney(finalAmount);

    }

}



// ======================================================
// SAVING SCHEME - PAGE LOAD
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const monthly =
            document.getElementById(
                "monthlyAmount"
            );


        const duration =
            document.getElementById(
                "schemeDuration"
            );


        const bonus =
            document.getElementById(
                "bonusAmount"
            );


        if (
            monthly &&
            duration &&
            bonus
        ) {

            calculateScheme();

        }

    }
);
const WA_NUMBER="919503151404";
let currentMetal="",currentGroup="",currentCategory="";

const labelMap={
  gold:"Gold",
  silver:"Silver",

  gents:"Gents",
  ladies:"Ladies",
  kids:"Kids",
  devotional:"Devotional",

  rings:"Rings",
  bracelets:"Bracelets",
  chains:"Chains",
  "single-bali":"Single Bali",
  "wrist-watches":"Wrist Watches",

  earrings:"Earrings",
  bangles:"Bangles",
  mangalsutra:"Mangalsutra",
  necklaces:"Necklaces",
  payal:"Payal",

  // LADIES NEW SECTIONS
  "i-tops":"I Tops",
  pendants:"Pendants",
  "nose-pins":"Nose Pins",
  "fancy-jewellery":"Fancy Jewellery"
};


function hideViews(){
  ["groups","subcategories","gallery"].forEach(id=>
    document.getElementById(id).classList.add("hidden")
  )
}


function card(key,fn){
  return `
    <button 
      class="category-card" 
      onclick="${fn}('${key}')"
    >
      <div class="category-icon">
        ${labelMap[key] || key}
      </div>

      <h3>
        ${labelMap[key] || key}
      </h3>

      <small>
        VIEW COLLECTION
      </small>
    </button>
  `;
}


function openMetal(metal){

  currentMetal=metal;
  currentGroup="";
  currentCategory="";

  hideViews();

  document.getElementById("groups").classList.remove("hidden");

  document.getElementById("groupLabel").textContent=
    labelMap[metal].toUpperCase()+" COLLECTION";

  document.getElementById("groupTitle").textContent=
    "Choose a Section";

  document.getElementById("groupGrid").innerHTML=[
    "gents",
    "ladies",
    "kids",
    "devotional"
  ]
  .map(k=>card(k,"openGroup"))
  .join("");

  document.getElementById("groups").scrollIntoView({
    behavior:"smooth"
  });
}


function openGroup(group){

  currentGroup=group;
  currentCategory="";

  if(group==="kids"||group==="devotional"){
    openGallery();
    return;
  }

  hideViews();

  document.getElementById("subcategories").classList.remove("hidden");

  document.getElementById("subLabel").textContent=
    labelMap[currentMetal].toUpperCase()
    +" • "+
    labelMap[group].toUpperCase();

  document.getElementById("subTitle").textContent=
    "Choose Jewellery Type";

  document.getElementById("subGrid").innerHTML=
    Object.keys(jewelleryImages[currentMetal][group])
    .map(k=>card(k,"openCategory"))
    .join("");

  document.getElementById("subcategories").scrollIntoView({
    behavior:"smooth"
  });
}


function openCategory(category){
  currentCategory=category;
  openGallery();
}


function openGallery(){

  hideViews();

  document.getElementById("gallery").classList.remove("hidden");

  const isDirect=
    currentGroup==="kids"||
    currentGroup==="devotional";

  const title=
    isDirect
      ?labelMap[currentGroup]
      :labelMap[currentCategory];

  document.getElementById("galleryLabel").textContent=
    labelMap[currentMetal].toUpperCase()
    +" • "+
    labelMap[currentGroup].toUpperCase();

  document.getElementById("galleryTitle").textContent=
    title;

  const images=
    isDirect
      ?jewelleryImages[currentMetal][currentGroup]
      :jewelleryImages[currentMetal][currentGroup][currentCategory];

  const grid=
    document.getElementById("galleryGrid");

  if(!images.length){

    grid.innerHTML=`
      <div class="empty">

        <h3>No photos added yet</h3>

        <p>
          You can add photos later in the correct images folder and image-list.js.
        </p>

      </div>
    `;

  }else{

    grid.innerHTML=
      images.map((src,i)=>`

        <article class="product-card">

          <img 
            src="${src}" 
            alt="${title} ${i+1}"
          >

          <div class="product-info">

            <small>
              SR NO: ${i+1}
            </small>

            <h3>
              ${title} Design ${i+1}
            </h3>

            <button 
              onclick="whatsappEnquiry('${title}',${i+1})"
            >
              WhatsApp Enquiry
            </button>

          </div>

        </article>

      `).join("");
  }

  document.getElementById("gallery").scrollIntoView({
    behavior:"smooth"
  });
}


function whatsappEnquiry(title,no){

  const msg=encodeURIComponent(
    `Hello Nandukaka MAID Jewellers & Sons, I am interested in ${currentMetal} ${currentGroup} ${title}. SR NO: ${no}`
  );

  window.open(
    `https://wa.me/${WA_NUMBER}?text=${msg}`,
    "_blank"
  );
}


function goCollections(){

  hideViews();

  document.getElementById("collections").scrollIntoView({
    behavior:"smooth"
  });

}


function goGroups(){
  openMetal(currentMetal);
}


function goSubcategories(){

  if(
    currentGroup==="kids"||
    currentGroup==="devotional"
  ){
    openMetal(currentMetal);
  }else{
    openGroup(currentGroup);
  }

}