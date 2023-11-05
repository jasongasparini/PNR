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
            this.memory = new Array(768).fill(0); // Initializes memory
        }
        // Read a byte from memory at the specified hexadecimal address
        readByte(hexAddress) {
            return this.memory[hexAddress];
        }
        // Write a byte to memory at the specified hexadecimal address
        writeByte(hexAddress, value) {
            // _StdOut.putText(" Writing to address: " + hexAddress.toString(16)); TEST
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
        updateMemoryTable() {
            const tableBody = document.querySelector('#memoryTable tbody');
            tableBody.innerHTML = '';
            for (let address = 0; address < 768; address++) {
                const hexAddress = address.toString(16).toUpperCase().padStart(2, '0');
                const hexValue = this.byteToHexString(this.readByte(address));
                // const hexAddress = address;
                // const hexValue = 1
                const row = `<tr>
                             <td>0x${hexAddress}</td>
                             <td>${hexValue}</td>
                           </tr>`;
                tableBody.innerHTML += row;
            }
        }
    }
    TSOS.Memory = Memory;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=memory.js.map