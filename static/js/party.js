document.addEventListener("DOMContentLoaded", function () {


    const leaveButton =
        document.getElementById("leaveButton");

    const qrCard =
        document.getElementById("qrCard");


    if (!leaveButton || !qrCard) {
        return;
    }


    /* =====================================================
       SETTINGS
    ====================================================== */

    const ESCAPE_DISTANCE = 90;

    const SCREEN_PADDING = 12;

    let moving = false;


    /* =====================================================
       GET QR CARD RECTANGLE
    ====================================================== */

    function getQrRect() {

        return qrCard.getBoundingClientRect();

    }


    /* =====================================================
       CHECK IF TWO RECTANGLES OVERLAP
    ====================================================== */

    function rectanglesOverlap(
        rect1,
        rect2,
        padding = 0
    ) {

        return !(
            rect1.right + padding < rect2.left ||
            rect1.left - padding > rect2.right ||
            rect1.bottom + padding < rect2.top ||
            rect1.top - padding > rect2.bottom
        );

    }


    /* =====================================================
       CREATE BUTTON RECTANGLE
    ====================================================== */

    function createButtonRect(
        left,
        top
    ) {

        const width =
            leaveButton.offsetWidth;

        const height =
            leaveButton.offsetHeight;


        return {

            left: left,

            top: top,

            right: left + width,

            bottom: top + height,

            width: width,

            height: height

        };

    }


    /* =====================================================
       CHECK POSITION
    ====================================================== */

    function isValidPosition(
        left,
        top
    ) {

        const buttonRect =
            createButtonRect(left, top);

        const qrRect =
            getQrRect();


        /*
           Keep button completely inside
           the viewport.
        */

        if (
            left < SCREEN_PADDING ||
            top < SCREEN_PADDING ||
            buttonRect.right >
                window.innerWidth - SCREEN_PADDING ||
            buttonRect.bottom >
                window.innerHeight - SCREEN_PADDING
        ) {

            return false;

        }


        /*
           NEVER allow button over QR CARD.
        */

        if (
            rectanglesOverlap(
                buttonRect,
                qrRect,
                18
            )
        ) {

            return false;

        }


        return true;

    }


    /* =====================================================
       FIND SAFE POSITION
    ====================================================== */

    function findSafePosition() {


        const buttonWidth =
            leaveButton.offsetWidth;

        const buttonHeight =
            leaveButton.offsetHeight;


        const maxLeft =
            window.innerWidth -
            buttonWidth -
            SCREEN_PADDING;


        const maxTop =
            window.innerHeight -
            buttonHeight -
            SCREEN_PADDING;


        /*
           Try many random positions.
        */

        for (
            let attempt = 0;
            attempt < 100;
            attempt++
        ) {


            const left =
                Math.random() *
                (
                    maxLeft -
                    SCREEN_PADDING
                ) +
                SCREEN_PADDING;


            const top =
                Math.random() *
                (
                    maxTop -
                    SCREEN_PADDING
                ) +
                SCREEN_PADDING;


            if (
                isValidPosition(
                    left,
                    top
                )
            ) {

                return {
                    left,
                    top
                };

            }

        }


        /*
           Fallback positions.
           These are also checked against
           the QR card.
        */

        const fallbackPositions = [

            {
                left: SCREEN_PADDING,
                top: SCREEN_PADDING
            },

            {
                left:
                    maxLeft,

                top:
                    SCREEN_PADDING
            },

            {
                left:
                    SCREEN_PADDING,

                top:
                    maxTop
            },

            {
                left:
                    maxLeft,

                top:
                    maxTop
            }

        ];


        for (
            const position
            of fallbackPositions
        ) {

            if (
                isValidPosition(
                    position.left,
                    position.top
                )
            ) {

                return position;

            }

        }


        return null;

    }


    /* =====================================================
       MOVE BUTTON
    ====================================================== */

    function escapeButton() {


        if (moving) {
            return;
        }


        moving = true;


        const position =
            findSafePosition();


        if (!position) {

            moving = false;

            return;

        }


        /*
           Remove transform because
           fixed coordinates are now used.
        */

        leaveButton.style.transform =
            "none";


        leaveButton.style.left =
            position.left + "px";


        leaveButton.style.top =
            position.top + "px";


        leaveButton.style.bottom =
            "auto";


        /*
           Small playful rotation.
        */

        const rotation =
            Math.random() * 12 - 6;


        leaveButton.style.rotate =
            rotation + "deg";


        setTimeout(function () {

            moving = false;

        }, 250);

    }


    /* =====================================================
       MOUSE PROXIMITY
    ====================================================== */

    document.addEventListener(
        "mousemove",
        function (event) {


            const rect =
                leaveButton.getBoundingClientRect();


            const buttonCenterX =
                rect.left +
                rect.width / 2;


            const buttonCenterY =
                rect.top +
                rect.height / 2;


            const distanceX =
                event.clientX -
                buttonCenterX;


            const distanceY =
                event.clientY -
                buttonCenterY;


            const distance =
                Math.sqrt(
                    distanceX * distanceX +
                    distanceY * distanceY
                );


            if (
                distance <
                ESCAPE_DISTANCE
            ) {

                escapeButton();

            }

        }
    );


    /* =====================================================
       POINTER ENTER
    ====================================================== */

    leaveButton.addEventListener(
        "pointerenter",
        function () {

            escapeButton();

        }
    );


    /* =====================================================
       CLICK / TOUCH
    ====================================================== */

    leaveButton.addEventListener(
        "pointerdown",
        function (event) {

            /*
               Prevent the button from
               actually doing anything.
            */

            event.preventDefault();

            escapeButton();

        }
    );


    leaveButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            escapeButton();

        }
    );


    /* =====================================================
       KEYBOARD
    ====================================================== */

    leaveButton.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                escapeButton();

            }

        }
    );


    /* =====================================================
       WINDOW RESIZE
    ====================================================== */

    window.addEventListener(
        "resize",
        function () {


            const rect =
                leaveButton.getBoundingClientRect();


            if (
                !isValidPosition(
                    rect.left,
                    rect.top
                )
            ) {

                /*
                   Reset to bottom center.
                */

                leaveButton.style.left =
                    "50%";

                leaveButton.style.top =
                    "auto";

                leaveButton.style.bottom =
                    "22px";

                leaveButton.style.transform =
                    "translateX(-50%)";

                leaveButton.style.rotate =
                    "0deg";

            }

        }
    );


});