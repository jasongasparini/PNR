/* ----------------------------------
   coreMemory.ts

   Core Memory
   ---------------------------------- */
var TSOS;
(function (TSOS) {
    class Memory {
        memory;
        constructor() {
        }
        init() {
            this.memory = new Array(256).fill(0); // Initializes memory
        }
        // Read a byte from memory at the specified hexadecimal address
        readByte(hexAddress) {
            const address = this.hexStringToByte(hexAddress);
            // if (address < 0 || address >= 256) {
            // throw new Error("Invalid memory address");
            // }
            return this.byteToHexString(this.memory[address]);
        }
        // Write a byte to memory at the specified hexadecimal address
        writeByte(hexAddress, value) {
            const address = this.hexStringToByte(hexAddress);
            // if (address < 0 || address >= 256) {
            // throw new Error("Invalid memory address");
            // }
            this.memory[address] = this.hexStringToByte(value);
        }
        // Helper function to convert a byte (number) to a 2-digit hexadecimal string
        byteToHexString(byteValue) {
            return byteValue.toString(16).toUpperCase().padStart(2, "0");
        }
        // Helper function to convert a 2-digit hexadecimal string to a byte (number)
        hexStringToByte(hexString) {
            const byteValue = parseInt(hexString, 16);
            // if (isNaN(byteValue) || byteValue < 0 || byteValue > 255) {
            // throw new Error("Invalid hexadecimal value");
            // }
            return byteValue;
        }
    }
    TSOS.Memory = Memory;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=memory.js.map