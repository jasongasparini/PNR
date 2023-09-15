/* ----------------------------------
   DeviceDriverKeyboard.ts

   The Kernel Keyboard Device Driver.
   ---------------------------------- */
var TSOS;
(function (TSOS) {
    // Extends DeviceDriver
    class DeviceDriverKeyboard extends TSOS.DeviceDriver {
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
        krnKbdDriverEntry() {
            // Initialization routine for this, the kernel-mode Keyboard Device Driver.
            this.status = "loaded";
            // More?
        }
        krnKbdDispatchKeyPress(params) {
            // Parse the params.  TODO: Check that the params are valid and osTrapError if not.
            var keyCode = params[0];
            var isShifted = params[1];
            _Kernel.krnTrace("Key code:" + keyCode + " shifted:" + isShifted);
            var chr = "";
            // Backspace handling
            if (keyCode == 8) {
                // chr = String.fromCharCode(keyCode);
                _KernelInputQueue.enqueue(keyCode); // Queues the keyCode "8" to then be recognized and handled in console.ts handleInput
            }
            if (keyCode == 9) { // Tab key
                _KernelInputQueue.enqueue(keyCode);
            }
            if (keyCode == 38) { // Up arrow
                _KernelInputQueue.enqueue(keyCode);
            }
            else if (keyCode == 40) { // down arrow
                _KernelInputQueue.enqueue(keyCode);
            }
            // Check to see if we even want to deal with the key that was pressed.
            if ((keyCode >= 65) && (keyCode <= 90)) { // letter
                if (isShifted === true) {
                    chr = String.fromCharCode(keyCode); // Uppercase A-Z
                }
                else {
                    chr = String.fromCharCode(keyCode + 32); // Lowercase a-z
                }
                // TODO: Check for caps-lock and handle as shifted if so.
                _KernelInputQueue.enqueue(chr);
            }
            else if (((keyCode >= 48) && (keyCode <= 57)) || // digits and their special chars
                (keyCode == 32) || // space
                (keyCode == 13)) { // enter
                if (isShifted === true) {
                    if (keyCode == 50) {
                        chr = String.fromCharCode(64);
                    }
                    else if (keyCode == 54) {
                        chr = String.fromCharCode(94);
                    }
                    else if (keyCode == 55) {
                        chr = String.fromCharCode(38);
                    }
                    else if (keyCode == 56) {
                        chr = String.fromCharCode(42);
                    }
                    else if (keyCode == 57) {
                        chr = String.fromCharCode(40);
                    }
                    else if (keyCode == 48) {
                        chr = String.fromCharCode(41);
                    }
                    else {
                        chr = String.fromCharCode(keyCode - 16);
                    }
                }
                else {
                    chr = String.fromCharCode(keyCode);
                }
                _KernelInputQueue.enqueue(chr);
            }
            else if (keyCode == 192) { // ~`
                if (isShifted === true) {
                    chr = String.fromCharCode(126);
                }
                else {
                    chr = String.fromCharCode(96);
                }
                _KernelInputQueue.enqueue(chr);
            }
            else if (keyCode == 189) { // _-
                if (isShifted === true) {
                    chr = String.fromCharCode(95);
                }
                else {
                    chr = String.fromCharCode(45);
                }
                _KernelInputQueue.enqueue(chr);
            }
            else if (keyCode == 187) { // +=
                if (isShifted === true) {
                    chr = String.fromCharCode(43);
                }
                else {
                    chr = String.fromCharCode(61);
                }
                _KernelInputQueue.enqueue(chr);
            }
            else if (keyCode == 219) { // {[
                if (isShifted === true) {
                    chr = String.fromCharCode(123);
                }
                else {
                    chr = String.fromCharCode(91);
                }
                _KernelInputQueue.enqueue(chr);
            }
            else if (keyCode == 221) { // }]
                if (isShifted === true) {
                    chr = String.fromCharCode(125);
                }
                else {
                    chr = String.fromCharCode(93);
                }
                _KernelInputQueue.enqueue(chr);
            }
            else if (keyCode == 220) { // |\
                if (isShifted === true) {
                    chr = String.fromCharCode(124);
                }
                else {
                    chr = String.fromCharCode(92);
                }
                _KernelInputQueue.enqueue(chr);
            }
            else if (keyCode == 186) { // :;
                if (isShifted === true) {
                    chr = String.fromCharCode(58);
                }
                else {
                    chr = String.fromCharCode(59);
                }
                _KernelInputQueue.enqueue(chr);
            }
            else if (keyCode == 222) { // "'
                if (isShifted === true) {
                    chr = String.fromCharCode(34);
                }
                else {
                    chr = String.fromCharCode(39);
                }
                _KernelInputQueue.enqueue(chr);
            }
            else if (keyCode == 188) { // <,
                if (isShifted === true) {
                    chr = String.fromCharCode(60);
                }
                else {
                    chr = String.fromCharCode(44);
                }
                _KernelInputQueue.enqueue(chr);
            }
            else if (keyCode == 190) { // >.
                if (isShifted === true) {
                    chr = String.fromCharCode(62);
                }
                else {
                    chr = String.fromCharCode(46);
                }
                _KernelInputQueue.enqueue(chr);
            }
            else if (keyCode == 191) { // ?/
                if (isShifted === true) {
                    chr = String.fromCharCode(63);
                }
                else {
                    chr = String.fromCharCode(47);
                }
                _KernelInputQueue.enqueue(chr);
            }
        }
    }
    TSOS.DeviceDriverKeyboard = DeviceDriverKeyboard;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=deviceDriverKeyboard.js.map