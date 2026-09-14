document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const slideTrack =
        document.getElementById("slideTrack");

    const slideButton =
        document.getElementById("slideButton");

    const slideFill =
        document.getElementById("slideFill");

    const slideContainer =
        document.getElementById("slideContainer");

    const birthdayMessage =
        document.getElementById("birthdayMessage");

    const partyInvitation =
        document.getElementById("partyInvitation");

    const birthdayPartyBtn =
        document.getElementById("birthdayPartyBtn");

    const candles =
        document.querySelector(".candles");

    const fireworks =
        document.getElementById("fireworks");

    const confettiContainer =
        document.getElementById("confettiContainer");

    const balloons =
        document.getElementById("balloons");

    const hearts =
        document.getElementById("hearts");

    /* =====================================================
       AUDIO
    ====================================================== */

    const clapSound =
        document.getElementById("clapSound");

    const birthdayMusic =
        document.getElementById("birthdayMusic");


    function playClap() {

        if (!clapSound) {
            return;
        }

        clapSound.pause();
        clapSound.currentTime = 0;

        const playPromise =
            clapSound.play();

        if (playPromise !== undefined) {

            playPromise.catch(function (error) {

                console.log(
                    "Clap audio could not be played:",
                    error
                );

            });

        }
    }


    function playBirthdayMusic() {

        if (!birthdayMusic) {
            return;
        }

        birthdayMusic.pause();
        birthdayMusic.currentTime = 0;

        const playPromise =
            birthdayMusic.play();

        if (playPromise !== undefined) {

            playPromise.catch(function (error) {

                console.log(
                    "Birthday music could not be played:",
                    error
                );

            });

        }
    }


    /* =====================================================
       VARIABLES
    ====================================================== */

    let dragging = false;

    let completed = false;

    let startX = 0;

    let startLeft = 5;


    /* =====================================================
       GET MAX SLIDER POSITION
    ====================================================== */

    function getMaxPosition() {

        return (
            slideTrack.offsetWidth -
            slideButton.offsetWidth -
            5
        );

    }


    /* =====================================================
       UPDATE SLIDER
    ====================================================== */

    function updateSlider(left) {

        const maxPosition =
            getMaxPosition();

        left = Math.max(
            5,
            Math.min(
                left,
                maxPosition
            )
        );


        slideButton.style.left =
            left + "px";


        const percentage =
            (left / maxPosition) * 100;


        slideFill.style.width =
            percentage + "%";


        return percentage;

    }


    /* =====================================================
       START DRAG
    ====================================================== */

    function startDrag(event) {

        if (completed) {
            return;
        }


        dragging = true;


        startX =
            event.clientX;


        startLeft =
            parseFloat(
                getComputedStyle(
                    slideButton
                ).left
            );


        slideButton.setPointerCapture(
            event.pointerId
        );

    }


    /* =====================================================
       DRAG
    ====================================================== */

    function drag(event) {

        if (
            !dragging ||
            completed
        ) {
            return;
        }


        const difference =
            event.clientX - startX;


        const newLeft =
            startLeft + difference;


        const percentage =
            updateSlider(newLeft);


        if (percentage >= 96) {

            completeBirthday();

        }

    }


    /* =====================================================
       END DRAG
    ====================================================== */

    function endDrag() {

        if (
            completed ||
            !dragging
        ) {
            return;
        }


        dragging = false;


        slideButton.style.left =
            "5px";


        slideFill.style.width =
            "0%";

    }


    /* =====================================================
       CREATE FIREWORK
    ====================================================== */

    function createFirework(
        x,
        y,
        delay = 0
    ) {

        const firework =
            document.createElement("div");


        firework.className =
            "firework";


        firework.style.left =
            x + "%";


        firework.style.top =
            y + "%";


        firework.style.animationDelay =
            delay + "s";


        const particleCount = 22;


        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            const particle =
                document.createElement("span");


            particle.className =
                "firework-particle";


            const angle =
                (360 / particleCount) * i;


            const distance =
                55 +
                Math.random() * 70;


            particle.style.setProperty(
                "--angle",
                angle + "deg"
            );


            particle.style.setProperty(
                "--distance",
                distance + "px"
            );


            firework.appendChild(
                particle
            );

        }


        fireworks.appendChild(
            firework
        );


        setTimeout(function () {

            firework.remove();

        }, 1600);

    }


    /* =====================================================
       FIREWORK SHOW
    ====================================================== */

    function launchFireworks() {

        createFirework(
            13,
            30
        );


        createFirework(
            87,
            27,
            .15
        );


        setTimeout(function () {

            createFirework(
                27,
                18
            );


            createFirework(
                73,
                17
            );

        }, 350);


        setTimeout(function () {

            createFirework(
                50,
                12
            );

        }, 650);

    }


    /* =====================================================
       CREATE CONFETTI
    ====================================================== */

    function createConfetti() {

        const amount =
            window.innerWidth < 600
                ? 90
                : 140;


        for (
            let i = 0;
            i < amount;
            i++
        ) {

            const piece =
                document.createElement("span");


            piece.className =
                "confetti";


            piece.style.left =
                Math.random() * 100 + "%";


            piece.style.setProperty(
                "--drift",
                (
                    Math.random() * 240 -
                    120
                ) + "px"
            );


            piece.style.setProperty(
                "--duration",
                (
                    3 +
                    Math.random() * 3
                ) + "s"
            );


            piece.style.animationDelay =
                (
                    Math.random() * 1.2
                ) + "s";


            const colors = [
                "#ff6fa8",
                "#8edcf2",
                "#b999ed",
                "#ffd86b",
                "#ffffff"
            ];


            piece.style.background =
                colors[
                    Math.floor(
                        Math.random() *
                        colors.length
                    )
                ];


            piece.style.transform =
                "rotate(" +
                Math.random() * 360 +
                "deg)";


            confettiContainer.appendChild(
                piece
            );


            setTimeout(function () {

                piece.remove();

            }, 7500);

        }

    }


    /* =====================================================
       CREATE HEARTS
    ====================================================== */

    function createHearts() {

        const amount = 15;


        for (
            let i = 0;
            i < amount;
            i++
        ) {

            setTimeout(function () {

                const heart =
                    document.createElement("span");


                heart.className =
                    "heart";


                heart.textContent =
                    Math.random() > .5
                        ? "❤️"
                        : "♡";


                heart.style.left =
                    Math.random() * 100 + "%";


                heart.style.setProperty(
                    "--drift",
                    (
                        Math.random() * 120 -
                        60
                    ) + "px"
                );


                heart.style.setProperty(
                    "--duration",
                    (
                        4 +
                        Math.random() * 3
                    ) + "s"
                );


                hearts.appendChild(
                    heart
                );


                setTimeout(function () {

                    heart.remove();

                }, 7500);

            }, i * 180);

        }

    }


    /* =====================================================
       COMPLETE BIRTHDAY
    ====================================================== */

    function completeBirthday() {

        if (completed) {
            return;
        }


        completed = true;

        dragging = false;


        const maxPosition =
            getMaxPosition();


        slideButton.style.left =
            maxPosition + "px";


        slideFill.style.width =
            "100%";


        /* ---------------------------------------------
           CLAP SOUND
        --------------------------------------------- */

        playClap();


        /* ---------------------------------------------
           BLOW CANDLES
        --------------------------------------------- */

        candles.classList.add(
            "blown"
        );


        /* ---------------------------------------------
           HAPPY BIRTHDAY MUSIC
           Starts 1.5 seconds after clap
        --------------------------------------------- */

        setTimeout(function () {

            playBirthdayMusic();

        }, 1500);


        /* ---------------------------------------------
           FIREWORKS
        --------------------------------------------- */

        setTimeout(function () {

            launchFireworks();

        }, 300);


        /* ---------------------------------------------
           CONFETTI
        --------------------------------------------- */

        setTimeout(function () {

            createConfetti();

        }, 450);


        /* ---------------------------------------------
           BALLOONS
        --------------------------------------------- */

        setTimeout(function () {

            balloons.classList.add(
                "celebrating"
            );

        }, 600);


        /* ---------------------------------------------
           HEARTS
        --------------------------------------------- */

        setTimeout(function () {

            createHearts();

        }, 700);


        /* ---------------------------------------------
           HIDE SLIDER
        --------------------------------------------- */

        setTimeout(function () {

            slideContainer.classList.add(
                "completed"
            );

        }, 500);


        /* ---------------------------------------------
           SHOW BIRTHDAY MESSAGE
        --------------------------------------------- */

        setTimeout(function () {

            birthdayMessage.classList.add(
                "show"
            );

        }, 850);


        /* ---------------------------------------------
           SHOW PARTY BUTTON
        --------------------------------------------- */

        setTimeout(function () {

            if (partyInvitation) {

                partyInvitation.classList.add(
                    "show"
                );

            }

        }, 1300);

    }


    /* =====================================================
       PARTY BUTTON
    ====================================================== */

    if (birthdayPartyBtn) {

        birthdayPartyBtn.addEventListener(
            "click",
            function () {

                window.location.href =
                    "/party";

            }
        );

    }


    /* =====================================================
       POINTER EVENTS
    ====================================================== */

    slideButton.addEventListener(
        "pointerdown",
        startDrag
    );


    slideButton.addEventListener(
        "pointermove",
        drag
    );


    slideButton.addEventListener(
        "pointerup",
        endDrag
    );


    slideButton.addEventListener(
        "pointercancel",
        endDrag
    );


    slideButton.addEventListener(
        "lostpointercapture",
        endDrag
    );


    /* =====================================================
       PREVENT IMAGE DRAGGING
    ====================================================== */

    slideButton.addEventListener(
        "dragstart",
        function (event) {

            event.preventDefault();

        }
    );


    /* =====================================================
       INITIAL STATE
    ====================================================== */

    updateSlider(5);

});