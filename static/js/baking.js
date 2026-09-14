document.addEventListener("DOMContentLoaded", function () {

    const countdown =
        document.getElementById("countdown");

    const readyMessage =
        document.getElementById("readyMessage");


    let timeLeft = 5;


    // =========================================
    // COUNTDOWN
    // =========================================

    const timer = setInterval(function () {

        timeLeft--;

        if (timeLeft > 0) {

            countdown.textContent = timeLeft;

            // Restart pulse animation
            countdown.style.animation = "none";

            countdown.offsetHeight;

            countdown.style.animation =
                "countdownPulse 1s ease-in-out";

        }


        // =====================================
        // CAKE READY
        // =====================================

        else {

            clearInterval(timer);


            countdown.style.display = "none";


            document.querySelector(
                ".seconds-text"
            ).style.display = "none";


            readyMessage.classList.add("show");


            // Wait a little after showing message
            setTimeout(function () {

                window.location.href =
                    "/celebrate";

            }, 1200);

        }

    }, 1000);

});