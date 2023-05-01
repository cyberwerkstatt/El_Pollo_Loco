class Keyboard {
    left = false;
    right = false;
    space = false;
    a = false;


    constructor() {
        this.eventKeyboardBtns();
        this.eventTouchpadBtns();
    }


    /**
    * check whether the button is pressed
    */
    eventKeyboardBtns() {
        window.addEventListener('keydown', (event) => {
            if (event.keyCode == 37) {
                this.left = true;
            }

            if (event.keyCode == 39) {
                this.right = true;
            }

            if (event.keyCode == 40) {
                this.down = true;
            }

            if (event.keyCode == 32) {
                this.space = true;
            }

            if (event.keyCode == 65) {
                this.a = true;
            }
        });


        /**
        * check whether the button has been released
        */
        window.addEventListener('keyup', (event) => {
            if (event.keyCode == 37) {
                this.left = false;
            }

            if (event.keyCode == 39) {
                this.right = false;
            }

            if (event.keyCode == 40) {
                this.down = false;
            }

            if (event.keyCode == 32) {
                this.space = false;
            }

            if (event.keyCode == 65) {
                this.a = false;
            }
        });
    }


    /**
    * Functions for the touch buttons in the mobile view
    */
    eventTouchpadBtns() {
        setTimeout(() => {
            document.getElementById('btnMobileLeft').addEventListener('touchstart', (event) => {
                event.preventDefault();
                this.left = true;
            });


            document.getElementById('btnMobileLeft').addEventListener('touchend', (event) => {
                event.preventDefault();
                this.left = false;

            });


            document.getElementById('btnMobileRight').addEventListener('touchstart', (event) => {
                event.preventDefault();
                this.right = true;
            });


            document.getElementById('btnMobileRight').addEventListener('touchend', (event) => {
                event.preventDefault();
                this.right = false;
            });


            document.getElementById('btnMobileUp').addEventListener('touchstart', (event) => {
                event.preventDefault();
                this.space = true;
            });


            document.getElementById('btnMobileUp').addEventListener('touchend', (event) => {
                event.preventDefault();
                this.space = false;
            });


            document.getElementById('btnMobileThrow').addEventListener('touchstart', (event) => {
                event.preventDefault();
                this.a = true;
            });


            document.getElementById('btnMobileThrow').addEventListener('touchend', (event) => {
                event.preventDefault();
                this.a = false;
            });
        }, 500);
    }
}
