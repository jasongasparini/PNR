/* ----------------------------------
   coreMemory.ts

   Core Memory
   ---------------------------------- */
var TSOS;
(function (TSOS) {
    class Memory {
        memory;
        initCount = 0;
        constructor() {
        }
        init() {
            this.initCount++;
            this.memory = new Array(768).fill(0); // Initializes memory
            if (this.initCount == 1) {
                const memoryTable = document.getElementById("memoryStatus").getElementsByTagName('tbody')[0];
                for (let i = 0; i < 768; i += 8) {
                    let newRow = memoryTable.insertRow();
                    let th = document.createElement('th');
                    th.innerHTML = "0x" + i.toString(16).toUpperCase();
                    newRow.appendChild(th);
                    for (let j = 0; j < 8; j++) {
                        let value = this.memory[i + j];
                        let newCell = newRow.insertCell();
                        let newText = document.createTextNode("0x" + value.toString(16).toUpperCase());
                        newCell.appendChild(newText);
                        newCell.id = "memory-" + (i + j);
                    }
                }
            }
        }
        // Read a byte from memory at the specified hexadecimal address
        readByte(hexAddress) {
            return this.memory[hexAddress];
        }
        // Write a byte to memory at the specified hexadecimal address
        writeByte(hexAddress, value) {
            // _StdOut.putText(" Writing to address: " + hexAddress.toString(16)); TEST
            let id = "memory-" + hexAddress;
            document.getElementById(id).innerHTML = "0x" + value.toString(16).toUpperCase();
            this.memory[hexAddress] = this.hexToByte(value);
        }
        // Helper function to convert a byte (number) to a 2-digit hexadecimal string
        byteToHexString(byteValue) {
            return byteValue.toString(16).toUpperCase().padStart(2, "0");
        }
        // Helper function to convert a 2-digit hexadecimal string to a byte (number)
        hexToByte(hexValue) {
            return hexValue & 0xFF; // Ensure that the value is within the range of 0x00 to 0xFF
        }
        copyElementsToString(setNumber) {
            let startIdx = 0;
            if (setNumber === 1) {
                startIdx = 0;
            }
            else if (setNumber === 2) {
                startIdx = 256;
            }
            else if (setNumber === 3) {
                startIdx = Math.max(0, this.memory.length - 256);
            }
            else {
                throw new Error('Invalid setNumber. Use 1, 2, or 3.');
            }
            const elementsToCopy = this.memory.slice(startIdx, startIdx + 256);
            const hexString = elementsToCopy.map(value => value.toString(16).padStart(2, '0')).join('');
            return hexString;
        }
        clearSegment(segment) {
            var base = 0;
            var limit = 0;
            if (segment == 1) {
                base = 0;
                limit = 255;
            }
            else if (segment == 2) {
                base = 256;
                limit = 511;
            }
            else if (segment == 3) {
                base = 512;
                limit = 767;
            }
            var i = base;
            while (i <= limit) {
                this.memory[i] = 0x00;
                i++;
            }
        }
        writeSegment(segment, input) {
            var base = 0;
            var limit = 0;
            if (segment == 1) {
                base = 0;
                limit = 255;
            }
            else if (segment == 2) {
                base = 256;
                limit = 511;
            }
            else if (segment == 3) {
                base = 512;
                limit = 767;
            }
            const opcodes = input.match(/.{1,2}/g);
            for (let i = 0; i < opcodes.length; i++) {
                const opcode = opcodes[i];
                if (opcode.length === 2) {
                    const value = parseInt(opcode, 16);
                    if (!isNaN(value) && value >= 0 && value <= 255) {
                        var address = i + base;
                        this.writeByte(address, value);
                    }
                    else {
                        _StdOut.putText("Invalid opcode at position " + i + ", Please clearmem and try again");
                        return;
                    }
                }
                else {
                    _StdOut.putText("Invalid opcode length at position " + i + ", Please clearmem and try again");
                    return;
                }
            }
        }
    }
    TSOS.Memory = Memory;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=memory.js.map