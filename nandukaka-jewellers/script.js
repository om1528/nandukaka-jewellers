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


    // Hide sections

    document
        .getElementById("collections")
        .classList.add("hidden");


    document
        .getElementById("subcategories")
        .classList.add("hidden");


    document
        .getElementById("gallery")
        .classList.add("hidden");


    // Show groups

    document
        .getElementById("groups")
        .classList.remove("hidden");


    // Titles

    document
        .getElementById("groupLabel")
        .textContent = metal.toUpperCase() + " COLLECTION";


    document
        .getElementById("groupTitle")
        .textContent =
        "Choose a " +
        metal.charAt(0).toUpperCase() +
        metal.slice(1) +
        " Collection";


    const groupGrid =
        document.getElementById("groupGrid");


    groupGrid.innerHTML = "";


    // Get groups from image-list.js

    const groups =
        jewelleryImages[metal];


    // Create cards

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
                ${capitalize(group)}
            </h3>

            <p>
                Explore →
            </p>

        `;


        card.onclick =
            function () {

                openGroup(group);

            };


        groupGrid.appendChild(card);

    });


    scrollToSection("groups");

}



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
        jewelleryImages
        [selectedMetal]
        [selectedGroup];


    // ================================
    // KIDS / DEVOTIONAL
    // DIRECT PHOTOS
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
    // SUBCATEGORIES
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

                    ${categoryNames[category]
                    || capitalize(category)}

                </h3>


                <p>

                    View Designs →

                </p>

            `;


            card.onclick =
                function () {

                    openCategory(category);

                };


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
        [selectedMetal]
        [selectedGroup]
        [selectedCategory];


    openGallery(

        images,

        capitalize(selectedMetal) +
        " " +
        capitalize(selectedGroup) +
        " " +
        (categoryNames[category]
        || capitalize(category))

    );

}



// ================================
// OPEN GALLERY
// ================================

function openGallery(images, title) {

    // Hide all previous sections

    document
        .getElementById("groups")
        .classList.add("hidden");


    document
        .getElementById("subcategories")
        .classList.add("hidden");


    // Show gallery

    document
        .getElementById("gallery")
        .classList.remove("hidden");


    // Gallery title

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


    galleryGrid.innerHTML = "";


    // ================================
    // NO PHOTOS
    // ================================

    if (!images || images.length === 0) {

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


        product.innerHTML = `

            <img
                src="${image}"
                alt="${title} Jewellery Design ${index + 1}"
                loading="lazy"
            >


            <div class="product-info">

                <h3>

                    ${title}

                </h3>


                <button
    onclick="sendWhatsApp('${title}', ${index + 1})">

    <i class="fa-brands fa-whatsapp"></i>

    Enquire on WhatsApp

</button>

            </div>

        `;


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
        [selectedMetal]
        [selectedGroup];


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

function sendWhatsApp(product, serialNumber) {

    const phoneNumber = "919503151404";

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

    window.open(url, "_blank");
}


// ================================
// CAPITALIZE
// ================================

function capitalize(text) {

    return text
        .replace(/-/g, " ")
        .replace(/\b\w/g,
            char => char.toUpperCase()
        );

}



// ================================
// SMOOTH SCROLL
// ================================

function scrollToSection(id) {

    setTimeout(() => {

        document
            .getElementById(id)
            .scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

    }, 100);

}
function calculateScheme() {

    const monthlyAmount =
        Number(document.getElementById("monthlyAmount").value);

    const duration =
        Number(document.getElementById("schemeDuration").value);

    const bonus =
        Number(document.getElementById("bonusAmount").value);


    // Customer ne total kitna bhara
    const totalPaid = monthlyAmount * duration;


    // Bonus add karke final jewellery value
    const finalAmount = totalPaid + bonus;


    // Summary update
    document.getElementById("summaryMonthly").textContent =
        "₹" + monthlyAmount.toLocaleString("en-IN");

    document.getElementById("totalPaid").textContent =
        "₹" + totalPaid.toLocaleString("en-IN");

    document.getElementById("summaryBonus").textContent =
        "₹" + bonus.toLocaleString("en-IN");

    document.getElementById("finalAmount").textContent =
        "₹" + finalAmount.toLocaleString("en-IN");
}