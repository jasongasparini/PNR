/* ----------------------------------
   DeviceDriverKeyboard.ts

   The Kernel Keyboard Device Driver.
   ---------------------------------- */

module TSOS {

    // Extends DeviceDriver
    export class DeviceDriverKeyboard extends DeviceDriver {

        constructor() {
            // Override the base method pointers.

            // The code below cannot run because "this" can only be
            // accessed after calling super.
            // super(this.krnKbdDriverEntry, this.krnKbdDispatchKeyPress);
            // So instead...
            super();
            this.driverEntry = this.krnKbdDriverEntry;
            this.isr = this.krnKbdDispatchKeyPress;
        }

        public krnKbdDriverEntry() {
            // Initialization routine for this, the kernel-mode Keyboard Device Driver.
            this.status = "loaded";
            // More?
        }

        public krnKbdDispatchKeyPress(params) {
            // Parse the params.  TODO: Check that the params are valid and osTrapError if not.
            var keyCode = params[0];
            var isShifted = params[1];
            _Kernel.krnTrace("Key code:" + keyCode + " shifted:" + isShifted);
            var chr = "";
            // Check to see if we even want to deal with the key that was pressed.
            if ((keyCode >= 65) && (keyCode <= 90)) { // letter
                if (isShifted === true) { 
                    chr = String.fromCharCode(keyCode); // Uppercase A-Z
                } else {
                    chr = String.fromCharCode(keyCode + 32); // Lowercase a-z
                }
                // TODO: Check for caps-lock and handle as shifted if so.
                _KernelInputQueue.enqueue(chr);
            } else if (((keyCode >= 48) && (keyCode <= 57)) ||   // digits and their special chars
                        (keyCode == 32)                     ||   // space
                        (keyCode == 13)) {                       // enter
                if (isShifted === true){
                    if(keyCode == 50){
                        chr = String.fromCharCode(64);
                    } else if (keyCode == 54){
                        chr = String.fromCharCode(94);
                    } else if (keyCode == 55){
                        chr = String.fromCharCode(38);
                    } else if (keyCode == 56){
                        chr = String.fromCharCode(42);
                    } else if (keyCode == 57){
                        chr = String.fromCharCode(40);
                    } else if (keyCode == 48){
                        chr = String.fromCharCode(41);
                    } else{
                        chr = String.fromCharCode(keyCode - 16);
                    }

                } else{
                    chr = String.fromCharCode(keyCode);
                }
                
                _KernelInputQueue.enqueue(chr);
             } else if (keyCode == 192){
                if (isShifted === true){
                    chr = String.fromCharCode(126);
                } else{
                    chr = String.fromCharCode(96);
                }
                _KernelInputQueue.enqueue(chr);
             } else if (keyCode == 189){
                if (isShifted === true){
                    chr = String.fromCharCode(95);
                } else{
                    chr = String.fromCharCode(45);
                }
                _KernelInputQueue.enqueue(chr);
             } else if (keyCode == 187){
                if (isShifted === true){
                    chr = String.fromCharCode(43);
                } else{
                    chr = String.fromCharCode(61);
                }
                _KernelInputQueue.enqueue(chr);
             }
        }
    }
}
