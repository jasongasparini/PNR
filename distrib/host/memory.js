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
            const address = this.hexToByte(hexAddress);
            if (address < 0 || address >= 256) {
                throw new Error("Invalid memory address");
            }
            return this.byteToHexString(this.memory[address]);
        }
        // Write a byte to memory at the specified hexadecimal address
        writeByte(hexAddress, value) {
            const address = this.hexToByte(hexAddress);
            if (address < 0 || address >= 256) {
                throw new Error("Invalid memory address");
            }
            this.memory[address] = this.hexToByte(value);
        }
        // Helper function to convert a byte (number) to a 2-digit hexadecimal string
        byteToHexString(byteValue) {
            return byteValue.toString(16).toUpperCase().padStart(2, "0");
        }
        // Helper function to convert a 2-digit hexadecimal string to a byte (number)
        hexToByte(hexValue) {
            return hexValue & 0xFF; // Ensure that the value is within the range of 0x00 to 0xFF
        }
    }
    TSOS.Memory = Memory;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=memory.js.map