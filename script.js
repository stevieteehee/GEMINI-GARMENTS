document.addEventListener("DOMContentLoaded", function () {

    /* ==================
       Element Selection
       ================== */

    const heroImage = document.getElementById("heroImage");
    const heroHeading = document.querySelector(".hero-text h1");
    const heroDescription = document.querySelector(".hero-text p");

    const previousButton = document.getElementById("previousButton");
    const nextButton = document.getElementById("nextButton");

    const searchInput = document.getElementById("search");
    const searchButton = document.getElementById("searchButton");

    const productCards = document.querySelectorAll(".product-card");
    const detailsButtons = document.querySelectorAll(".details-button");

    const newsletterForm = document.querySelector(".quick-links form");
    const emailInput = document.getElementById("email");


    /* =============================
       Interaction 1: Hero Carousel
       ============================= */

    const heroSlides = [
        {
            image: "gemini hero.jpg",
            alt: "Jacket",
            heading: "Beyond the Horizon",
            description:
                "Premium apparel inspired by the event horizon."
        },
        {
            image: "the gemini twins.jpg",
            alt: "Two sets",
            heading: "The Gemini Twins",
            description:
                "Be one with your constellation"
        },
        {
            image: "images/hero-placeholder-3.jpg",
            alt: "TDB",
            heading: "TBD",
            description:
                "TBD"
        }
    ];

    let currentSlideIndex = 0;


    /*
        Changes the hero image and text based on the current slide.
    */

    function displaySlide() {

        const currentSlide = heroSlides[currentSlideIndex];

        heroImage.src = currentSlide.image;
        heroImage.alt = currentSlide.alt;

        heroHeading.textContent = currentSlide.heading;
        heroDescription.textContent = currentSlide.description;

    }


    /*
        Moves forward through the slides.
        Returns to the first slide after the final slide.
    */

    function showNextSlide() {

        currentSlideIndex++;

        if (currentSlideIndex >= heroSlides.length) {
            currentSlideIndex = 0;
        }

        displaySlide();

    }


    /*
        Moves backward through the slides.
        Returns to the final slide when moving backward
        from the first slide.
    */

    function showPreviousSlide() {

        currentSlideIndex--;

        if (currentSlideIndex < 0) {
            currentSlideIndex = heroSlides.length - 1;
        }

        displaySlide();

    }


    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);


    /* ==============================
       Interaction 2: Product Search
       ============================== */

    /*
        Creates a message that appears when no products
        match the user's search.
    */

    const noResultsMessage = document.createElement("p");

    noResultsMessage.textContent =
        "No products matched your search. Try another product name.";

    noResultsMessage.classList.add("no-results-message");
    noResultsMessage.hidden = true;

    document.querySelector(".product-grid").after(noResultsMessage);


    /*
        Compares the search text with each product name.
        Matching products remain visible.
        Nonmatching products are hidden.
    */

    function filterProducts() {

        const searchTerm = searchInput.value
            .trim()
            .toLowerCase();

        let visibleProductCount = 0;

        productCards.forEach(function (card) {

            const productName = card
                .querySelector("h3")
                .textContent
                .toLowerCase();

            const productMatches =
                productName.includes(searchTerm);

            if (productMatches) {

                card.hidden = false;
                visibleProductCount++;

            } else {

                card.hidden = true;

            }

        });


        /*
            The message appears only when no matching
            products are visible.
        */

        if (visibleProductCount === 0) {
            noResultsMessage.hidden = false;
        } else {
            noResultsMessage.hidden = true;
        }

    }


    searchButton.addEventListener("click", filterProducts);


    /*
        Products also filter as the user types.
    */

    searchInput.addEventListener("input", filterProducts);


    /*
        Prevents Enter from causing unwanted behavior
        while the search input is selected.
    */

    searchInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            event.preventDefault();
            filterProducts();

        }

    });


    /* ===============================
       Interaction 3: Product Details
       =============================== */

    const productDescriptions = [
        "TBD."
    ];


    detailsButtons.forEach(function (button, index) {

        button.addEventListener("click", function () {

            const selectedCard = button.closest(".product-card");

            let detailsParagraph =
                selectedCard.querySelector(".product-description");


            /*
                If the description does not exist yet, js adds one.
            */

            if (!detailsParagraph) {

                detailsParagraph = document.createElement("p");

                detailsParagraph.classList.add(
                    "product-description"
                );

                detailsParagraph.textContent =
                    productDescriptions[index];

                button.before(detailsParagraph);

                button.textContent = "Hide Details";

            } else {

                /*
                    Toggles the description between visible
                    and hidden.
                */

                detailsParagraph.hidden =
                    !detailsParagraph.hidden;

                if (detailsParagraph.hidden) {

                    button.textContent = "View Details";

                } else {

                    button.textContent = "Hide Details";

                }

            }

        });

    });

    /* ===============================
       Interaction 4: Newsletter Form
       =============================== */

    const formMessage = document.createElement("p");

    formMessage.classList.add("form-message");
    formMessage.setAttribute("aria-live", "polite");

    newsletterForm.appendChild(formMessage);


    newsletterForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const emailAddress = emailInput.value.trim();

        /*
            Checks whether the email
            field is empty or invalid.
        */

        if (emailAddress === "") {

            formMessage.textContent =
                "Please enter an email address.";

            formMessage.className =
                "form-message error-message";

            emailInput.focus();

        } else if (!emailInput.validity.valid) {

            formMessage.textContent =
                "Please enter a valid email address.";

            formMessage.className =
                "form-message error-message";

            emailInput.focus();

        } else {

            formMessage.textContent =
                "Transmission received. You have joined the Gemini Garments newsletter.";

            formMessage.className =
                "form-message success-message";

            newsletterForm.reset();

        }

    });

});
    });

});
