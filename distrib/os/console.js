/* ------------
     Console.ts

     The OS Console - stdIn and stdOut by default.
     Note: This is not the Shell. The Shell is the "command line interface" (CLI) or interpreter for this console.
     ------------ */
var TSOS;
(function (TSOS) {
    class Console {
        currentFont;
        currentFontSize;
        currentXPosition;
        currentYPosition;
        buffer;
        tabArray;
        tabArrayindex;
        constructor(currentFont = _DefaultFontFamily, currentFontSize = _DefaultFontSize, currentXPosition = 0, currentYPosition = _DefaultFontSize, buffer = "", tabArray = [], tabArrayindex = 0) {
            this.currentFont = currentFont;
            this.currentFontSize = currentFontSize;
            this.currentXPosition = currentXPosition;
            this.currentYPosition = currentYPosition;
            this.buffer = buffer;
            this.tabArray = tabArray;
            this.tabArrayindex = tabArrayindex;
        }
        init() {
            this.clearScreen();
            this.resetXY();
        }
        clearScreen() {
            _DrawingContext.clearRect(0, 0, _Canvas.width, _Canvas.height);
        }
        resetXY() {
            this.currentXPosition = 0;
            this.currentYPosition = this.currentFontSize;
        }
        filterArrayByPrefix(arr, prefix) {
            return arr.filter(item => item.startsWith(prefix));
        }
        handleInput() {
            while (_KernelInputQueue.getSize() > 0) {
                // Get the next character from the kernel input queue.
                var chr = _KernelInputQueue.dequeue();
                // Check to see if it's "special" (enter or ctrl-c) or "normal" (anything else that the keyboard device driver gave us).
                if (chr === String.fromCharCode(13)) { // the Enter key
                    // The enter key marks the end of a console command, so ...
                    // ... tell the shell ...
                    _OsShell.handleInput(this.buffer);
                    // ... and reset our buffer.
                    this.buffer = "";
                }
                else if (chr == 8) {
                    let delChar = this.buffer.slice(-1);
                    this.backspace(delChar);
                    this.buffer = this.buffer.slice(0, -1);
                }
                else if (chr == 9) {
                    this.tabArray = this.filterArrayByPrefix(_OsShell.commandListStrings, this.buffer);
                    if (this.tabArray.length > 0) {
                        this.currentXPosition = 0;
                        this.tabArrayindex = 0;
                        _DrawingContext.clearRect(this.currentXPosition, this.currentYPosition - 15, 300, 20);
                        this.putText(this.tabArray[this.tabArrayindex]);
                        this.buffer = this.tabArray[this.tabArrayindex];
                    }
                }
                else if ((chr == 38) && _OsShell.commandsUsed != null) {
                    this.currentXPosition = 0;
                    this.tabArrayindex = 0;
                    _DrawingContext.clearRect(this.currentXPosition, this.currentYPosition - 15, 300, 20);
                    this.putText(_OsShell.commandsUsed[_OsShell.commandsUsedIndex]);
                    this.buffer = _OsShell.commandsUsed[_OsShell.commandsUsedIndex];
                }
                else if (chr == 40) {
                }
                else {
                    // This is a "normal" character, so ...
                    // ... draw it on the screen...
                    this.putText(chr);
                    // ... and add it to our buffer.
                    this.buffer += chr;
                }
                // TODO: Add a case for Ctrl-C that would allow the user to break the current program.
            }
        }
        backspace(text) {
            // console.log('TESTING LINE FOR BACKSPACE');
            var offset = _DrawingContext.measureText(this.currentFont, this.currentFontSize, text);
            this.currentXPosition = this.currentXPosition - offset;
            _DrawingContext.clearRect(this.currentXPosition, this.currentYPosition - 15, offset, 20);
        }
        putText(text) {
            /*  My first inclination here was to write two functions: putChar() and putString().
                Then I remembered that JavaScript is (sadly) untyped and it won't differentiate
                between the two. (Although TypeScript would. But we're compiling to JavaScipt anyway.)
                So rather than be like PHP and write two (or more) functions that
                do the same thing, thereby encouraging confusion and decreasing readability, I
                decided to write one function and use the term "text" to connote string or char.
            */
            if (text !== "") {
                // Draw the text at the current X and Y coordinates.
                _DrawingContext.drawText(this.currentFont, this.currentFontSize, this.currentXPosition, this.currentYPosition, text);
                // Move the current X position.
                var offset = _DrawingContext.measureText(this.currentFont, this.currentFontSize, text);
                this.currentXPosition = this.currentXPosition + offset;
            }
        }
        advanceLine() {
            this.currentXPosition = 0;
            /*
             * Font size measures from the baseline to the highest point in the font.
             * Font descent measures from the baseline to the lowest point in the font.
             * Font height margin is extra spacing between the lines.
             */
            this.currentYPosition += _DefaultFontSize +
                _DrawingContext.fontDescent(this.currentFont, this.currentFontSize) +
                _FontHeightMargin;
            // TODO: Handle scrolling. (iProject 1)
            var canvasHeight = _DefaultFontSize + _DrawingContext.fontDescent(this.currentFont, this.currentFontSize) + _FontHeightMargin;
            canvasHeight = -canvasHeight;
            if (this.currentYPosition >= _Canvas.height) {
                var canvasContent = _DrawingContext.getImageData(0, 0, _Canvas.width, _Canvas.height);
                this.clearScreen();
                _DrawingContext.putImageData(canvasContent, 0, canvasHeight);
                this.currentYPosition = _Canvas.height - this.currentFontSize;
            }
        }
    }
    TSOS.Console = Console;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=console.js.map