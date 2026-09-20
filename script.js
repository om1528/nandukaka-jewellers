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


    groupGrid.innerHTML = "";


    const groups =
        jewelleryImages[metal];


    if (!groups) {
        console.error(
            "Collection not found:",
            metal
        );
        return;
    }


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