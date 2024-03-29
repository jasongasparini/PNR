/* ------------
     Console.ts

     The OS Console - stdIn and stdOut by default.
     Note: This is not the Shell. The Shell is the "command line interface" (CLI) or interpreter for this console.
     ------------ */

module TSOS {

    export class Console {

        constructor(public currentFont = _DefaultFontFamily,
                    public currentFontSize = _DefaultFontSize,
                    public currentXPosition = 0,
                    public currentYPosition = _DefaultFontSize,
                    public buffer = "",
                    public tabArray: string[] = [], 
                    public tabArrayindex = 0) {
        }

        public init(): void {
            this.clearScreen();
            this.resetXY();
        }

        public clearScreen(): void {
            _DrawingContext.clearRect(0, 0, _Canvas.width, _Canvas.height);
        }

        public resetXY(): void {
            this.currentXPosition = 0;
            this.currentYPosition = this.currentFontSize;
        }

        public filterArrayByPrefix(arr: string[], prefix: string): string[] {
            return arr.filter(item => item.startsWith(prefix));
          }

        public handleInput(): void {
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
                } else if (chr == 8){
                    
                    let delChar = this.buffer.slice(-1);
                    this.backspace(delChar);
                    this.buffer = this.buffer.slice(0, -1);
                } else if(chr == 9){
                    this.tabArray = this.filterArrayByPrefix(_OsShell.commandListStrings, this.buffer);
                    if (this.tabArray.length > 0){
                        this.currentXPosition = 0;

                        this.tabArrayindex = 0;

                        _DrawingContext.clearRect(this.currentXPosition, this.currentYPosition-15, 300, 20);
                        _OsShell.putPrompt();
                        this.putText(this.tabArray[this.tabArrayindex]);
                        this.buffer = this.tabArray[this.tabArrayindex];
                        
                    }

                    /*
                        Switching from a up arrow press to down arrow press will take two presses for the recall to work as intended, 
                        this will have to be fixed at a later point
                    */
                } else if ((chr == 38) && _OsShell.commandsUsed.length != 0){ 
                    this.currentXPosition = 0;
                    _DrawingContext.clearRect(this.currentXPosition, this.currentYPosition-15, 300, 20);
                    _OsShell.putPrompt();
                    this.putText(_OsShell.commandsUsed[_OsShell.commandsUsedIndex]);
                    this.buffer = _OsShell.commandsUsed[_OsShell.commandsUsedIndex];
                    if(_OsShell.commandsUsedIndex != 0){
                        _OsShell.commandsUsedIndex -= 1;
                    }

                } else if (chr == 40) { 
                    if(_OsShell.commandsUsedIndex != (_OsShell.commandsUsed.length - 1)){ 
                        _OsShell.commandsUsedIndex += 1; // Steps the array prior to putting text
                    }
                    this.currentXPosition = 0;
                    _DrawingContext.clearRect(this.currentXPosition, this.currentYPosition-15, 300, 20);
                    _OsShell.putPrompt();
                    this.putText(_OsShell.commandsUsed[_OsShell.commandsUsedIndex]);
                    this.buffer = _OsShell.commandsUsed[_OsShell.commandsUsedIndex];
                    
                
                
                } else{
                    // This is a "normal" character, so ...
                    // ... draw it on the screen...
                    this.putText(chr);
                    // ... and add it to our buffer.
                    this.buffer += chr;
                }
                // TODO: Add a case for Ctrl-C that would allow the user to break the current program.
            }
        }

        public backspace(text){
            // console.log('TESTING LINE FOR BACKSPACE');
            var offset = _DrawingContext.measureText(this.currentFont, this.currentFontSize, text);
            this.currentXPosition = this.currentXPosition - offset;
            _DrawingContext.clearRect(this.currentXPosition, this.currentYPosition-15, offset, 20);
        }

        public putText(text): void {
            /*  My first inclination here was to write two functions: putChar() and putString().
                Then I remembered that JavaScript is (sadly) untyped and it won't differentiate
                between the two. (Although TypeScript would. But we're compiling to JavaScipt anyway.)
                So rather than be like PHP and write two (or more) functions that
                do the same thing, thereby encouraging confusion and decreasing readability, I
                decided to write one function and use the term "text" to connote string or char.
            */
            if (text !== "") {
                for(let i = 0; i < text.length; i++) {

                    let offset = _DrawingContext.measureText(this.currentFont, this.currentFontSize, text[i]);
                    
                    if(this.currentXPosition + offset >= _Canvas.width) {
                        this.advanceLine();
                    }

                    // Draw the text at the current X and Y coordinates.
                    _DrawingContext.drawText(this.currentFont, this.currentFontSize, this.currentXPosition, this.currentYPosition, text[i]);
                    
                    // Move the current X position. 
                    this.currentXPosition = this.currentXPosition + offset;
                }
            }
         }

        public advanceLine(): void {
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
            canvasHeight =- canvasHeight;

            if (this.currentYPosition >= _Canvas.height) { 
                var canvasContent = _DrawingContext.getImageData(0, 0, _Canvas.width, _Canvas.height);
                
                this.clearScreen();

                _DrawingContext.putImageData(canvasContent, 0, canvasHeight);
                this.currentYPosition = _Canvas.height - this.currentFontSize;
            }
        }
    }
 }
