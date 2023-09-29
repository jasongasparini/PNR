/* ----------------------------------
   coreMemory.ts

   Core Memory
   ---------------------------------- */

   module TSOS {
    export class Memory {
        private memory: number[]

        constructor() {
            
        }

        public init(): void {
            this.memory = new Array(256).fill(0); // Initializes memory
        }

        // Read a byte from memory at the specified hexadecimal address
        readByte(hexAddress: number): string {
            const address = this.hexToByte(hexAddress);
            if (address < 0 || address >= 256) {
            throw new Error("Invalid memory address");
            }

            return this.byteToHexString(this.memory[address]);
        }

        // Write a byte to memory at the specified hexadecimal address
        writeByte(hexAddress: number, value: number): void {
            const address = this.hexToByte(hexAddress);
            if (address < 0 || address >= 256) {
            throw new Error("Invalid memory address");
            }

            this.memory[address] = this.hexToByte(value);
        }

        // Helper function to convert a byte (number) to a 2-digit hexadecimal string
        private byteToHexString(byteValue: number): string {
            return byteValue.toString(16).toUpperCase().padStart(2, "0");
        }

        // Helper function to convert a 2-digit hexadecimal string to a byte (number)
        private hexToByte(hexValue: number): number {
            return hexValue & 0xFF; // Ensure that the value is within the range of 0x00 to 0xFF
        }



    }

}