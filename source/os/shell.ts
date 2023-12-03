/* ------------
   Shell.ts

   The OS Shell - The "command line interface" (CLI) for the console.

    Note: While fun and learning are the primary goals of all enrichment center activities,
          serious injuries may occur when trying to write your own Operating System.
   ------------ */

// TODO: Write a base class / prototype for system services and let Shell inherit from it.

module TSOS {
    export class Shell {
        // Properties
        public promptStr = ">";
        public commandList = [];
        public commandListStrings: string[] = [];
        public curses = "[fuvg],[cvff],[shpx],[phag],[pbpxfhpxre],[zbgureshpxre],[gvgf]";
        public apologies = "[sorry]";
        public commandsUsed: string[] = [];
        public commandsUsedIndex = 0;

        constructor() {
        }

        public init() {
            var sc: ShellCommand;
            //
            // Load the command list.

            // ver
            sc = new ShellCommand(this.shellVer,
                                  "ver",
                                  "- Displays the current version.");
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);

            // help
            sc = new ShellCommand(this.shellHelp,
                                  "help",
                                  "- This is the help command. Seek help.");
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);

            // shutdown
            sc = new ShellCommand(this.shellShutdown,
                                  "shutdown",
                                  "- Shuts down the virtual OS but leaves the underlying host / hardware simulation running.");
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);

            // cls
            sc = new ShellCommand(this.shellCls,
                                  "cls",
                                  "- Clears the screen and resets the cursor position.");
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);

            // man <topic>
            sc = new ShellCommand(this.shellMan,
                                  "man",
                                  "<topic> - Displays the MANual page for <topic>.");
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);

            // trace <on | off>
            sc = new ShellCommand(this.shellTrace,
                                  "trace",
                                  "<on | off> - Turns the OS trace on or off.");
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);

            // rot13 <string>
            sc = new ShellCommand(this.shellRot13,
                                  "rot13",
                                  "<string> - Does rot13 obfuscation on <string>.");
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);

            // prompt <string>
            sc = new ShellCommand(this.shellPrompt,
                                  "prompt",
                                  "<string> - Sets the prompt.");
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);

            // date
            sc = new ShellCommand(this.shellDate,
                                    "date",
                                    "- Displays the current date and time.")
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);

            // whereami
            sc = new ShellCommand(this.shellWhereami,
                                    "whereami",
                                    "- Tells the user to answer this question themselves.")
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);

            // cake
            sc = new ShellCommand(this.shellCake,
                                    "cake",
                                    "- The displayed statement is true.")
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);

            // status
            sc = new ShellCommand(this.shellStatus,
                                    "status",
                                    "- Displays the given status.")
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);

            // BSOD command
            sc = new ShellCommand(this.shellBSOD,
                                    "bsod",
                                    "- Blue screens the console for testing.")
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);

            // load program
            sc = new ShellCommand(this.shellLoad,
                                    "load",
                                    "- Loads user program input.")
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);

            // run specified program
            sc = new ShellCommand(this.shellRun,
                                    "run",
                                    "- Runs the specified process.")
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);

            // ps  - list the running processes and their IDs
            // kill <id> - kills the specified process id.
            sc = new ShellCommand(this.shellKill,
                                    "kill",
                                    "- Kills the specified process")
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);

            // killall
            sc = new ShellCommand(this.shellKillAll,
                "killall",
                "- Kills all processes")
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);

            // clearmem
            sc = new ShellCommand(this.shellClearmem,
                "clearmem",
                "- Clears all memory segments")
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);
            
            // runall
            sc = new ShellCommand(this.shellRunall,
                "runall",
                "- Runs all programs in memory")
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);

            // quantum
            sc = new ShellCommand(this.shellQuantum,
                "quantum",
                "- Defines the CPU quantum")
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);

             // ps
            sc = new ShellCommand(this.shellPS,
                "ps",
                "- Lists processes and states")
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);

            // format
            sc = new ShellCommand(this.shellFormat,
                "format",
                "- Formats the disk")
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);

            // create
            sc = new ShellCommand(this.shellCreate,
                "create",
                "- Creates a new file")
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);

            // read
            sc = new ShellCommand(this.shellRead,
                "read",
                "- Reads the contents of a file")
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);

            // write
            sc = new ShellCommand(this.shellWrite,
                "write",
                "- Writes to the specified file")
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);

            // delete
            sc = new ShellCommand(this.shellDelete,
                "delete",
                "- Deletes the file")
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);

            // copy
            sc = new ShellCommand(this.shellCopy,
                "copy",
                "- Copies the contents of a file to a new file")
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);

            // rename
            sc = new ShellCommand(this.shellRename,
                "rename",
                "- Renames a file")
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);

            // ls
            sc = new ShellCommand(this.shellLs,
                "ls",
                "- Lists all files")
            this.commandList[this.commandList.length] = sc;
            this.commandListStrings.push(sc.command);

            // Display the initial prompt.
            this.putPrompt();
        }

        public putPrompt() {
            _StdOut.putText(this.promptStr);
        }

        public handleInput(buffer) {
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
            var index: number = 0;
            var found: boolean = false;
            var fn = undefined;
            while (!found && index < this.commandList.length) {
                if (this.commandList[index].command === cmd) {
                    found = true;
                    fn = this.commandList[index].func;
                } else {
                    ++index;
                }
            }
            if (found) {
                this.execute(fn, args);  // Note that args is always supplied, though it might be empty.
                this.commandsUsed.push(cmd);
                this.commandsUsedIndex = this.commandsUsed.length - 1;
            } else {
                // It's not found, so check for curses and apologies before declaring the command invalid.
                if (this.curses.indexOf("[" + Utils.rot13(cmd) + "]") >= 0) {     // Check for curses.
                    this.execute(this.shellCurse);
                } else if (this.apologies.indexOf("[" + cmd + "]") >= 0) {        // Check for apologies.
                    this.execute(this.shellApology);
                } else { // It's just a bad command. {
                    this.execute(this.shellInvalidCommand);
                }
            }
        }

        // Note: args is an optional parameter, ergo the ? which allows TypeScript to understand that.
        public execute(fn, args?) {
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
            _Console.tabArray = [];  // Clears the tab completion array
        }

        public parseInput(buffer: string): UserCommand {
            var retVal = new UserCommand();

            // 1. Remove leading and trailing spaces.
            buffer = Utils.trim(buffer);

            // 2. Lower-case it.
            buffer = buffer.toLowerCase();

            // 3. Separate on spaces so we can determine the command and command-line args, if any.
            var tempList = buffer.split(" ");

            // 4. Take the first (zeroth) element and use that as the command.
            var cmd = tempList.shift();  // Yes, you can do that to an array in JavaScript. See the Queue class.
            // 4.1 Remove any left-over spaces.
            cmd = Utils.trim(cmd);
            // 4.2 Record it in the return value.
            retVal.command = cmd;

            // 5. Now create the args array from what's left.
            for (var i in tempList) {
                var arg = Utils.trim(tempList[i]);
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
        public shellInvalidCommand() {
            _StdOut.putText("Invalid Command. ");
            if (_SarcasticMode) {
                _StdOut.putText("Unbelievable. You, [subject name here],");
                _StdOut.advanceLine();
                _StdOut.putText("must be the pride of [subject hometown here].");
            } else {
                _StdOut.putText("Type 'help' for, well... help.");
            }
        }

        public shellCurse() {
            _StdOut.putText("Oh, so that's how it's going to be, eh? Fine.");
            _StdOut.advanceLine();
            _StdOut.putText("Bitch.");
            _SarcasticMode = true;
        }

        public shellApology() {
           if (_SarcasticMode) {
              _StdOut.putText("I think we can put our differences behind us.");
              _StdOut.advanceLine();
              _StdOut.putText("For science . . . You monster.");
              _SarcasticMode = false;
           } else {
              _StdOut.putText("For what?");
           }
        }

        // Although args is unused in some of these functions, it is always provided in the 
        // actual parameter list when this function is called, so I feel like we need it.

        public shellVer(args: string[]) {
            _StdOut.putText(APP_NAME + " version " + APP_VERSION);
        }

        public shellHelp(args: string[]) {
            _StdOut.putText("Commands:");
            for (var i in _OsShell.commandList) {
                _StdOut.advanceLine();
                _StdOut.putText("  " + _OsShell.commandList[i].command + " " + _OsShell.commandList[i].description);
            }
        }

        public shellShutdown(args: string[]) {
             _StdOut.putText("Shutting down...");
             // Call Kernel shutdown routine.
            _Kernel.krnShutdown();
            // TODO: Stop the final prompt from being displayed. If possible. Not a high priority. (Damn OCD!)
        }

        public shellCls(args: string[]) {         
            _StdOut.clearScreen();     
            _StdOut.resetXY();
        }

        public shellMan(args: string[]) {
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
            } else {
                _StdOut.putText("Usage: man <topic>  Please supply a topic.");
            }
        }

        public shellTrace(args: string[]) {
            if (args.length > 0) {
                var setting = args[0];
                switch (setting) {
                    case "on":
                        if (_Trace && _SarcasticMode) {
                            _StdOut.putText("Trace is already on, doofus.");
                        } else {
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
            } else {
                _StdOut.putText("Usage: trace <on | off>");
            }
        }

        public shellRot13(args: string[]) {
            if (args.length > 0) {
                // Requires Utils.ts for rot13() function.
                _StdOut.putText(args.join(' ') + " = '" + Utils.rot13(args.join(' ')) +"'");
            } else {
                _StdOut.putText("Usage: rot13 <string>  Please supply a string.");
            }
        }

        public shellPrompt(args: string[]) {
            if (args.length > 0) {
                _OsShell.promptStr = args[0];
            } else {
                _StdOut.putText("Usage: prompt <string>  Please supply a string.");
            }
        }

        public shellDate(args: string[]) {
            let dateTime = new Date();
            dateTime.toLocaleString("en-US");
            _StdOut.putText("Current date: " + dateTime);
            
        }

        public shellWhereami(args: string[]) {
            _StdOut.putText("Take a look around... (Why do I have to tell you this?)");
        }

        public shellCake (args: string[]){
            _StdOut.putText(" == lie.");
        }

        public shellStatus(args: string[]){
            if (args.length > 0) {

                var status = args.join(" ");
                _StdOut.putText("Current status: " + status);
                const statusElement = document.getElementById("status");
                statusElement.innerHTML = status;

            } else {
                _StdOut.putText("Usage: status <string>, Provide a valid string to display as the status.");
            }
        }

        public shellBSOD (args: string[]){
            _DrawingContext.clearRect(0, 0, 500, 500);
            _DrawingContext.fillStyle = "blue";
            _DrawingContext.fillRect(0, 0, 500, 500);
            _Console.putText("You broke GLaDOS........");
        }

        public shellLoad (args: string[]){
            // var textarea = (<HTMLInputElement>document.getElementById("taProgramInput")).value;
            var validation = TSOS.Control.validation();
            
            if(validation == null) {
                _StdOut.putText("Invalid program specified.");
            } 
            
            else{
                // Split the input into individual opcodes (assuming they are separated by spaces)
                const opcodes = validation.match(/.{1,2}/g);

                var segment = _MemoryManager.getNextSegment();
                var pcb = new ProcessControlBlock(_PidCounter, segment);
                _PcbList.push(pcb);

                const newPcbRow = document.getElementById("pcbStatus").getElementsByTagName('tbody')[0];
                // console.log("Row output test: ", document.getElementById("pcbStatus").getElementsByTagName('tbody'));
                var newRow = newPcbRow.insertRow();

                let pcbFields: string[] = Object.getOwnPropertyNames(pcb);
                for(const field of pcbFields) {
                    let value = pcb[field];
                    let newCell = newRow.insertCell();
                    let newText = document.createTextNode(value.toString(16));
                    newCell.appendChild(newText);
                    newCell.id = pcb.PID + "-" + field;
                }
            
                _StdOut.putText("Loaded Program in segment: " + segment.toString(10));
                // _StdOut.putText("Lower bound: " + _PcbList[_PidCounter].lowerBound.toString(10));
                _StdOut.putText(" PID: " + _PidCounter.toString(10));
                _PidCounter++;
                
                for (let i = 0; i < opcodes.length; i++) {
                    const opcode = opcodes[i];
                    if (opcode.length === 2) {
                        // Assuming each opcode is a 2-digit hexadecimal string
                        const value = parseInt(opcode, 16);
                        
                        // Check if value is a valid number
                        if (!isNaN(value) && value >= 0 && value <= 255) {
                            // Write the value to memory at the next available address
                            var address = i+pcb.lowerBound;
                            // _StdOut.putText(" Writing to address: " + address.toString(16));
                            _Memory.writeByte(address, value);
                            
                        } else {
                            _StdOut.putText("Invalid opcode at position " + i + ", Please clearmem and try again");
                            return;
                        }
                    } else {
                        _StdOut.putText("Invalid opcode length at position " + i+ ", Please clearmem and try again");
                        return;
                    }
                }  
            }

        } 

        public shellRun(args: string[]){
            if (args.length > 0) {
                try {
                    const pid = parseInt(args[0], 10);
        
                    if (!isNaN(pid)) {
                        // Conversion successful
                        if(_PcbList[pid].state != "Terminated"){
                            _CPU.loadNextProgram(_PcbList[pid]);
                            _CPU.isExecuting = true;
                        }
                        else{
                            _StdOut.putText("Cannot run program.");
                        }
                        
                    } else {
                        // Conversion failed
                        throw new Error("Invalid PID value. Please enter an integer.");
                    }
                } catch (error) {
                    _StdOut.putText("Error: " + error.message);
                }
            } else {
                _StdOut.putText("Usage: run <integer>");
            }
        }

        public shellKill(args: string[]){
            if (args.length > 0) {
                try {
                    const pid = parseInt(args[0], 10);
        
                    if (!isNaN(pid)) {
                        // Conversion successful
                        if(_CPU.PID == pid && _PcbList[pid].state != "Terminated"){
                            if(_ReadyQueue.getSize() > 1){
                                var len = _ReadyQueue.getSize();
                                _ReadyQueue.dequeueByIndex(len-1);
                                _PcbList[pid].state = "Terminated";
                                let params: string[];
                                _KernelInterruptQueue.enqueue(new Interrupt(CONTEXTSWITCH_IRQ, params));
                            }
                            else{
                                _ReadyQueue.dequeue();
                                _CPU.isExecuting = false;
                            }   
                        } else{
                            _StdOut.putText("PID: " + pid + " is not running.")
                        }
                    } else {
                        // Conversion failed
                        throw new Error("Invalid PID value. Please enter an integer.");
                    }
                } catch (error) {
                    _StdOut.putText("Error: " + error.message);
                }
            } else {
                _StdOut.putText("Usage: kill <integer>");
            }
            
        }

        public shellKillAll(args: string[]){
           if(_ReadyQueue.getSize() > 1){
                _CPU.isExecuting = false;
                var size = _ReadyQueue.getSize();
                var i = _PcbList.length - 1;
                while(_ReadyQueue.isEmpty() == false){
                    _ReadyQueue.dequeue();
                }

                var stop = i-size;
                for(i; i > stop; i--){
                    _PcbList[i].state = "Terminated";
                }
            }
        }

        public shellClearmem(args: string[]){
            _MemoryManager.clearAll();
        }

        public shellRunall(args: string[]){
            if(_PcbList.length > 0){
                
                if(_PcbList.length == 1){
                    _ReadyQueue.enqueue(_PcbList[0]);
                }
                else if(_PcbList.length == 2){
                    _ReadyQueue.enqueue(_PcbList[0]);
                    _ReadyQueue.enqueue(_PcbList[1]);
                }
                else if(_PcbList.length > 2){
                    var len = _PcbList.length;

                    if(_PcbList[len-3].state != "Terminated"){
                        _ReadyQueue.enqueue(_PcbList[len-3]);
                    }

                    if(_PcbList[len-2].state != "Terminated"){
                        _ReadyQueue.enqueue(_PcbList[len-2]);
                    }
                    
                    if(_PcbList[len-1].state != "Terminated"){
                        _ReadyQueue.enqueue(_PcbList[len-1]);
                    }
                }

                if(_ReadyQueue.getSize() > 0){
                    var currentprogram = _ReadyQueue.dequeue()
                    _CPU.loadNextProgram(currentprogram);
                    _ReadyQueue.enqueue(currentprogram);
                    _StdOut.putText(_ReadyQueue.getSize().toString(10));
                    _CPU.isExecuting = true;
                } else{
                    _StdOut.putText("No Programs to run.");
                }
            } else{
                _StdOut.putText("No Programs to run.");
            }
        }

        public shellQuantum(args: string[]){
            if (args.length > 0) {
                try {
                    const quantumValue = parseInt(args[0], 10);
        
                    if (!isNaN(quantumValue)) {
                        // Conversion successful
                        _Quantum = quantumValue;
                        _StdOut.putText("Quantum set to " + quantumValue);
                    } else {
                        // Conversion failed
                        throw new Error("Invalid quantum value. Please enter an integer.");
                    }
                } catch (error) {
                    _StdOut.putText("Error: " + error.message);
                }
            } else {
                _StdOut.putText("Usage: quantum <integer>");
            }
        }

        public shellPS(args: string[]){
            if(_PcbList.length > 0){
                for(let i = 0; i < _PcbList.length; i++){
                    _StdOut.putText("PID: " + i + " State: " + _PcbList[i].state + ",   ");
                }
            }
        }

        public shellFormat(args: string[]) {
            
            if(_CPU.isExecuting){
                _StdOut.putText("Cannot format while executing.")
            }
            else{
                let isFormatted = _krnDiskDriver.format();
                if (isFormatted) {
                    _StdOut.putText("Disk formatted.");
                }
                else {
                    _StdOut.putText("Error: Could not format disk.");
                }
            }
        }

        public shellCreate(args: string[]) {
            if (args.length > 0) {
                if (!_krnDiskDriver.disk.isFormatted) {
                    _StdOut.putText("Please format the disk first.");
                }
                else {
                    let fileName = args[0];
                    if (!fileName) {
                        _StdOut.putText("Invalid input: Usage -- create <filename>");
                    }
                    else {
                        // false returned if file already exists
                        let created = _krnDiskDriver.createFile(fileName);
                        if (created) {
                            _StdOut.putText(`File ${fileName} successfully created.`);
                        }
                        else {
                            _StdOut.putText(`Error: File ${fileName} already exists.`);
                        }
                    }
                }
            } else {
                _StdOut.putText("Usage: create <string>  Please supply a filename.");
            }
        }

        public shellRead(args: string[]) {
            if (_krnDiskDriver.disk.isFormatted) {
                if (args.length > 0) {
                    let data = TSOS.Utils.hexToText(_krnDiskDriver.readFile(args[0]));
                    if (data == null) {
                        _StdOut.putText("\'" + args[0] + "\' does not exist.");
                    }
                    else if (data == '') {
                        _StdOut.putText("\'" + args[0] + "\' is empty.");
                    }
                    else {
                        _StdOut.putText(data);
                    }
                }
                else {
                    _StdOut.putText('Invalid usage: read <filename>');
                }
            }
            else {
                _StdOut.putText("Please format the disk first.");
            }
        }

        public shellWrite(args: string[]) {
            if (!_krnDiskDriver.disk.isFormatted) {
                _StdOut.putText("Please format the disk first.");
            }

            else {
                // If there is a file and data given
                if (args.length >= 2) {
                    if (args[1] == '\"\"') {
                        _StdOut.putText('Invalid input: Please supply a valid data string');
                        _StdOut.advanceLine();
                        _StdOut.putText('Invalid usage: write <filename> "data"');
                    }
                    else if (args[1].startsWith('"') && args[args.length - 1].endsWith('"')) {
                        let fileName = args[0];
                        // Input
                        let dataArray = args.slice(1, args.length);
                        let data = dataArray.join(' ').slice(1, -1);
                        data = TSOS.Utils.textToHex(data);
                        let msg = _krnDiskDriver.writeFile(fileName, data);
                        
                        if (msg == 'y') {
                            _StdOut.putText("\'" + fileName + "\' written to.");
                        }
                        else if (msg == 'does not exist') {
                            _StdOut.putText("\'" + fileName + "\' doesn't exist.");
                        }
                    }
                    else {
                        _StdOut.putText('Quotations around data required.');
                        _StdOut.advanceLine();
                        _StdOut.putText('Invalid usage: write <filename> "data"');
                    }
                }
                else {
                    _StdOut.putText('Invalid usage: write <filename> "data"');
                }
            }
        }

        public shellDelete(args: string[]) {
            if (!_krnDiskDriver.disk.isFormatted) {
                _StdOut.putText("Please format the disk first.");
            }
            else {
                if (args.length > 0) {
                    let isDeleted = _krnDiskDriver.deleteFile(args[0]);
                    if (isDeleted) {
                        _StdOut.putText(args[0] + ' successfully deleted.');
                    }
                    else {
                        _StdOut.putText(args[0] + ' does not exist.');
                    }
                }
                else {
                    _StdOut.putText('Invalid usage: delete <filename>');
                }
            }
        }

        public shellCopy(args: string[]) {
            if (!_krnDiskDriver.disk.isFormatted) {
                _StdOut.putText("Please format the disk first.");
            }
            else {
                if (args.length == 2) {
                    let msg = _krnDiskDriver.copyFile(args[0], args[1]);
                    if (msg == 'success') {
                        _StdOut.putText('Copy successful.');
                    }
                    else if (msg == 'new file exists') {
                        _StdOut.putText("\'" + args[1] + '\' already exists.');
                    }
                    else if (msg == 'no existing file') {
                        _StdOut.putText("\'" + args[0] + '\' does not exist.');
                    }
                }
                else {
                    _StdOut.putText('Invalid usage: copy <existing filename> <new filename>');
                }
            }
        }

        public shellRename(args: string[]) {
            if (!_krnDiskDriver.disk.isFormatted) {
                _StdOut.putText("Please format the disk first.");
            }
            else {
                if (args.length > 0) {
                    let msg = _krnDiskDriver.renameFile(args[0], args[1]);
                    if (msg == 'success') {
                        _StdOut.putText('Rename successful. ' + args[0] + ' => ' + args[1]);
                    }
                    else if (msg == 'no file') {
                        _StdOut.putText(args[0] + ' does not exist.');
                    }
                    else {
                        _StdOut.putText(args[1] + ' already exists.');
                    }
                }
                else {
                    _StdOut.putText('Invalid usage: rename <existing filename> <new filename>');
                }
            }
        }

        public shellLs(args: string[]) {
            let files = _krnDiskDriver.getAllFiles();

            if (!_krnDiskDriver.disk.isFormatted) {
                _StdOut.putText("Please format the disk first.");
            }
            else {
                if (files.length > 0) {
                    _StdOut.putText('Files on disk:');
                    _StdOut.advanceLine();
                    for (let i = 0; i < files.length; i++) {
                        _StdOut.putText(files[i]);
                        _StdOut.advanceLine();
                    }
                }
                else {
                    _StdOut.putText('No files on disk');
                }
            }
        }
    }
}
