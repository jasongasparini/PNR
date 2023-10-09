/* ------------
   Shell.ts

   The OS Shell - The "command line interface" (CLI) for the console.

    Note: While fun and learning are the primary goals of all enrichment center activities,
          serious injuries may occur when trying to write your own Operating System.
   ------------ */
// TODO: Write a base class / prototype for system services and let Shell inherit from it.
var TSOS;
(function (TSOS) {
    class Shell {
        // Properties
        promptStr = ">";
        commandList = [];
        commandListStrings = [];
        curses = "[fuvg],[cvff],[shpx],[phag],[pbpxfhpxre],[zbgureshpxre],[gvgf]";
        apologies = "[sorry]";
        commandsUsed = [];
        commandsUsedIndex = 0;
        constructor() {
        }
        init() {
            var sc;
            //
            // Load the command list.
            // ver
            sc = new TSOS.ShellCommand(this.shellVer, "ver", "- Displays the current version.");
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);
            // help
            sc = new TSOS.ShellCommand(this.shellHelp, "help", "- This is the help command. Seek help.");
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);
            // shutdown
            sc = new TSOS.ShellCommand(this.shellShutdown, "shutdown", "- Shuts down the virtual OS but leaves the underlying host / hardware simulation running.");
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);
            // cls
            sc = new TSOS.ShellCommand(this.shellCls, "cls", "- Clears the screen and resets the cursor position.");
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);
            // man <topic>
            sc = new TSOS.ShellCommand(this.shellMan, "man", "<topic> - Displays the MANual page for <topic>.");
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);
            // trace <on | off>
            sc = new TSOS.ShellCommand(this.shellTrace, "trace", "<on | off> - Turns the OS trace on or off.");
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);
            // rot13 <string>
            sc = new TSOS.ShellCommand(this.shellRot13, "rot13", "<string> - Does rot13 obfuscation on <string>.");
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);
            // prompt <string>
            sc = new TSOS.ShellCommand(this.shellPrompt, "prompt", "<string> - Sets the prompt.");
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);
            // date
            sc = new TSOS.ShellCommand(this.shellDate, "date", "- Displays the current date and time.");
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);
            // whereami
            sc = new TSOS.ShellCommand(this.shellWhereami, "whereami", "- Tells the user to answer this question themselves.");
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);
            // cake
            sc = new TSOS.ShellCommand(this.shellCake, "cake", "- The displayed statement is true.");
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);
            // status
            sc = new TSOS.ShellCommand(this.shellStatus, "status", "- Displays the given status.");
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);
            // BSOD command
            sc = new TSOS.ShellCommand(this.shellBSOD, "bsod", "- Blue screens the console for testing.");
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);
            // load program
            sc = new TSOS.ShellCommand(this.shellLoad, "load", "- Loads user program input.");
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);
            // run specified program
            sc = new TSOS.ShellCommand(this.shellRun, "run", "- Runs the specified process.");
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);
            // ps  - list the running processes and their IDs
            // kill <id> - kills the specified process id.
            sc = new TSOS.ShellCommand(this.shellKill, "kill", "- Stops the CPU");
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);
            // Display the initial prompt.
            this.putPrompt();
        }
        putPrompt() {
            _StdOut.putText(this.promptStr);
        }
        handleInput(buffer) {
            _Kernel.krnTrace("Shell Command~" + buffer);
            //
            // Parse the input...
            //
            var userCommand = this.parseInput(buffer);
            // ... and assign the command and args to local variables.
            var cmd = userCommand.command;
            var args = userCommand.args;
            //
            // Determine the command and execute it.
            //
            // TypeScript/JavaScript may not support associative arrays in all browsers so we have to iterate over the
            // command list in attempt to find a match. 
            // TODO: Is there a better way? Probably. Someone work it out and tell me in class.
            var index = 0;
            var found = false;
            var fn = undefined;
            while (!found && index < this.commandList.length) {
                if (this.commandList[index].command === cmd) {
                    found = true;
                    fn = this.commandList[index].func;
                }
                else {
                    ++index;
                }
            }
            if (found) {
                this.execute(fn, args); // Note that args is always supplied, though it might be empty.
                this.commandsUsed.push(cmd);
                this.commandsUsedIndex = this.commandsUsed.length - 1;
            }
            else {
                // It's not found, so check for curses and apologies before declaring the command invalid.
                if (this.curses.indexOf("[" + TSOS.Utils.rot13(cmd) + "]") >= 0) { // Check for curses.
                    this.execute(this.shellCurse);
                }
                else if (this.apologies.indexOf("[" + cmd + "]") >= 0) { // Check for apologies.
                    this.execute(this.shellApology);
                }
                else { // It's just a bad command. {
                    this.execute(this.shellInvalidCommand);
                }
            }
        }
        // Note: args is an optional parameter, ergo the ? which allows TypeScript to understand that.
        execute(fn, args) {
            // We just got a command, so advance the line...
            _StdOut.advanceLine();
            // ... call the command function passing in the args with some über-cool functional programming ...
            fn(args);
            // Check to see if we need to advance the line again
            if (_StdOut.currentXPosition > 0) {
                _StdOut.advanceLine();
            }
            // ... and finally write the prompt again.
            this.putPrompt();
            _Console.tabArray = []; // Clears the tab completion array
        }
        parseInput(buffer) {
            var retVal = new TSOS.UserCommand();
            // 1. Remove leading and trailing spaces.
            buffer = TSOS.Utils.trim(buffer);
            // 2. Lower-case it.
            buffer = buffer.toLowerCase();
            // 3. Separate on spaces so we can determine the command and command-line args, if any.
            var tempList = buffer.split(" ");
            // 4. Take the first (zeroth) element and use that as the command.
            var cmd = tempList.shift(); // Yes, you can do that to an array in JavaScript. See the Queue class.
            // 4.1 Remove any left-over spaces.
            cmd = TSOS.Utils.trim(cmd);
            // 4.2 Record it in the return value.
            retVal.command = cmd;
            // 5. Now create the args array from what's left.
            for (var i in tempList) {
                var arg = TSOS.Utils.trim(tempList[i]);
                if (arg != "") {
                    retVal.args[retVal.args.length] = tempList[i];
                }
            }
            return retVal;
        }
        //
        // Shell Command Functions. Kinda not part of Shell() class exactly, but
        // called from here, so kept here to avoid violating the law of least astonishment.
        //
        shellInvalidCommand() {
            _StdOut.putText("Invalid Command. ");
            if (_SarcasticMode) {
                _StdOut.putText("Unbelievable. You, [subject name here],");
                _StdOut.advanceLine();
                _StdOut.putText("must be the pride of [subject hometown here].");
            }
            else {
                _StdOut.putText("Type 'help' for, well... help.");
            }
        }
        shellCurse() {
            _StdOut.putText("Oh, so that's how it's going to be, eh? Fine.");
            _StdOut.advanceLine();
            _StdOut.putText("Bitch.");
            _SarcasticMode = true;
        }
        shellApology() {
            if (_SarcasticMode) {
                _StdOut.putText("I think we can put our differences behind us.");
                _StdOut.advanceLine();
                _StdOut.putText("For science . . . You monster.");
                _SarcasticMode = false;
            }
            else {
                _StdOut.putText("For what?");
            }
        }
        // Although args is unused in some of these functions, it is always provided in the 
        // actual parameter list when this function is called, so I feel like we need it.
        shellVer(args) {
            _StdOut.putText(APP_NAME + " version " + APP_VERSION);
        }
        shellHelp(args) {
            _StdOut.putText("Commands:");
            for (var i in _OsShell.commandList) {
                _StdOut.advanceLine();
                _StdOut.putText("  " + _OsShell.commandList[i].command + " " + _OsShell.commandList[i].description);
            }
        }
        shellShutdown(args) {
            _StdOut.putText("Shutting down...");
            // Call Kernel shutdown routine.
            _Kernel.krnShutdown();
            // TODO: Stop the final prompt from being displayed. If possible. Not a high priority. (Damn OCD!)
        }
        shellCls(args) {
            _StdOut.clearScreen();
            _StdOut.resetXY();
        }
        shellMan(args) {
            if (args.length > 0) {
                var topic = args[0];
                switch (topic) {
                    case "help":
                        _StdOut.putText("Help displays a list of (hopefully) valid commands.");
                        break;
                    // TODO: Make descriptive MANual page entries for the the rest of the shell commands here.
                    default:
                        _StdOut.putText("No manual entry for " + args[0] + ".");
                }
            }
            else {
                _StdOut.putText("Usage: man <topic>  Please supply a topic.");
            }
        }
        shellTrace(args) {
            if (args.length > 0) {
                var setting = args[0];
                switch (setting) {
                    case "on":
                        if (_Trace && _SarcasticMode) {
                            _StdOut.putText("Trace is already on, doofus.");
                        }
                        else {
                            _Trace = true;
                            _StdOut.putText("Trace ON");
                        }
                        break;
                    case "off":
                        _Trace = false;
                        _StdOut.putText("Trace OFF");
                        break;
                    default:
                        _StdOut.putText("Invalid arguement.  Usage: trace <on | off>.");
                }
            }
            else {
                _StdOut.putText("Usage: trace <on | off>");
            }
        }
        shellRot13(args) {
            if (args.length > 0) {
                // Requires Utils.ts for rot13() function.
                _StdOut.putText(args.join(' ') + " = '" + TSOS.Utils.rot13(args.join(' ')) + "'");
            }
            else {
                _StdOut.putText("Usage: rot13 <string>  Please supply a string.");
            }
        }
        shellPrompt(args) {
            if (args.length > 0) {
                _OsShell.promptStr = args[0];
            }
            else {
                _StdOut.putText("Usage: prompt <string>  Please supply a string.");
            }
        }
        shellDate(args) {
            let dateTime = new Date();
            dateTime.toLocaleString("en-US");
            _StdOut.putText("Current date: " + dateTime);
        }
        shellWhereami(args) {
            _StdOut.putText("Take a look around... (Why do I have to tell you this?)");
        }
        shellCake(args) {
            _StdOut.putText(" == lie.");
        }
        shellStatus(args) {
            if (args.length > 0) {
                var status = args.join(" ");
                _StdOut.putText("Current status: " + status);
                const statusElement = document.getElementById("status");
                statusElement.innerHTML = status;
            }
            else {
                _StdOut.putText("Usage: status <string>, Provide a valid string to display as the status.");
            }
        }
        shellBSOD(args) {
            _DrawingContext.clearRect(0, 0, 500, 500);
            _DrawingContext.fillStyle = "blue";
            _DrawingContext.fillRect(0, 0, 500, 500);
            _Console.putText("You broke GLaDOS........");
        }
        shellLoad(args) {
            // Stubbing this out for now until funcitonality is needed in proceeding Labs
            var textarea = document.getElementById("taProgramInput").value;
            var validation = textarea.match(/^[ A-F0-9]+$/);
            if (validation == null) {
                _StdOut.putText("Invalid program specified.");
            }
            // Split the input into individual opcodes (assuming they are separated by spaces)
            const opcodes = textarea.split(" ");
            // _Kernel.krnTrace('loading'); //TEST
            // Load the opcodes into memory
            _Memory.init();
            _CPU.init();
            for (let i = 0; i < opcodes.length; i++) {
                const opcode = opcodes[i];
                if (opcode.length === 2) {
                    // Assuming each opcode is a 2-digit hexadecimal string
                    const value = parseInt(opcode, 16);
                    // Check if value is a valid number
                    if (!isNaN(value) && value >= 0 && value <= 255) {
                        // Write the value to memory at the next available address
                        _Memory.writeByte(i, value);
                    }
                    else {
                        _StdOut.putText("Invalid opcode at position " + i);
                        return;
                    }
                }
                else {
                    _StdOut.putText("Invalid opcode length at position " + i);
                    return;
                }
            }
            _Memory.updateMemoryTable();
            var pcb = new TSOS.ProcessControlBlock(0);
            _PcbList.push(pcb);
        }
        shellRun(args) {
            if (args.length > 0) {
                // let id = parseInt(args[0], 10);
                _CPU.isExecuting = true;
                _PcbList[0].status = "Running";
            }
            else {
                _StdOut.putText("Invalid process ID");
            }
        }
        shellKill(args) {
            _CPU.isExecuting = false;
        }
    }
    TSOS.Shell = Shell;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=shell.js.map