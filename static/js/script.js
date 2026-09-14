document.addEventListener("DOMContentLoaded", function () {


    // =========================================
    // ELEMENTS
    // =========================================

    const clickHereBtn =
        document.getElementById("clickHereBtn");

    const cakeModal =
        document.getElementById("cakeModal");

    const modalClose =
        document.getElementById("modalClose");

    const startBakingBtn =
        document.getElementById("startBakingBtn");

    const colorOptions =
        document.querySelectorAll(".color-option");


    // =========================================
    // CAKE SELECTION
    // =========================================

    const cakeSelection = {
        crust1: null,
        crust2: null,
        crust3: null
    };


    // =========================================
    // OPEN MODAL
    // =========================================

    clickHereBtn.addEventListener("click", function () {

        cakeModal.classList.add("active");

    });


    // =========================================
    // CLOSE MODAL
    // =========================================

    modalClose.addEventListener("click", function () {

        cakeModal.classList.remove("active");

    });


    // =========================================
    // COLOR SELECTION
    // =========================================

    colorOptions.forEach(function (option) {

        option.addEventListener("click", function () {

            const crust =
                this.dataset.crust;

            const color =
                this.dataset.color;


            // Remove previous selection
            document
                .querySelectorAll(
                    `.color-option[data-crust="${crust}"]`
                )
                .forEach(function (button) {

                    button.classList.remove("selected");

                });


            // Select current color
            this.classList.add("selected");


            // Save selection in JavaScript
            cakeSelection[crust] = color;


            // Check if all crusts are selected
            checkCakeSelection();

        });

    });


    // =========================================
    // CHECK SELECTION
    // =========================================

    function checkCakeSelection() {

        const complete =
            cakeSelection.crust1 !== null &&
            cakeSelection.crust2 !== null &&
            cakeSelection.crust3 !== null;


        startBakingBtn.disabled = !complete;

    }


    // =========================================
    // START BAKING
    // =========================================

    startBakingBtn.addEventListener(
    "click",
    async function () {

        if (this.disabled) {
            return;
        }


        try {

            const response = await fetch(
                "/save-cake",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify(
                        cakeSelection
                    )
                }
            );


            const result =
                await response.json();


            if (result.success) {

                console.log(
                    "Cake saved:",
                    cakeSelection
                );


                // Go to baking page
                window.location.href = "/baking";

            }


        } catch (error) {

            console.error(
                "Error saving cake:",
                error
            );

        }

    }
);


});